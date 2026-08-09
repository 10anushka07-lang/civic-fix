import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Uses the Render backend URL from Vercel Environment Variables.
// Falls back to localhost when running the project locally.

  const API_URL = "https://civic-fix-g5zq.onrender.com";

function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email");
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      return alert("Enter a valid email");
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: {
       "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setStep("otp");
      } else {
        alert("Failed to send OTP: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server. Is the backend running?");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (otp.length < 4) {
      return alert("Enter the OTP");
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
       "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code: otp,
        }),
      });

      const data = await res.json();

      if (data.success) {
        navigate("/home");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server. Is the backend running?");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="text-4xl mb-3">📍</div>

          <h1 className="text-3xl font-bold text-slate-800">
            Welcome to CivicFix
          </h1>

          <p className="text-slate-500 mt-2">
            Your connection to a better, more responsive city.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

          {step === "email" ? (
            <form onSubmit={handleSendOtp}>

              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />

              <p className="text-xs text-slate-400 mt-2">
                We'll send you a verification code to confirm your email.
              </p>

              <button
                type="submit"
                className="w-full mt-6 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 rounded-xl transition"
              >
                Get Started →
              </button>

            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>

              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Enter OTP
              </label>

              <input
                type="text"
                placeholder="4-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full mt-2 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                maxLength="4"
                required
              />

              <button
                type="submit"
                className="w-full mt-6 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 rounded-xl transition"
              >
                Verify & Continue →
              </button>

              <button
                type="button"
                onClick={() => setStep("email")}
                className="w-full mt-3 text-sm text-slate-500 hover:text-slate-700"
              >
                ← Change email
              </button>

            </form>
          )}

        </div>

        <p className="text-xs text-slate-400 text-center mt-6">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>

      </div>
    </div>
  );
}

export default Login;