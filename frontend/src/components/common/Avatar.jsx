import { avatarUrl } from "../../services/api";

// avClass like "av-1","av-me" etc for gradient fallback
export default function Avatar({ user, size = 40, avClass = "av-me", className = "", style = {} }) {
  const url = user?.avatar ? avatarUrl(user.avatar) : null;
  const initials = user?.initials || (user?.firstName ? `${user.firstName[0]}${user.lastName?.[0]||""}`.toUpperCase() : "?");

  return (
    <div
      className={className}
      style={{
        width: size, height: size, borderRadius: "50%",
        overflow: "hidden", flexShrink: 0, ...style,
      }}
    >
      {url ? (
        <img src={url} alt={initials} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
      ) : (
        <div className={avClass} style={{ width:"100%", height:"100%", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ color:"white", fontWeight:700, fontSize: size > 60 ? "1.6rem" : size > 36 ? "0.9rem" : "0.72rem", fontFamily:"var(--font-display)" }}>
            {initials}
          </span>
        </div>
      )}
    </div>
  );
}
