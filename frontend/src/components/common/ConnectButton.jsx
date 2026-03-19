import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { usersAPI } from "../../services/api";

export default function ConnectButton({ userId, name, initialConnected = false }) {
  const { showToast } = useApp();
  const [status, setStatus] = useState(initialConnected ? "connected" : "idle");

  const handleClick = async (e) => {
    if (status === "loading") return;
    const btn = e.currentTarget;

    // Ripple effect
    const ripple = document.createElement("span");
    ripple.className = "connect-ripple";
    const rect = btn.getBoundingClientRect();
    ripple.style.left = e.clientX - rect.left + "px";
    ripple.style.top  = e.clientY - rect.top  + "px";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);

    setStatus("loading");
    try {
      const { connected } = await usersAPI.connect(userId);
      setStatus(connected ? "connected" : "idle");
      showToast(connected ? `🎉 Connected with ${name}!` : `Disconnected from ${name}`, connected ? "success" : "info");
    } catch (err) {
      showToast(`❌ ${err.message}`, "error");
      setStatus("idle");
    }
  };

  if (status === "loading") {
    return (
      <button className="connect-btn pending">
        <span><i className="fa-solid fa-spinner fa-spin"></i></span>
      </button>
    );
  }
  if (status === "connected") {
    return (
      <button className="connect-btn connected" onClick={handleClick}>
        <span><i className="fa-solid fa-check"></i> Connected</span>
      </button>
    );
  }
  return (
    <button className="connect-btn" onClick={handleClick}>
      <span><i className="fa-solid fa-plus"></i> Connect</span>
    </button>
  );
}
