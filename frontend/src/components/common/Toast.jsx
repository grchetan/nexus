import { useApp } from "../../context/AppContext";

const icons = {
  success: "fa-circle-check",
  error: "fa-circle-xmark",
  info: "fa-circle-info",
};

export default function ToastContainer() {
  const { toasts } = useApp();

  return (
    <div id="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          <i className={`fa-solid ${icons[t.type] || icons.success}`}></i>
          {t.msg}
        </div>
      ))}
    </div>
  );
}
