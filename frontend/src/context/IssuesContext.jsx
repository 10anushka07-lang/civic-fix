import { createContext, useContext, useState } from "react";

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
  makeIssue("Pothole", "Large pothole opposite the community park gate, cars swerving into oncoming traffic.", "Pending", 14, jitter(0.02), jitter(0.02), 6),
  makeIssue("Garbage / Waste", "Overflowing bin behind Sector 14 market, uncollected for over a week.", "In Progress", 7, jitter(0.02), jitter(0.02), 3),
  makeIssue("Streetlight", "Streetlight outside House No. 212 has been dead for a month, unsafe at night.", "Pending", 21, jitter(0.02), jitter(0.02), 4),
  makeIssue("Water Leakage", "Pipeline leak flooding the footpath near the bus stand.", "Resolved", 30, jitter(0.02), jitter(0.02), 9, 2),
  makeIssue("Open Drain", "Uncovered drain near the school gate, hazard for children.", "In Progress", 5, jitter(0.02), jitter(0.02), 2),
  makeIssue("Pothole", "Cluster of small potholes on the main ring road stretch.", "Resolved", 40, jitter(0.02), jitter(0.02), 5, 6),
];

const IssuesContext = createContext(null);

export function IssuesProvider({ children }) {
  const [issues, setIssues] = useState(seedIssues);

  function addIssue(newIssue) {
    setIssues((prev) => [newIssue, ...prev]);
  }

  function upvoteIssue(id) {
    setIssues((prev) => prev.map((i) => (i.id === id ? { ...i, upvotes: i.upvotes + 1 } : i)));
  }

  function nextId() {
    return "CF/2026/" + String(seqCounter++).padStart(5, "0");
  }

  return (
    <IssuesContext.Provider value={{ issues, addIssue, upvoteIssue, nextId, CENTER, jitter }}>
      {children}
    </IssuesContext.Provider>
  );
}

export function useIssues() {
  return useContext(IssuesContext);
}