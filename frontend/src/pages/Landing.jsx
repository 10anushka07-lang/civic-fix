import { useNavigate } from "react-router-dom";
import potholeImg from "../assets/POTHOLE_IMAGE.webp";
import drainImg from "../assets/OVERFLOWING_DRAIN.webp";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-blue-100 relative z-10">
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
          <button onClick={() => navigate("/voting")} className="flex items-center gap-1.5 text-slate-700 text-sm font-medium">
            🗳️ Voting
          </button>
          <button onClick={() => navigate("/issue-map")} className="flex items-center gap-1.5 text-slate-700 text-sm font-medium">
            🗺️ Issue Map
          </button>
          <button onClick={() => navigate("/feedback")} className="flex items-center gap-1.5 text-slate-700 text-sm font-medium">
            ⚠️ Feedback
          </button>
          <button className="flex items-center gap-1.5 bg-red-500 text-white font-bold px-4 py-2 rounded-full text-sm">
            ⚠️ SOS
          </button>
        </div>
      </nav>

      {/* Decorative glow dots */}
      <div className="absolute top-40 left-10 w-6 h-6 bg-emerald-300 rounded-full blur-md opacity-40"></div>
      <div className="absolute top-60 right-20 w-8 h-8 bg-blue-300 rounded-full blur-md opacity-40"></div>
      <div className="absolute bottom-40 left-1/4 w-5 h-5 bg-emerald-300 rounded-full blur-md opacity-40"></div>
      <div className="absolute bottom-32 right-1/3 w-6 h-6 bg-blue-300 rounded-full blur-md opacity-40"></div>

      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center px-6 pt-24 pb-20 relative z-10">
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
          <button
            onClick={() => navigate("/login")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-10 py-4 rounded-xl text-lg shadow-lg shadow-emerald-200 transition"
          >
            Get Started
          </button>
          <button className="text-slate-800 font-semibold px-6 py-4 text-lg">
            Learn More
          </button>
        </div>
      </div>

      {/* Issues showcase */}
      <div className="max-w-4xl mx-auto px-6 pb-28 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Your City. Your Voice. Your Impact.
          </h2>
          <p className="text-slate-500 mt-2">
            Together, we build better cities, one report at a time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pothole card */}
          <div className="group relative rounded-3xl overflow-hidden shadow-lg h-80">
            <img
              src={potholeImg}
              alt="Pothole in a road"
              className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
            <span className="absolute top-4 left-4 bg-white/90 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              📍 Road Damage
            </span>
            <div className="absolute bottom-5 left-5 right-5">
              <h3 className="text-white text-xl font-bold">Potholes</h3>
              <p className="text-white/80 text-sm">
                Cracked pavement that damages vehicles and slows traffic.
              </p>
            </div>
          </div>

          {/* Drain card */}
          <div className="group relative rounded-3xl overflow-hidden shadow-lg h-80">
            <img
              src={drainImg}
              alt="Overflowing storm drain"
              className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
            <span className="absolute top-4 left-4 bg-white/90 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              📍 Drainage
            </span>
            <div className="absolute bottom-5 left-5 right-5">
              <h3 className="text-white text-xl font-bold">Overflowing Drains</h3>
              <p className="text-white/80 text-sm">
                Blocked storm drains that flood streets after rain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;