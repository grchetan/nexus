import { useState } from "react";
import { useApp } from "../../context/AppContext";

const ALL_NOTIFS = [
  { id: 1, type: "like",    avClass: "av-1", initials: "SM", unread: true,
    text: <><strong>Sanya Mehra</strong> and <strong>34 others</strong> liked your post about design systems</>,
    time: "2 minutes ago", action: null },
  { id: 2, type: "connect", avClass: "av-4", initials: "VN", unread: true,
    text: <><strong>Vivek Nair</strong> sent you a connection request · ML Engineer at Google DeepMind</>,
    time: "15 minutes ago", action: "accept", actionLabel: "Accept", actionName: "Vivek Nair" },
  { id: 3, type: "comment", avClass: "av-3", initials: "PA", unread: false,
    text: <><strong>Priya Anand</strong> commented: "This is so insightful, thank you!"</>,
    time: "1 hour ago", action: null },
  { id: 4, type: "job",     avClass: null,   initials: "G",  unread: true, isCompany: true,
    companyStyle: { background: "linear-gradient(135deg,#e0e7ff,#c7d2fe)", color: "var(--navy-mid)", fontSize: "1rem" },
    text: <>Your profile was viewed by a recruiter at <strong>Google</strong> · UX Designer position is open</>,
    time: "3 hours ago", action: "page:jobs", actionLabel: "View Job" },
  { id: 5, type: "mention", avClass: "av-5", initials: "LD", unread: false,
    text: <><strong>Aditya Patil</strong> mentioned you in a post about Data Visualization</>,
    time: "5 hours ago", action: null },
  { id: 6, type: "like",    avClass: "av-6", initials: "KT", unread: false,
    text: <><strong>Kiran Tripathi</strong> and <strong>12 others</strong> reacted to your comment</>,
    time: "Yesterday", action: null },
  { id: 7, type: "job",     avClass: null,   initials: "A",  unread: false, isCompany: true,
    companyStyle: { background: "linear-gradient(135deg,#fde68a,#f59e0b)", color: "white", fontSize: "1rem" },
    text: <>New job alert: <strong>Product Designer</strong> at Amazon matches your profile · Bengaluru</>,
    time: "2 days ago", action: "page:jobs", actionLabel: "Apply" },
];

const NOTIF_ICONS = { like: "fa-thumbs-up", comment: "fa-comment", connect: "fa-user-plus", job: "fa-briefcase", mention: "fa-at" };
const ICON_COLORS  = { like: "var(--blue)", comment: "var(--green)", connect: "var(--accent)", job: "var(--amber)", mention: "var(--purple)" };

export default function NotificationsPage() {
  const { showPage, showToast, setConnCount, markAllRead } = useApp();
  const [notifs, setNotifs] = useState(ALL_NOTIFS);
  const [filter, setFilter] = useState("all");
  const [accepted, setAccepted] = useState({});

  const handleMarkAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));
    markAllRead();
    showToast("✅ All notifications marked as read!", "success");
  };

  const handleAccept = (name) => {
    setAccepted((prev) => ({ ...prev, [name]: true }));
    setConnCount((c) => c + 1);
    showToast(`🤝 You're now connected with ${name}!`, "success");
  };

  const filtered = notifs.filter((n) => {
    if (filter === "all") return true;
    if (filter === "mention") return n.type === "mention";
    if (filter === "job") return n.type === "job";
    return true;
  });

  return (
    <div className="page active" id="notifications-page" style={{ paddingTop: 84, paddingBottom: 40 }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}>
        <div className="notif-header">
          <h2>Notifications</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="mark-all-read" onClick={handleMarkAllRead}>Mark all as read</span>
            <div className="notif-filter">
              {["all", "mention", "job"].map((f) => (
                <button key={f} className={`notif-filter-btn ${filter === f ? "active" : ""}`}
                  onClick={() => setFilter(f)}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}{f === "all" ? "" : "s"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.map((n) => (
          <div key={n.id} className={`card notif-card ${n.unread ? "unread" : ""}`} data-type={n.type}
            onClick={() => setNotifs((prev) => prev.map((x) => x.id === n.id ? { ...x, unread: false } : x))}>
            <div className="notif-avatar">
              {n.isCompany ? (
                <div style={{ width: 46, height: 46, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0, ...n.companyStyle }}>{n.initials}</div>
              ) : (
                <div className={n.avClass} style={{ width: 46, height: 46, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: "white", fontWeight: 700, fontSize: "0.8rem" }}>{n.initials}</span>
                </div>
              )}
              <div className="notif-icon" style={{ background: ICON_COLORS[n.type] }}>
                <i className={`fa-solid ${NOTIF_ICONS[n.type]}`}></i>
              </div>
            </div>
            <div className="notif-body">
              <div className="notif-text">{n.text}</div>
              <div className="notif-time"><i className="fa-solid fa-clock"></i> {n.time}</div>
            </div>
            {n.action && (
              <div className="notif-action" onClick={(e) => e.stopPropagation()}>
                {n.action === "accept" ? (
                  accepted[n.actionName]
                    ? <button className="accept-btn" style={{ background: "var(--green)" }}>✓ Accepted</button>
                    : <button className="accept-btn" onClick={() => handleAccept(n.actionName)}>{n.actionLabel}</button>
                ) : (
                  <button className="accept-btn" onClick={() => showPage(n.action.replace("page:", ""))}>{n.actionLabel}</button>
                )}
              </div>
            )}
            {n.unread && <div className="notif-dot"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}
