import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { useIssues } from "../context/IssuesContext";

const categories = [
  { name: "Pothole", icon: "🕳️", color: "#B3261E" },
  { name: "Garbage / Waste", icon: "🗑️", color: "#8a7250" },
  { name: "Streetlight", icon: "💡", color: "#e8b93e" },
  { name: "Water Leakage", icon: "💧", color: "#3e8ee8" },
  { name: "Open Drain", icon: "⚠️", color: "#B3261E" },
  { name: "Other", icon: "📍", color: "#2F7D4F" },
];

function statusColor(status) {
  if (status === "Pending") return "#B3261E";
  if (status === "In Progress") return "#C4432E";
  return "#2F7D4F";
}

function Dashboard() {
  const { issues, CENTER } = useIssues();

  const counts = categories.map((cat) => ({
    ...cat,
    count: issues.filter((i) => i.category === cat.name).length,
  }));

  return (
    <div className="min-h-screen bg-[#F5F0E4] p-6">
      <h1 className="text-2xl font-bold text-[#0E3E29] mb-6">Issue Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="grid grid-cols-2 gap-4 md:col-span-1">
          {counts.map((cat) => (
            <div key={cat.name} className="rounded-xl p-4 text-white" style={{ backgroundColor: "#0E3E29" }}>
              <div className="flex justify-between items-start">
                <span className="text-2xl">{cat.icon}</span>
                <span className="w-3 h-3 rounded-full mt-1" style={{ backgroundColor: cat.color }}></span>
              </div>
              <p className="text-sm text-gray-200 mt-3">{cat.name}</p>
              <p className="text-3xl font-bold mt-1">{cat.count}</p>
            </div>
          ))}
        </div>

        <div className="md:col-span-2 rounded-xl overflow-hidden border border-[#D8CDB4]" style={{ height: "500px" }}>
          <MapContainer center={[CENTER.lat, CENTER.lng]} zoom={12} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {issues.map((issue) => (
              <CircleMarker
                key={issue.id}
                center={[issue.lat, issue.lng]}
                radius={9}
                pathOptions={{
                  color: statusColor(issue.status),
                  fillColor: statusColor(issue.status),
                  fillOpacity: 0.7,
                  weight: 2,
                }}
              >
                <Popup>
                  <b>{issue.category}</b><br />
                  {issue.desc}<br />
                  Status: {issue.status}
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;