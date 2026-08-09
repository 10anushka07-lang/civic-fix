import { useState } from "react";

const categories = [
  "Report Submission Experience",
  "Issue Resolution Speed",
  "App Usability",
  "Communication from Officials",
  "General Suggestion",
  "Other",
];

const moods = [
  { emoji: "😡", label: "Very Unhappy" },
  { emoji: "🙁", label: "Unhappy" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "🙂", label: "Happy" },
  { emoji: "🤩", label: "Very Happy" },
];

function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [mood, setMood] = useState(null);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!category) return alert("Please select a category.");
    if (mood === null) return alert("Please rate your experience.");
    if (!message.trim()) return alert("Please share your feedback.");

    // No backend persistence yet — logged locally for demo purposes.
    console.log("Feedback submitted:", { name, email, phone, category, mood: moods[mood].label, message });

    setSubmitted(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setPhone("");
      setCategory("");
      setMood(null);
      setMessage("");
      setSubmitted(false);
    }, 2500);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F5F0E4", padding: "40px 20px" }}>
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
            fontSize: "22px",
          }}
        >
          💬
        </div>
        <h1 style={{ color: "#0E3E29", fontSize: "30px", fontWeight: 700, margin: 0 }}>
          Share Your Voice
        </h1>
        <p style={{ color: "#5C5342", marginTop: "8px" }}>
          Your feedback shapes better governance. Help us serve you better.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "560px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "12px",
          border: "1px solid #D8CDB4",
          padding: "28px",
        }}
      >
        <p style={{ fontWeight: 600, color: "#211C14", marginBottom: "12px" }}>
          Personal Information (Optional)
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
          <div>
            <label style={{ fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "4px" }}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #D8CDB4" }}
            />
          </div>
          <div>
            <label style={{ fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "4px" }}>Email (Optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #D8CDB4" }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "18px" }}>
          <label style={{ fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "4px" }}>Phone (Optional)</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone"
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #D8CDB4" }}
          />
        </div>

        <div style={{ marginBottom: "18px" }}>
          <label style={{ fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "4px" }}>
            Select Category <span style={{ color: "#B3261E" }}>*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #D8CDB4" }}
          >
            <option value="">-- Choose Category --</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "18px" }}>
          <label style={{ fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "8px" }}>
            Rate Your Experience <span style={{ color: "#B3261E" }}>*</span>
          </label>
          <div style={{ display: "flex", gap: "10px", justifyContent: "space-between" }}>
            {moods.map((m, idx) => (
              <button
                type="button"
                key={m.label}
                onClick={() => setMood(idx)}
                title={m.label}
                style={{
                  fontSize: "22px",
                  padding: "10px",
                  borderRadius: "10px",
                  border: mood === idx ? "2px solid #2F7D4F" : "1px solid #D8CDB4",
                  background: mood === idx ? "#EAF4EE" : "#fff",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                {m.emoji}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "4px" }}>
            Your Feedback <span style={{ color: "#B3261E" }}>*</span>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, 500))}
            placeholder="Share your thoughts..."
            rows="5"
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #D8CDB4", resize: "vertical" }}
          />
          <p style={{ fontSize: "11px", color: "#5C5342", textAlign: "right", marginTop: "4px" }}>
            {message.length}/500 characters
          </p>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "13px",
            borderRadius: "10px",
            border: "none",
            background: submitted ? "#2F7D4F" : "linear-gradient(90deg, #2F7D4F, #6FBE8A)",
            color: "#fff",
            fontWeight: 600,
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          {submitted ? "✓ Feedback Submitted — Thank You!" : "📨 Submit Feedback"}
        </button>
      </form>
    </div>
  );
}

export default Feedback;