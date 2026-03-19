import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { usersAPI } from "../../services/api";
import ConnectButton from "../common/ConnectButton";
import Avatar from "../common/Avatar";

const TRENDING = [
  { num:"01", topic:"#AIRevolution",    meta:"18.4K posts this week" },
  { num:"02", topic:"#TechLayoffs2024", meta:"12.1K posts this week" },
  { num:"03", topic:"#RemoteWork",      meta:"9.8K posts this week"  },
  { num:"04", topic:"#StartupLife",     meta:"7.3K posts this week"  },
];

const MINI_JOBS = [
  { letter:"G", title:"UX Designer",      company:"Google · Hyderabad",  loc:"On-site", logoStyle:{} },
  { letter:"A", title:"Product Designer", company:"Amazon · Bengaluru",  loc:"Hybrid",  logoStyle:{ background:"linear-gradient(135deg,#fde68a,#f59e0b)" } },
  { letter:"M", title:"UI/UX Lead",       company:"Microsoft · Remote",  loc:"Remote",  logoStyle:{ background:"linear-gradient(135deg,#cffafe,#06b6d4)" } },
];

const AV_CLASSES = ["av-1","av-2","av-3","av-4","av-5","av-6"];

export default function RightSidebar() {
  const { showToast, showPage } = useApp();
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    usersAPI.suggestions()
      .then(({ users }) => setSuggestions(users))
      .catch(() => {});
  }, []);

  return (
    <aside className="right-sidebar">
      {/* Trending */}
      <div className="card trending-card">
        <div className="sidebar-card-title">Trending <a>See all</a></div>
        {TRENDING.map((t) => (
          <div key={t.num} className="trend-item" onClick={() => showToast(`${t.topic} is trending!`, "info")}>
            <div className="trend-num">{t.num}</div>
            <div className="trend-info">
              <div className="trend-topic">{t.topic}</div>
              <div className="trend-meta">{t.meta}</div>
            </div>
          </div>
        ))}
      </div>

      {/* People you may know — real from DB */}
      <div className="card suggested-card">
        <div className="sidebar-card-title">People you may know <a>See all</a></div>
        {suggestions.length === 0 ? (
          <div style={{ fontSize:"0.8rem", color:"var(--text-muted)", padding:"8px 0" }}>
            No suggestions right now 🙂
          </div>
        ) : suggestions.map((u, i) => (
          <div key={u._id} className="suggested-person">
            <Avatar user={u} size={40} avClass={AV_CLASSES[i % AV_CLASSES.length]} className="suggested-avatar" />
            <div className="suggested-info">
              <div className="suggested-name">{u.fullName}</div>
              <div className="suggested-role">{u.headline || u.role || "Member"}</div>
            </div>
            <ConnectButton userId={u._id} name={u.fullName} initialConnected={u.isConnected} />
          </div>
        ))}
      </div>

      {/* Mini Jobs */}
      <div className="card jobs-mini-card">
        <div className="sidebar-card-title">Jobs for you <a onClick={() => showPage("jobs")}>See all</a></div>
        {MINI_JOBS.map((j) => (
          <div key={j.title} className="mini-job" onClick={() => showPage("jobs")}>
            <div className="mini-job-logo" style={j.logoStyle}>{j.letter}</div>
            <div className="mini-job-info">
              <div className="mini-job-title">{j.title}</div>
              <div className="mini-job-company">{j.company}</div>
              <div className="mini-job-loc"><i className="fa-solid fa-location-dot"></i> {j.loc}</div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
