import { useState, useRef } from "react";
import "./Home.css";

const CENTER = { lat: 28.4595, lng: 77.0266 };
function jitter(n) { return (Math.random() - 0.5) * n; }

let seqCounter = 44;
function makeIssue(cat, desc, status, daysAgo, dLat, dLng, upvotes, resolvedDaysAgo) {
  const created = new Date(Date.now() - daysAgo * 86400000);
  const o = {
    id: "CF/2026/" + String(seqCounter++).padStart(5, "0"),
    category: cat, desc, status, created,
    lat: CENTER.lat + dLat, lng: CENTER.lng + dLng,
    upvotes, photo: null, mine: false,
  };
  if (status === "Resolved" && resolvedDaysAgo) {
    o.resolved = new Date(Date.now() - resolvedDaysAgo * 86400000);
  }
  return o;
}

const seedIssues = [
  makeIssue("Pothole", "Large pothole opposite the community park gate, cars swerving into oncoming traffic.", "Pending", 14, jitter(0.01), jitter(0.01), 6),
  makeIssue("Garbage / Waste", "Overflowing bin behind Sector 14 market, uncollected for over a week.", "In Progress", 7, jitter(0.01), jitter(0.01), 3),
  makeIssue("Streetlight", "Streetlight outside House No. 212 has been dead for a month, unsafe at night.", "Pending", 21, jitter(0.01), jitter(0.01), 4),
  makeIssue("Water Leakage", "Pipeline leak flooding the footpath near the bus stand.", "Resolved", 30, jitter(0.01), jitter(0.01), 9, 2),
  makeIssue("Open Drain", "Uncovered drain near the school gate, hazard for children.", "In Progress", 5, jitter(0.01), jitter(0.01), 2),
  makeIssue("Pothole", "Cluster of small potholes on the main ring road stretch.", "Resolved", 40, jitter(0.01), jitter(0.01), 5, 6),
];

function daysAgo(d) {
  return Math.floor((Date.now() - d) / 86400000);
}

