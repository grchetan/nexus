import { useState } from "react";
import { useApp } from "../../context/AppContext";

const JOBS = [
  {
    id: 1, letter: "G", title: "Senior UX Designer", company: "Google", location: "Hyderabad, India",
    logoStyle: {}, tags: ["Full-time", "Design", "Mid-Senior"], salary: "₹28–42 LPA", match: "87%",
    posted: "2 days ago",
  },
  {
    id: 2, letter: "A", title: "Product Designer", company: "Amazon", location: "Bengaluru, India",
    logoStyle: { background: "linear-gradient(135deg,#fde68a,#f59e0b)" },
    tags: ["Full-time", "Product", "Hybrid"], salary: "₹32–50 LPA", match: "94%", posted: "4 days ago",
  },
  {
    id: 3, letter: "M", title: "UI/UX Lead", company: "Microsoft", location: "Remote",
    logoStyle: { background: "linear-gradient(135deg,#cffafe,#06b6d4)", color: "#0e7490" },
    tags: ["Full-time", "Remote", "Lead"], salary: "₹45–70 LPA", match: "91%", posted: "1 week ago",
    remote: true,
  },
  {
    id: 4, letter: "S", title: "Design Systems Lead", company: "Swiggy", location: "Bengaluru, India",
    logoStyle: { background: "linear-gradient(135deg,#dcfce7,#22c55e)", color: "#166534" },
    tags: ["Full-time", "Systems", "Hybrid"], salary: "₹36–55 LPA", match: "88%", posted: "1 week ago",
  },
  {
    id: 5, letter: "R", title: "Head of Design", company: "Razorpay", location: "Bengaluru, India",
    logoStyle: { background: "linear-gradient(135deg,#fee2e2,#ef4444)", color: "#7f1d1d" },
    tags: ["Full-time", "Leadership", "Senior"], salary: "₹60–90 LPA", match: "82%", posted: "3 days ago",
  },
  {
    id: 6, letter: "Z", title: "Product Designer II", company: "Zomato", location: "Remote",
    logoStyle: { background: "linear-gradient(135deg,#f3e8ff,#a855f7)", color: "#4c1d95" },
    tags: ["Full-time", "Remote", "Mid-level"], salary: "₹22–35 LPA", match: "79%", posted: "5 days ago",
    remote: true,
  },
];

function JobCard({ job }) {
  const { showToast } = useApp();
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="card job-card">
      <div className="job-card-top">
        <div className="job-logo-big" style={job.logoStyle}>{job.letter}</div>
        <div className="job-info">
          <div className="job-title-big">{job.title}</div>
          <div className="job-company-name">{job.company} · {job.location}</div>
        </div>
      </div>
      <div className="job-tags">
        {job.tags.map((tag) => (
          <span key={tag} className={`job-tag ${tag === "Remote" ? "remote" : tag === "Full-time" ? "full-time" : ""}`}>
            {tag}
          </span>
        ))}
      </div>
      <div className="job-salary">
        <i className="fa-solid fa-indian-rupee-sign"></i> {job.salary} · {job.match} match
      </div>
      <div className="job-apply-row">
        <span className="job-posted">
          <i className="fa-solid fa-clock"></i> Posted {job.posted}
        </span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button
            className={`job-saved-btn ${saved ? "saved" : ""}`}
            onClick={() => {
              setSaved(!saved);
              showToast(saved ? "🗑️ Job removed from saved" : "🔖 Job saved!", "info");
            }}
            title="Save job"
          >
            <i className={`fa-${saved ? "solid" : "regular"} fa-bookmark`}></i>
          </button>
          <button
            className="btn-primary"
            style={{
              padding: "7px 18px",
              fontSize: "0.8rem",
              background: applied ? "var(--green)" : undefined,
              boxShadow: applied ? "0 4px 12px rgba(16,185,129,0.35)" : undefined,
              opacity: applied ? 0.9 : 1,
              cursor: applied ? "default" : "pointer",
            }}
            onClick={() => {
              if (applied) return;
              setApplied(true);
              showToast(`🎯 Application sent to ${job.company}!`, "success");
            }}
          >
            {applied ? "✓ Applied!" : "Easy Apply"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function JobsPage() {
  const { showToast } = useApp();

  return (
    <div className="page active" id="jobs-page" style={{ paddingTop: 84, paddingBottom: 40 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.4rem", color: "var(--text-primary)" }}>
              Jobs for you
            </h2>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 2 }}>
              Based on your profile and preferences
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              onClick={() => showToast("🔍 Job filters!", "info")}
              style={{ padding: "7px 16px", borderRadius: 20, border: "1px solid var(--border)", background: "white", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", cursor: "pointer" }}
            >
              <i className="fa-solid fa-filter"></i> Filter
            </button>
            <button
              onClick={() => showToast("🔔 Job alert set!", "success")}
              style={{ padding: "7px 16px", borderRadius: 20, border: "1px solid var(--border)", background: "white", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", cursor: "pointer" }}
            >
              <i className="fa-solid fa-bell"></i> Set Alert
            </button>
          </div>
        </div>

        <div className="jobs-layout">
          {JOBS.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      </div>
    </div>
  );
}
