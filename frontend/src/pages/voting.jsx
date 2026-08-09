import { useState } from "react";

const seedPolls = [
  {
    id: 1,
    question: "Which civic issue should be prioritized this month?",
    options: [
      { text: "Road & Pothole Repairs", votes: 42 },
      { text: "Waste Collection Frequency", votes: 27 },
      { text: "Streetlight Maintenance", votes: 15 },
      { text: "Water Supply Reliability", votes: 33 },
    ],
  },
];

function Voting() {
  const [polls, setPolls] = useState(seedPolls);
  const [tab, setTab] = useState("browse");
  const [votedPolls, setVotedPolls] = useState({});

  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(["", ""]);

  function handleVote(pollId, optionIdx) {
    if (votedPolls[pollId] !== undefined) return;
    setPolls((prev) =>
      prev.map((p) =>
        p.id === pollId
          ? {
              ...p,
              options: p.options.map((o, i) =>
                i === optionIdx ? { ...o, votes: o.votes + 1 } : o
              ),
            }
          : p
      )
    );
    setVotedPolls((prev) => ({ ...prev, [pollId]: optionIdx }));
  }

  function updateOption(idx, value) {
    setNewOptions((prev) => prev.map((o, i) => (i === idx ? value : o)));
  }

  function addOptionField() {
    if (newOptions.length >= 6) return;
    setNewOptions((prev) => [...prev, ""]);
  }

  function createPoll(e) {
    e.preventDefault();
    const cleanOptions = newOptions.filter((o) => o.trim() !== "");
    if (!newQuestion.trim() || cleanOptions.length < 2) {
      alert("Add a question and at least 2 options.");
      return;
    }
    const poll = {
      id: Date.now(),
      question: newQuestion.trim(),
      options: cleanOptions.map((text) => ({ text, votes: 0 })),
    };
    setPolls((prev) => [poll, ...prev]);
    setNewQuestion("");
    setNewOptions(["", ""]);
    setTab("browse");
  }

  const totalVotes = polls.reduce(
    (sum, p) => sum + p.options.reduce((s, o) => s + o.votes, 0),
    0
  );

  return (
    <div style={{ minHeight: "100vh", background: "#F5F0E4", padding: "40px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            background: "#2F7D4F",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 12px",
            color: "#fff",
            fontSize: "22px",
          }}
        >
          🗳️
        </div>
        <h1 style={{ color: "#0E3E29", fontSize: "30px", fontWeight: 700, margin: 0 }}>
          Voting System
        </h1>
        <p style={{ color: "#5C5342", marginTop: "8px" }}>
          Vote on civic priorities and see what matters most to your community.
        </p>
      </div>

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto 20px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "16px",
        }}
      >
        <StatCard label="Active Polls" value={polls.length} />
        <StatCard label="Total Votes" value={totalVotes} />
        <StatCard label="Engagement" value={Object.keys(votedPolls).length} />
      </div>

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto 20px",
          display: "flex",
          background: "#fff",
          borderRadius: "10px",
          border: "1px solid #D8CDB4",
          overflow: "hidden",
        }}
      >
        <TabButton active={tab === "browse"} onClick={() => setTab("browse")}>
          🗳️ Browse Polls
        </TabButton>
        <TabButton active={tab === "create"} onClick={() => setTab("create")}>
          + Create Poll
        </TabButton>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {tab === "browse" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {polls.map((poll) => {
              const pollTotal = poll.options.reduce((s, o) => s + o.votes, 0);
              const hasVoted = votedPolls[poll.id] !== undefined;
              return (
                <div
                  key={poll.id}
                  style={{
                    background: "#fff",
                    borderRadius: "12px",
                    border: "1px solid #D8CDB4",
                    padding: "22px",
                  }}
                >
                  <h3 style={{ margin: "0 0 16px", color: "#211C14" }}>{poll.question}</h3>
                  {poll.options.map((opt, idx) => {
                    const pct = pollTotal ? Math.round((opt.votes / pollTotal) * 100) : 0;
                    const isChosen = votedPolls[poll.id] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleVote(poll.id, idx)}
                        disabled={hasVoted}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          marginBottom: "10px",
                          padding: "12px 14px",
                          borderRadius: "8px",
                          border: isChosen ? "2px solid #2F7D4F" : "1px solid #D8CDB4",
                          background: "#F5F0E4",
                          position: "relative",
                          overflow: "hidden",
                          cursor: hasVoted ? "default" : "pointer",
                        }}
                      >
                        {hasVoted && (
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              bottom: 0,
                              width: `${pct}%`,
                              background: "#D9EDDF",
                              zIndex: 0,
                              transition: "width 0.4s",
                            }}
                          />
                        )}
                        <div
                          style={{
                            position: "relative",
                            zIndex: 1,
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>{opt.text} {isChosen && "✓"}</span>
                          {hasVoted && <span>{pct}% ({opt.votes})</span>}
                        </div>
                      </button>
                    );
                  })}
                  {!hasVoted && (
                    <p style={{ fontSize: "12px", color: "#5C5342", marginTop: "8px" }}>
                      Click an option to cast your vote.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {tab === "create" && (
          <form
            onSubmit={createPoll}
            style={{
              background: "#fff",
              borderRadius: "12px",
              border: "1px solid #D8CDB4",
              padding: "24px",
            }}
          >
            <label style={{ fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "6px" }}>
              Poll Question
            </label>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="e.g. Which issue should we fix first?"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #D8CDB4",
                marginBottom: "16px",
              }}
            />

            <label style={{ fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "6px" }}>
              Options
            </label>
            {newOptions.map((opt, idx) => (
              <input
                key={idx}
                type="text"
                value={opt}
                onChange={(e) => updateOption(idx, e.target.value)}
                placeholder={`Option ${idx + 1}`}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #D8CDB4",
                  marginBottom: "8px",
                }}
              />
            ))}
            <button
              type="button"
              onClick={addOptionField}
              style={{
                background: "none",
                border: "1px solid #2F7D4F",
                color: "#2F7D4F",
                padding: "8px 14px",
                borderRadius: "8px",
                cursor: "pointer",
                marginBottom: "18px",
              }}
            >
              + Add option
            </button>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: "10px",
                border: "none",
                background: "#2F7D4F",
                color: "#fff",
                fontWeight: 600,
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Create Poll
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #D9EDDF, #EAF4EE)",
        borderRadius: "12px",
        padding: "18px",
      }}
    >
      <p style={{ fontSize: "13px", color: "#3E5C4A", margin: 0 }}>{label}</p>
      <p style={{ fontSize: "26px", fontWeight: 700, color: "#0E3E29", margin: "4px 0 0" }}>{value}</p>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: "14px",
        border: "none",
        background: active ? "#EAF4EE" : "#fff",
        color: active ? "#2F7D4F" : "#5C5342",
        fontWeight: 600,
        cursor: "pointer",
        borderBottom: active ? "2px solid #2F7D4F" : "2px solid transparent",
      }}
    >
      {children}
    </button>
  );
}

export default Voting;