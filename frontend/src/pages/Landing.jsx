import { useNavigate } from "react-router-dom";
function Landing() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-slate-100 relative z-10">
        <div className="flex items-center gap-1">
          <span className="text-emerald-500 text-2xl">📍</span>
          <span className="text-2xl font-bold text-slate-300">
            <span className="text-emerald-500">C</span>IVIX
          </span>
        </div>

        <div className="flex items-center gap-6">
          <button className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-medium px-4 py-2 rounded-full text-sm">
            ⓘ About
          </button>
        <button onClick={() => navigate("/contact")} className="flex items-center gap-1.5 text-slate-700 text-sm font-medium">
  📞 Contact Us
</button>
          <a href="#" className="flex items-center gap-1.5 text-slate-700 text-sm font-medium">
            👥 Our contributors
          </a>
          <a href="#" className="flex items-center gap-1.5 text-slate-700 text-sm font-medium">
            🗳️ Voting System
          </a>
        <button onClick={() => navigate("/issue-map")} className="flex items-center gap-1.5 text-slate-700 text-sm font-medium">
  🗺️ Issue Map
</button>
          <a href="#" className="flex items-center gap-1.5 text-slate-700 text-sm font-medium">
            ⚠️ Feedback
          </a>
          <button className="flex items-center gap-1.5 bg-red-500 text-white font-bold px-4 py-2 rounded-full text-sm">
            ⚠️ SOS
          </button>
          <div className="w-11 h-6 bg-slate-200 rounded-full relative cursor-pointer">
            <div className="w-5 h-5 bg-amber-400 rounded-full absolute top-0.5 left-0.5"></div>
          </div>
        </div>
      </nav>

      {/* Decorative glow dots */}
      <div className="absolute top-40 left-10 w-6 h-6 bg-emerald-300 rounded-full blur-md opacity-40"></div>
      <div className="absolute top-60 right-20 w-8 h-8 bg-emerald-300 rounded-full blur-md opacity-40"></div>
      <div className="absolute bottom-40 left-1/4 w-5 h-5 bg-emerald-300 rounded-full blur-md opacity-40"></div>
      <div className="absolute bottom-32 right-1/3 w-6 h-6 bg-emerald-300 rounded-full blur-md opacity-40"></div>

      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center px-6 pt-24 pb-32 relative z-10">
        <span className="inline-flex items-center gap-2 bg-emerald-500 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          ✨ Empowering Citizens
        </span>

        <h1 className="text-6xl font-extrabold text-slate-900 leading-tight">
          Report Local Issues.
        </h1>
        <h1 className="text-6xl font-extrabold leading-tight mb-6">
          <span className="text-emerald-500">Make Your City </span>
          <span className="text-blue-500">Better.</span>
        </h1>

        <p className="text-slate-500 text-lg max-w-xl mx-auto mb-8">
          Civix helps citizens report and track local civic issues like potholes,
          broken lights, and garbage collection problems with unprecedented ease
          and transparency.
        </p>

        <div className="flex items-center justify-center gap-4">
          <button onClick={() => navigate("/login")} className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition">
  Get Started

</button>
          <button className="text-slate-800 font-semibold px-6 py-3">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
