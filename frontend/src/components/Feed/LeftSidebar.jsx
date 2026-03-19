import { useApp } from "../../context/AppContext";
import Avatar from "../common/Avatar";
import { coverUrl } from "../../services/api";

export default function LeftSidebar() {
  const { showPage, showToast, currentUser } = useApp();

  const cover = currentUser?.coverPhoto ? coverUrl(currentUser.coverPhoto) : null;

  return (
    <aside className="left-sidebar">
      <div className="card profile-card">
        {/* Banner */}
        <div className="profile-card-banner"
          style={cover ? { backgroundImage:`url(${cover})`, backgroundSize:"cover", backgroundPosition:"center" } : {}}>
        </div>
        <div className="profile-card-body">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar">
              <Avatar user={currentUser} size={52} avClass="av-me" style={{ border:"3px solid white" }} />
            </div>
          </div>
          <div className="profile-name">{currentUser?.fullName || "Your Name"}</div>
          <div className="profile-headline">{currentUser?.headline || currentUser?.role || "Add your headline"}</div>
          <div className="profile-stats">
            <div className="stat-cell" onClick={() => showToast("📊 Analytics!", "info")}>
              <div className="stat-num">{currentUser?.followersCount || 0}</div>
              <div className="stat-label">Followers</div>
            </div>
            <div className="stat-cell" onClick={() => showPage("notifications")}>
              <div className="stat-num">{currentUser?.connectionsCount || 0}</div>
              <div className="stat-label">Connections</div>
            </div>
          </div>
          <nav className="sidebar-nav">
            {[
              { icon:"fa-user",       label:"My Profile",  action:() => showPage("profile") },
              { icon:"fa-bookmark",   label:"Saved Posts", action:() => showToast("🔖 Saved posts!", "info") },
              { icon:"fa-users",      label:"Groups",      action:() => showToast("👥 Groups!", "info") },
              { icon:"fa-chart-line", label:"Analytics",   action:() => showToast("📈 Analytics!", "info") },
            ].map((item) => (
              <div key={item.label} className="sidebar-nav-item" onClick={item.action}>
                <i className={`fa-solid ${item.icon}`}></i> {item.label}
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className="card shortcuts-card">
        <div className="shortcuts-title">Quick Access</div>
        {[
          { icon:"fa-fire",           color:"var(--blue)", bg:"rgba(37,99,235,0.1)",  label:"Trending Now",  msg:"🔥 Trending!" },
          { icon:"fa-calendar-check", color:"#10b981",     bg:"rgba(16,185,129,0.1)", label:"Events",        msg:"📅 Events!" },
          { icon:"fa-graduation-cap", color:"#f59e0b",     bg:"rgba(245,158,11,0.1)", label:"Learning",      msg:"🎓 Learning!" },
          { icon:"fa-heart",          color:"#ef4444",     bg:"rgba(239,68,68,0.1)",  label:"Volunteering",  msg:"❤️ Volunteering!" },
        ].map((item) => (
          <div key={item.label} className="shortcut-item" onClick={() => showToast(item.msg, "info")}>
            <div className="shortcut-icon" style={{ background:item.bg }}>
              <i className={`fa-solid ${item.icon}`} style={{ color:item.color }}></i>
            </div>
            {item.label}
          </div>
        ))}
      </div>
    </aside>
  );
}
