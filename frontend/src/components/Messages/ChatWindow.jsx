import { useState, useRef, useEffect } from "react";
import { useApp } from "../../context/AppContext";

const INITIAL_MESSAGES = [
  { id: 1, me: false, text: "Hey Chetan! Loved your recent post about design systems 🔥", time: "10:12 AM" },
  { id: 2, me: true,  text: "Thanks Sanya! Been working on it for weeks, glad it resonated 😊", time: "10:14 AM" },
  { id: 3, me: false, text: "Would love to collaborate! Our team is building a new product and looking for a design consultant.", time: "10:15 AM" },
  { id: 4, me: true,  text: "That sounds amazing! Let's catch up 🚀 What's a good time this week?", time: "10:18 AM" },
];

const AUTO_REPLIES = [
  "That sounds amazing! 😊",
  "Absolutely, let's make it happen! 🚀",
  "Sounds perfect 👌",
  "I'll get back to you shortly!",
  "👍 Noted! Will do.",
  "Haha yes! Great idea 💡",
  "Definitely agree on that! 🙌",
];

const EMOJIS = ["😊", "🔥", "👍", "🚀", "💡", "❤️", "🎉", "✅", "😄", "🙌"];

export default function ChatWindow({ person }) {
  const { showToast } = useApp();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    const text = inputVal.trim();
    if (!text) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg = { id: Date.now(), me: true, text, time };
    setMessages((prev) => [...prev, newMsg]);
    setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
      setMessages((prev) => [...prev, { id: Date.now() + 1, me: false, text: reply, time }]);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div className="chat-window">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-header-avatar">
          <div className={person.avClass} style={{ width: "100%", height: "100%", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontWeight: 700, fontSize: "0.75rem" }}>{person.initials}</span>
          </div>
        </div>
        <div>
          <div className="chat-header-name">{person.name}</div>
          <div className="chat-header-status" style={{ color: person.online ? "var(--green)" : "var(--amber)" }}>
            {person.online ? "Online" : "Away"}
          </div>
        </div>
        <div className="chat-header-actions">
          <div className="chat-action-btn" onClick={() => showToast("📹 Video call starting!", "info")}><i className="fa-solid fa-video"></i></div>
          <div className="chat-action-btn" onClick={() => showToast("📞 Calling...", "info")}><i className="fa-solid fa-phone"></i></div>
          <div className="chat-action-btn" onClick={() => showToast("ℹ️ Conversation info!", "info")}><i className="fa-solid fa-ellipsis-vertical"></i></div>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        <div className="msg-date-divider">Today</div>
        {messages.map((msg) => (
          <div key={msg.id} className={`msg-bubble ${msg.me ? "me" : ""}`}>
            <div className="bubble-avatar">
              <div className={msg.me ? "av-me" : person.avClass}
                style={{ width: "100%", height: "100%", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontWeight: 700, fontSize: "0.65rem" }}>
                  {msg.me ? "CP" : person.initials}
                </span>
              </div>
            </div>
            <div className="bubble-body">
              <div className="bubble-text">{msg.text}</div>
              <div className="bubble-time">{msg.time}</div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="msg-bubble">
            <div className="bubble-avatar">
              <div className={person.avClass} style={{ width: "100%", height: "100%", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontWeight: 700, fontSize: "0.65rem" }}>{person.initials}</span>
              </div>
            </div>
            <div className="bubble-body">
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="chat-input-bar">
        <i className="chat-attach-btn fa-solid fa-paperclip" onClick={() => showToast("📎 Attach file!", "info")}></i>
        <div className="chat-input-wrap">
          <textarea
            className="chat-input"
            placeholder="Write a message…"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <span className="chat-emoji-btn" onClick={() => setInputVal((v) => v + EMOJIS[Math.floor(Math.random() * EMOJIS.length)])}>😊</span>
        </div>
        <button className="chat-send-btn" onClick={sendMessage}>
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}
