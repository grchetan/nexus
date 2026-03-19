import { useApp } from "../../context/AppContext";

const STORIES = [
  { avClass: "av-1", initials: "SM", name: "Sanya M." },
  { avClass: "av-2", initials: "RK", name: "Rohit K." },
  { avClass: "av-3", initials: "PA", name: "Priya A." },
  { avClass: "av-4", initials: "VN", name: "Vivek N." },
  { avClass: "av-5", initials: "LD", name: "Leela D." },
];

export default function StoriesRow() {
  const { showToast } = useApp();

  return (
    <div className="card stories-card">
      <div className="stories-row">
        {/* Add Story */}
        <div className="story-item" onClick={() => showToast("📸 Story creator opened!", "info")}>
          <div className="story-ring" style={{ background: "rgba(37,99,235,0.15)", padding: 2 }}>
            <div className="story-inner" style={{ background: "var(--blue-soft)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className="fa-solid fa-plus" style={{ color: "var(--blue)", fontSize: "1rem" }}></i>
            </div>
          </div>
          <span className="story-name" style={{ color: "var(--blue)" }}>Add Story</span>
        </div>

        {STORIES.map((s) => (
          <div key={s.initials} className="story-item"
            onClick={() => showToast(`📖 ${s.name}'s story`, "info")}>
            <div className="story-ring">
              <div className={`story-inner ${s.avClass}`}>
                <div className="av-placeholder sm">{s.initials}</div>
              </div>
            </div>
            <span className="story-name">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
