import { useState } from "react";

const dummyReports = [
  {
    id: 1,
    category: "Pothole",
    description: "Deep pothole expanding near the crosswalk on Elm St. Needs urgent repair.",
    status: "Pending",
    date: "Reported Today, 9:42 AM",
  },
  {
    id: 2,
    category: "Debris",
    description: "Large tree branch blocking the pedestrian path near the park entrance.",
    status: "In Progress",
    date: "Updated Yesterday",
  },
  {
    id: 3,
    category: "Streetlight",
    description: "Streetlight flickering heavily out front of 402 Maple Ave.",
    status: "Resolved",
    date: "Closed Oct 12",
  },
];

const statusStyles = {
  Pending: "bg-amber-100 text-amber-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Resolved: "bg-emerald-100 text-emerald-700",
};

function Home() {
  const [reports] = useState(dummyReports);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="flex items-center justify-between px-4 py-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 text-xl">🏛️</span>
          <span className="font-bold text-slate-800">CivicFix</span>
        </div>
        <span className="text-slate-500 text-xl">🔔</span>
      </div>

      <div className="px-4 pt-4">
        <div className="bg-emerald-700 rounded-2xl p-6 text-center text-white mb-6">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">📷</span>
          </div>
          <h2 className="text-lg font-bold">Report an Issue</h2>
          <p className="text-sm text-emerald-50 mt-1">
            Help keep our community safe and clean. Snap a photo to get started.
          </p>
        </div>

        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-800">My Reports</h3>
          <span className="text-sm text-emerald-700 font-medium">View All</span>
        </div>

        <div className="space-y-3">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-xl border border-slate-200 p-3 flex gap-3"
            >
              <div className="w-16 h-16 bg-slate-200 rounded-lg flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase">
                    {report.category}
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusStyles[report.status]}`}
                  >
                    {report.status}
                  </span>
                </div>
                <p className="text-sm text-slate-700 mt-1 line-clamp-2">
                  {report.description}
                </p>
                <p className="text-xs text-slate-400 mt-1">{report.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around py-3">
        <button className="flex flex-col items-center text-emerald-700">
          <span className="text-xl">🏠</span>
          <span className="text-xs font-medium">Home</span>
        </button>
        <button className="flex flex-col items-center text-slate-400">
          <span className="text-xl">➕</span>
          <span className="text-xs">Report</span>
        </button>
        <button className="flex flex-col items-center text-slate-400">
          <span className="text-xl">👤</span>
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
}

export default Home;