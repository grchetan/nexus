const CONVERSATIONS = [
  { name: "Sanya Mehra",  initials: "SM", avClass: "av-1", preview: "That sounds amazing! 🚀", time: "2m",  unread: 2, online: true  },
  { name: "Vivek Nair",   initials: "VN", avClass: "av-4", preview: "Thanks for sharing!",      time: "1h",  unread: 0, online: false },
  { name: "Priya Anand",  initials: "PA", avClass: "av-3", preview: "Congrats on the promotion! 🎉", time: "3h", unread: 1, online: true },
  { name: "Rohit Kapoor", initials: "RK", avClass: "av-2", preview: "Let's connect soon!",       time: "2d",  unread: 0, online: false },
  { name: "Aditya Patil", initials: "LD", avClass: "av-5", preview: "Thanks for the recommendation!", time: "3d", unread: 0, online: false },
];

export { CONVERSATIONS };

export default function ConversationList({ activeConv, onSelect, searchVal, setSearchVal }) {
  const filtered = CONVERSATIONS.filter((c) =>
    c.name.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <div className="msg-sidebar">
      <div className="msg-sidebar-header">
        <div className="msg-sidebar-title">
          Messages
          <div className="compose-btn">
            <i className="fa-solid fa-pen"></i>
          </div>
        </div>
        <div className="msg-search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search conversations…"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </div>
      </div>
      <div className="conv-list">
        {filtered.map((conv) => (
          <div
            key={conv.name}
            className={`conv-item ${activeConv === conv.name ? "active" : ""}`}
            onClick={() => onSelect(conv)}
          >
            <div className="conv-avatar">
              <div className={conv.avClass} style={{ width: "100%", height: "100%", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontWeight: 700, fontSize: "0.75rem" }}>{conv.initials}</span>
              </div>
              {conv.online && <div className="online-dot"></div>}
            </div>
            <div className="conv-info">
              <div className="conv-name">{conv.name}</div>
              <div className="conv-preview">{conv.preview}</div>
            </div>
            <div className="conv-meta">
              <span className="conv-time">{conv.time}</span>
              {conv.unread > 0 && <span className="conv-unread">{conv.unread}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