function distMeters(a, b, c, d) {
  const R = 6371000, toRad = (x) => (x * Math.PI) / 180;
  const dLat = toRad(c - a), dLng = toRad(d - b);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a)) * Math.cos(toRad(c)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function StampBadge({ status }) {
  const cls = status === "Pending" ? "pending" : status === "In Progress" ? "progress" : "resolved";
  return <span className={`stamp ${cls}`}>{status}</span>;
}

function Home() {
  const [issues, setIssues] = useState(seedIssues);
  const [tab, setTab] = useState("report");

  const [category, setCategory] = useState("Pothole");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState(null);
  const [locText, setLocText] = useState("No location captured yet");
  const [locGot, setLocGot] = useState(false);
  const [draftCoords, setDraftCoords] = useState({ lat: null, lng: null });

  const [dupTarget, setDupTarget] = useState(null);
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);
  const fileInputRef = useRef(null);

  function showToast(msg) {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2600);
  }

  function handlePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  }

  function captureLocation() {
    if (!navigator.geolocation) {
      const lat = CENTER.lat + jitter(0.008);
      const lng = CENTER.lng + jitter(0.008);
      setDraftCoords({ lat, lng });
      setLocText("Location captured (approx.)");
      setLocGot(true);
      return;
    }
    setLocText("Locating…");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setDraftCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocText(`Location captured: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
        setLocGot(true);
      },
      () => {
        const lat = CENTER.lat + jitter(0.008);
        const lng = CENTER.lng + jitter(0.008);
        setDraftCoords({ lat, lng });
        setLocText("Location unavailable — using approximate area");
        setLocGot(true);
      }
    );
  }

  function findDuplicate(cat, lat, lng) {
    if (lat == null) return null;
    return issues.find(
      (i) => i.category === cat && i.status !== "Resolved" && distMeters(i.lat, i.lng, lat, lng) < 120
    );
  }

  function resetForm() {
    setDesc("");
    setPhoto(null);
    setDraftCoords({ lat: null, lng: null });
    setLocText("No location captured yet");
    setLocGot(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function createIssue(cat, description) {
    const newIssue = {
      id: "CF/2026/" + String(seqCounter++).padStart(5, "0"),
      category: cat,
      desc: description,
      status: "Pending",
      created: new Date(),
      lat: draftCoords.lat ?? CENTER.lat + jitter(0.01),
      lng: draftCoords.lng ?? CENTER.lng + jitter(0.01),
      upvotes: 1,
      photo,
      mine: true,
    };
    setIssues((prev) => [newIssue, ...prev]);
    resetForm();
    showToast(`Filed as ${newIssue.id}. Track it under "My reports".`);
  }

  function submitReport() {
    const trimmed = desc.trim();
    if (!trimmed) {
      showToast("Add a short description before submitting.");
      return;
    }
    const dup = findDuplicate(category, draftCoords.lat, draftCoords.lng);
    if (dup) {
      setDupTarget(dup);
      return;
    }
    createIssue(category, trimmed);
  }

  function fileAnyway() {
    createIssue(category, desc.trim());
    setDupTarget(null);
  }

  function upvoteDup() {
    setIssues((prev) =>
      prev.map((i) => (i.id === dupTarget.id ? { ...i, upvotes: i.upvotes + 1 } : i))
    );
    showToast(`Added your voice to ${dupTarget.id} — priority increased.`);
    setDupTarget(null);
    resetForm();
  }

  function upvoteFromNearby(id) {
    setIssues((prev) => prev.map((i) => (i.id === id ? { ...i, upvotes: i.upvotes + 1 } : i)));
    showToast("Upvoted " + id);
  }

  const mine = issues.filter((i) => i.mine);
  const nearby = issues.filter((i) => i.status !== "Resolved").sort((a, b) => b.upvotes - a.upvotes);

  const total = issues.length;
  const resolvedCount = issues.filter((i) => i.status === "Resolved").length;
  const openCount = total - resolvedCount;
  const resTimes = issues.filter((i) => i.resolved).map((i) => Math.max(1, Math.round((i.resolved - i.created) / 86400000)));
  const avg = resTimes.length ? Math.round(resTimes.reduce((a, b) => a + b, 0) / resTimes.length) : 0;

  return (
    <div className="jansetu">
      <div className="masthead">
        <div className="masthead-inner">
          <div className="brand">
            <div className="seal">CF</div>
            <div className="brand-text">
              <h1>CivicFix</h1>
              <div className="tagline">Civic Issue Register · Report, Track, Resolve </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ticker">
        <div className="ticker-inner">
          <span>Reported this month: <b>{total}</b></span>
          <span>Resolved: <b>{resolvedCount}</b></span>
          <span>Open: <b>{openCount}</b></span>
          <span>Avg. resolution: <b>{avg} days</b></span>
        </div>
      </div>

      <div className="wrap">
        <div className="tabs">
          <div className={`tab ${tab === "report" ? "active" : ""}`} onClick={() => setTab("report")}>
            Report an issue
          </div>
          <div className={`tab ${tab === "mine" ? "active" : ""}`} onClick={() => setTab("mine")}>
            My reports {mine.length ? `(${mine.length})` : ""}
          </div>
          <div className={`tab ${tab === "nearby" ? "active" : ""}`} onClick={() => setTab("nearby")}>
            Nearby issues
          </div>
        </div>

        {tab === "report" && (
          <div className="panel">
            <div className="panel-title">New report</div>
            <div className="row2">
              <div className="field">
                <label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option>Pothole</option>
                  <option>Garbage / Waste</option>
                  <option>Streetlight</option>
                  <option>Water Leakage</option>
                  <option>Open Drain</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="field">
                <label>Photo</label>
                <div className="photo-drop" onClick={() => fileInputRef.current.click()}>
                  Tap to attach a photo
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handlePhoto}
                />
                {photo && <img src={photo} className="photo-preview" alt="preview" />}
              </div>
            </div>
            <div className="field">
              <label>Description</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Describe what you saw — e.g. 'Deep pothole near the bus stop, been growing for two weeks.'"
              />
            </div>
            <div className="field">
              <label>Location</label>
              <div className={`loc-box ${locGot ? "got" : ""}`}>
                <span>{locText}</span>
                <button className="btn small ghost" style={{ marginLeft: "auto" }} onClick={captureLocation}>
                  Use my location
                </button>
              </div>
              <div className="hint">Location lets us detect if this has already been reported nearby.</div>
            </div>
            <button className="btn ochre" onClick={submitReport}>Submit report</button>
          </div>
        )}

        {tab === "mine" && (
          <div className="panel">
            <div className="panel-title">My reports</div>
            {mine.length === 0 ? (
              <div className="empty">
                <span className="big">📋</span>
                You haven't filed a report yet. Once you do, track its status here.
              </div>
            ) : (
              mine.map((i) => (
                <div className="issue-card" key={i.id}>
                  {i.photo ? <img className="issue-thumb" src={i.photo} alt="" /> : <div className="issue-thumb" />}
                  <div className="issue-main">
                    <div className="cat">{i.category} · <span className="file-no">{i.id}</span></div>
                    <div className="desc">{i.desc}</div>
                    <div className="issue-meta">
                      <span>Filed {daysAgo(i.created)}d ago</span>
                      <span>{i.upvotes} report{i.upvotes === 1 ? "" : "s"} nearby</span>
                    </div>
                  </div>
                  <div className="issue-side"><StampBadge status={i.status} /></div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "nearby" && (
          <div className="panel">
            <div className="panel-title">Reported nearby — upvote instead of duplicating</div>
            {nearby.length === 0 ? (
              <div className="empty">Nothing open nearby right now.</div>
            ) : (
              nearby.map((i) => (
                <div className="issue-card" key={i.id}>
                  {i.photo ? <img className="issue-thumb" src={i.photo} alt="" /> : <div className="issue-thumb" />}
                  <div className="issue-main">
                    <div className="cat">{i.category} · <span className="file-no">{i.id}</span></div>
                    <div className="desc">{i.desc}</div>
                    <div className="issue-meta"><span>Filed {daysAgo(i.created)}d ago</span></div>
                  </div>
                  <div className="issue-side">
                    <StampBadge status={i.status} />
                    <button className="btn small ghost" onClick={() => upvoteFromNearby(i.id)}>
                      ▲ Upvote ({i.upvotes})
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <footer>CivicFix — a civic transparency prototype for your local municipal body.</footer>

      {dupTarget && (
        <div className="modal-overlay show">
          <div className="modal">
            <h3>Already reported nearby</h3>
            <p>
              {dupTarget.upvotes} other resident{dupTarget.upvotes === 1 ? "" : "s"} already reported
              "{dupTarget.desc.slice(0, 60)}{dupTarget.desc.length > 60 ? "…" : ""}" ({dupTarget.id}) within 120m of here.
            </p>
            <div className="modal-actions">
              <button className="btn ghost" onClick={fileAnyway}>File a new report anyway</button>
              <button className="btn ochre" onClick={upvoteDup}>Upvote existing report</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast show">{toast}</div>}
    </div>
  );
}

export default Home;
