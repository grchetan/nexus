import { useState, useRef } from "react";
import { useApp } from "../../context/AppContext";
import { usersAPI, coverUrl, avatarUrl } from "../../services/api";
import Avatar from "../common/Avatar";

// ── Edit Profile Modal ──────────────────────────────────────────────────────
function EditModal({ user, onClose, onSave }) {
  const { showToast } = useApp();
  const [form, setForm] = useState({
    firstName: user.firstName || "",
    lastName:  user.lastName  || "",
    headline:  user.headline  || "",
    role:      user.role      || "",
    location:  user.location  || "",
    about:     user.about     || "",
    openToWork:user.openToWork|| false,
    skills:    (user.skills || []).join(", "),
  });
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const save = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      };
      const { user: updated } = await usersAPI.updateProfile(payload);
      onSave(updated);
      showToast("✅ Profile updated!", "success");
      onClose();
    } catch (err) {
      showToast(`❌ ${err.message}`, "error");
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width:"100%", height:40, background:"#f8fafc", border:"1.5px solid #e2e8f0",
    borderRadius:8, padding:"0 12px", fontFamily:"var(--font-body)", fontSize:"0.875rem",
    color:"var(--text-primary)", outline:"none", marginBottom:12,
  };
  const labelStyle = { display:"block", fontSize:"0.78rem", fontWeight:600, color:"var(--text-secondary)", marginBottom:4 };

  return (
    <div className="modal-overlay show" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth:540 }}>
        <div className="modal-title">✏️ Edit Profile</div>
        <div style={{ maxHeight:"65vh", overflowY:"auto", paddingRight:4 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div>
              <label style={labelStyle}>First Name</label>
              <input style={inputStyle} value={form.firstName} onChange={set("firstName")} />
            </div>
            <div>
              <label style={labelStyle}>Last Name</label>
              <input style={inputStyle} value={form.lastName} onChange={set("lastName")} />
            </div>
          </div>
          <label style={labelStyle}>Headline</label>
          <input style={inputStyle} placeholder="e.g. Senior Designer @ Google" value={form.headline} onChange={set("headline")} />
          <label style={labelStyle}>Current Role</label>
          <input style={inputStyle} placeholder="e.g. Software Engineer" value={form.role} onChange={set("role")} />
          <label style={labelStyle}>Location</label>
          <input style={inputStyle} placeholder="e.g. Bengaluru, India" value={form.location} onChange={set("location")} />
          <label style={labelStyle}>Skills (comma separated)</label>
          <input style={inputStyle} placeholder="React, Node.js, Figma…" value={form.skills} onChange={set("skills")} />
          <label style={labelStyle}>About</label>
          <textarea
            style={{ ...inputStyle, height:90, resize:"vertical", padding:"10px 12px" }}
            placeholder="Write about yourself…"
            value={form.about}
            onChange={set("about")}
          />
          <label style={{ ...labelStyle, display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
            <input type="checkbox" checked={form.openToWork}
              onChange={(e) => setForm((p) => ({ ...p, openToWork: e.target.checked }))}
              style={{ accentColor:"var(--green)" }} />
            Open to work
          </label>
        </div>
        <div className="modal-actions">
          <button className="modal-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="modal-btn-ok" onClick={save} disabled={saving}>
            {saving ? <><i className="fa-solid fa-spinner fa-spin"></i> Saving…</> : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main ProfilePage ─────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { showToast, currentUser, updateUser } = useApp();
  const [showEdit,    setShowEdit]    = useState(false);
  const [uploading,   setUploading]   = useState(""); // "avatar"|"cover"|""
  const avatarInputRef = useRef(null);
  const coverInputRef  = useRef(null);

  const user = currentUser;
  if (!user) return null;

  // ── Avatar upload ────────────────────────────────────────────────────────
  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading("avatar");
    try {
      const { user: updated } = await usersAPI.uploadAvatar(file);
      updateUser(updated);
      showToast("✅ Profile photo updated!", "success");
    } catch (err) {
      showToast(`❌ ${err.message}`, "error");
    } finally {
      setUploading("");
      e.target.value = "";
    }
  };

  // ── Cover upload ─────────────────────────────────────────────────────────
  const handleCoverChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading("cover");
    try {
      const { user: updated } = await usersAPI.uploadCover(file);
      updateUser(updated);
      showToast("✅ Cover photo updated!", "success");
    } catch (err) {
      showToast(`❌ ${err.message}`, "error");
    } finally {
      setUploading("");
      e.target.value = "";
    }
  };

  const cover = user.coverPhoto ? coverUrl(user.coverPhoto) : null;

  return (
    <div className="page active" id="profile-page" style={{ paddingTop:84, paddingBottom:40 }}>
      {showEdit && (
        <EditModal
          user={user}
          onClose={() => setShowEdit(false)}
          onSave={(u) => updateUser(u)}
        />
      )}

      <div style={{ maxWidth:860, margin:"0 auto", padding:"0 20px" }}>
        {/* Cover + Info Card */}
        <div className="card" style={{ overflow:"hidden", marginBottom:16 }}>
          {/* Cover Banner */}
          <div className="cover-banner"
            style={cover ? { backgroundImage:`url(${cover})`, backgroundSize:"cover", backgroundPosition:"center" } : {}}>
            <input ref={coverInputRef} type="file" accept="image/*"
              style={{ display:"none" }} onChange={handleCoverChange} />
            <button className="cover-banner-edit"
              onClick={() => coverInputRef.current?.click()}
              disabled={uploading === "cover"}>
              {uploading === "cover"
                ? <><i className="fa-solid fa-spinner fa-spin"></i> Uploading…</>
                : <><i className="fa-solid fa-camera"></i> Edit Cover</>}
            </button>
          </div>

          <div className="profile-info-section">
            <div className="profile-photo-row">
              {/* Avatar with click-to-upload */}
              <div className="profile-big-avatar"
                style={{ cursor:"pointer", position:"relative" }}
                onClick={() => avatarInputRef.current?.click()}
                title="Click to change photo">
                <input ref={avatarInputRef} type="file" accept="image/*"
                  style={{ display:"none" }} onChange={handleAvatarChange} />
                <Avatar user={user} size={120} avClass="av-me"
                  style={{ border:"4px solid white", boxShadow:"0 8px 24px rgba(15,23,42,0.18)" }} />
                {/* Camera overlay */}
                <div style={{
                  position:"absolute", inset:0, borderRadius:"50%",
                  background:"rgba(0,0,0,0.35)", display:"flex", alignItems:"center", justifyContent:"center",
                  opacity: uploading==="avatar" ? 1 : 0, transition:"opacity 0.2s",
                  pointerEvents:"none"
                }}
                  className="avatar-overlay">
                  <i className={`fa-solid ${uploading==="avatar" ? "fa-spinner fa-spin" : "fa-camera"}`}
                    style={{ color:"white", fontSize:"1.4rem" }}></i>
                </div>
              </div>

              <div className="profile-top-actions">
                <button className="btn-outline" onClick={() => setShowEdit(true)}>
                  <i className="fa-solid fa-pencil"></i> Edit Profile
                </button>
                <button className="btn-primary" onClick={() => showToast("✅ Profile shared!", "success")}>
                  <i className="fa-solid fa-share-nodes"></i> Share
                </button>
              </div>
            </div>

            <div className="profile-big-name">{user.fullName}</div>
            <div className="profile-big-title">{user.headline || user.role || <span style={{ color:"var(--text-muted)" }}>Add your headline</span>}</div>
            {user.location && (
              <div className="profile-loc">
                <i className="fa-solid fa-location-dot"></i> {user.location}
              </div>
            )}
            <div className="profile-stats-row">
              <div className="profile-stat">{user.followersCount || 0} <span>followers</span></div>
              <div className="profile-stat">{user.connectionsCount || 0} <span>connections</span></div>
              {user.openToWork && <div className="profile-stat" style={{ color:"var(--green)" }}>✅ Open to work</div>}
            </div>

            {/* Skills */}
            {user.skills?.length > 0 && (
              <div className="skills-row">
                {user.skills.map((s) => <span key={s} className="skill-tag">{s}</span>)}
              </div>
            )}
          </div>
        </div>

        {/* About */}
        {user.about && (
          <div className="card profile-section-card">
            <div className="section-title">
              About
              <i className="fa-solid fa-pencil" onClick={() => setShowEdit(true)}></i>
            </div>
            <p style={{ fontSize:"0.875rem", color:"var(--text-secondary)", lineHeight:1.8, whiteSpace:"pre-line" }}>
              {user.about}
            </p>
          </div>
        )}

        {/* Experience */}
        {user.experience?.length > 0 && (
          <div className="card profile-section-card">
            <div className="section-title">Experience
              <i className="fa-solid fa-pencil" onClick={() => setShowEdit(true)}></i>
            </div>
            {user.experience.map((exp, i) => (
              <div key={i} className="exp-item">
                <div className="exp-logo">{exp.icon || "💼"}</div>
                <div className="exp-body">
                  <div className="exp-title">{exp.title}</div>
                  <div className="exp-company">{exp.company}</div>
                  {exp.duration && <div className="exp-duration">{exp.duration}</div>}
                  {exp.desc    && <div className="exp-desc">{exp.desc}</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {user.education?.length > 0 && (
          <div className="card profile-section-card">
            <div className="section-title">Education
              <i className="fa-solid fa-pencil" onClick={() => setShowEdit(true)}></i>
            </div>
            {user.education.map((edu, i) => (
              <div key={i} className="exp-item">
                <div className="exp-logo">{edu.icon || "🎓"}</div>
                <div className="exp-body">
                  <div className="exp-title">{edu.title}</div>
                  <div className="exp-company">{edu.school}</div>
                  {edu.duration && <div className="exp-duration">{edu.duration}</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state if no extra sections */}
        {!user.about && !user.experience?.length && !user.education?.length && (
          <div className="card" style={{ padding:32, textAlign:"center" }}>
            <div style={{ fontSize:"2rem", marginBottom:10 }}>🪄</div>
            <div style={{ fontFamily:"var(--font-display)", fontWeight:700, color:"var(--text-primary)", marginBottom:6 }}>
              Complete your profile
            </div>
            <div style={{ fontSize:"0.85rem", color:"var(--text-muted)", marginBottom:16 }}>
              Add your experience, education and skills to stand out
            </div>
            <button className="btn-primary" style={{ margin:"0 auto" }} onClick={() => setShowEdit(true)}>
              <i className="fa-solid fa-pencil"></i> Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* CSS for avatar hover overlay */}
      <style>{`
        .profile-big-avatar:hover .avatar-overlay { opacity: 1 !important; }
      `}</style>
    </div>
  );
}
