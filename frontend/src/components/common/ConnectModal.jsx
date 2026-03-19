import { useApp } from "../../context/AppContext";

export default function ConnectModal() {
  const { showConnectModal, setShowConnectModal, connectName } = useApp();

  if (!showConnectModal) return null;

  return (
    <div
      className="modal-overlay show"
      onClick={(e) => {
        if (e.target === e.currentTarget) setShowConnectModal(false);
      }}
    >
      <div className="modal-box">
        <div className="modal-title">🤝 Connection Request Sent!</div>
        <div className="modal-sub">
          Your connection request has been sent to{" "}
          <strong>{connectName}</strong>. They will be notified shortly.
        </div>
        <div
          style={{
            padding: "16px",
            background: "#f0fdf4",
            borderRadius: "12px",
            border: "1px solid #bbf7d0",
          }}
        >
          <div style={{ fontSize: "0.82rem", color: "#166534", fontWeight: 600, marginBottom: 4 }}>
            ✅ Request Status: Pending
          </div>
          <div style={{ fontSize: "0.78rem", color: "#15803d" }}>
            You'll get a notification when they accept your request.
          </div>
        </div>
        <div className="modal-actions">
          <button className="modal-btn-ok" onClick={() => setShowConnectModal(false)}>
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
