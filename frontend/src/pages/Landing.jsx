import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero2.png"; // your photo/collage image

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0f0" }}>
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 40px",
          borderBottom: "1px solid #eee",

          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "#2F7D4F", fontSize: "40px" }}>📍</span>
          <span style={{ fontSize: "34px", fontWeight: 700, color: "#0f1b14" }}>CivicFix</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "36px", flexWrap: "wrap" }}>
          <button onClick={() => navigate("/contact")} style={navLinkStyle}>Contact Us</button>
          <button onClick={() => navigate("/voting")} style={navLinkStyle}>Voting</button>
          <button onClick={() => navigate("/issue-map")} style={navLinkStyle}>Issue Map</button>
          <button onClick={() => navigate("/feedback")} style={navLinkStyle}>Feedback</button>
        </div>
      </nav>

      {/* Full-width image with Get Started overlay */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "calc(100vh - 96px)", // fills remaining space below navbar
        }}
      >
        <img
          src={heroImg}
          alt="Civic issues around the city"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        <button
          onClick={() => navigate("/login")}
          style={{
            position: "absolute",
            top: "52%",
            left: "35%",
            transform: "translate(-50%, -50%)",
            background: "#2F7D4F",
            color: "#fff",
            border: "none",
            padding: "26px 70px",
            borderRadius: "16px",
            fontWeight: 700,
            fontSize: "30px",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

const navLinkStyle = {
  background: "none",
  border: "none",
  color: "#0f1b14",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "26px",
};

export default Landing;