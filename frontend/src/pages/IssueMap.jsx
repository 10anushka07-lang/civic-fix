import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const CENTER = { lat: 22.9734, lng: 78.6569 }; // India center
function jitter(n) { return (Math.random() - 0.5) * n; }

const seedIssues = [
  { id: "CF/2026/00044", category: "Pothole", status: "Pending", lat: 28.6139 + jitter(0.3), lng: 77.2090 + jitter(0.3), desc: "Deep pothole near market" },
  { id: "CF/2026/00045", category: "Garbage / Waste", status: "In Progress", lat: 19.0760 + jitter(0.3), lng: 72.8777 + jitter(0.3), desc: "Overflowing bin" },
  { id: "CF/2026/00046", category: "Streetlight", status: "Pending", lat: 12.9716 + jitter(0.3), lng: 77.5946 + jitter(0.3), desc: "Streetlight dead for a month" },
  { id: "CF/2026/00047", category: "Water Leakage", status: "Resolved", lat: 22.5726 + jitter(0.3), lng: 88.3639 + jitter(0.3), desc: "Pipeline leak fixed" },
  { id: "CF/2026/00048", category: "Open Drain", status: "In Progress", lat: 13.0827 + jitter(0.3), lng: 80.2707 + jitter(0.3), desc: "Uncovered drain near school" },
  { id: "CF/2026/00049", category: "Pothole", status: "Pending", lat: 17.3850 + jitter(0.3), lng: 78.4867 + jitter(0.3), desc: "Cluster of potholes" },
  { id: "CF/2026/00050", category: "Garbage / Waste", status: "Resolved", lat: 23.0225 + jitter(0.3), lng: 72.5714 + jitter(0.3), desc: "Waste collection resolved" },
  { id: "CF/2026/00051", category: "Streetlight", status: "In Progress", lat: 26.9124 + jitter(0.3), lng: 75.7873 + jitter(0.3), desc: "Streetlight flickering" },
];

const categories = ["Pothole", "Garbage / Waste", "Streetlight", "Water Leakage", "Open Drain", "Other"];
const statuses = ["Pending", "In Progress", "Resolved"];

function IssueMap() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const filtered = seedIssues.filter((i) => {
    if (statusFilter !== "All Status" && i.status !== statusFilter) return false;
    if (categoryFilter !== "All Categories" && i.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#F5F0E4", padding: "24px" }}>
      <button
        onClick={() => navigate("/home")}
        style={{
          background: "none",
          border: "none",
          color: "#0E3E29",
          fontWeight: 600,
          cursor: "pointer",
          marginBottom: "16px",
        }}
      >
        ← Back to Dashboard
      </button>

      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            background: "#2F7D4F",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 12px",
            color: "#fff",
            fontSize: "24px",
          }}
        >
          📍
        </div>
        <h1 style={{ color: "#0E3E29", fontSize: "32px", fontWeight: 700, margin: 0 }}>
          Civic Issues Map
        </h1>
        <p style={{ color: "#5C5342", marginTop: "8px" }}>
          Explore civic issues across your region. Click markers for details, apply filters.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          marginBottom: "16px",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontWeight: 600, color: "#0E3E29" }}>Filters</span>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #D8CDB4" }}
        >
          <option>All Status</option>
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #D8CDB4" }}
        >
          <option>All Categories</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #D8CDB4",
          height: "520px",
        }}
      >
        <MapContainer center={[CENTER.lat, CENTER.lng]} zoom={5} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filtered.map((issue) => (
            <Marker key={issue.id} position={[issue.lat, issue.lng]}>
              <Popup>
                <b>{issue.category}</b>
                <br />
                {issue.desc}
                <br />
                Status: {issue.status}
                <br />
                <span style={{ fontSize: "11px", color: "#888" }}>{issue.id}</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default IssueMap;