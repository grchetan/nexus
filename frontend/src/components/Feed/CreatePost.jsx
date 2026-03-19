import { useState, useRef } from "react";
import { useApp } from "../../context/AppContext";
import { postsAPI } from "../../services/api";
import Avatar from "../common/Avatar";

export function PostModal({ onPostCreated }) {
  const { showPostModal, setShowPostModal, showToast, currentUser } = useApp();
  const [text,      setText]      = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [preview,   setPreview]   = useState(null);
  const [previewType, setPreviewType] = useState(""); // "image"|"video"
  const [loading,   setLoading]   = useState(false);
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMediaFile(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
    setPreviewType(file.type.startsWith("video") ? "video" : "image");
  };

  const removeMedia = () => {
    setMediaFile(null);
    setPreview(null);
    setPreviewType("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const publish = async () => {
    if (!text.trim() && !mediaFile) return;
    setLoading(true);
    try {
      const { post } = await postsAPI.create(text.trim(), mediaFile);
      onPostCreated?.(post);
      setText(""); removeMedia();
      setShowPostModal(false);
      showToast("✅ Post published!", "success");
    } catch (err) {
      showToast(`❌ ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  if (!showPostModal) return null;

  return (
    <div className="post-modal-overlay show"
      onClick={(e) => { if (e.target === e.currentTarget) setShowPostModal(false); }}>
      <div className="post-modal-box">
        <div className="post-modal-header">
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <Avatar user={currentUser} size={40} avClass="av-me" />
            <div>
              <div style={{ fontWeight:700, fontSize:"0.88rem" }}>{currentUser?.fullName}</div>
              <div style={{ fontSize:"0.72rem", color:"var(--text-muted)" }}>Post to Everyone</div>
            </div>
          </div>
          <button className="post-modal-close" onClick={() => setShowPostModal(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <textarea
          className="post-textarea"
          placeholder={`What's on your mind, ${currentUser?.firstName || ""}?`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />

        {/* Media Preview */}
        {preview && (
          <div style={{ position:"relative", marginTop:10, borderRadius:12, overflow:"hidden", border:"1px solid var(--border)" }}>
            {previewType === "video"
              ? <video src={preview} controls style={{ width:"100%", maxHeight:260, background:"#000" }}/>
              : <img src={preview} alt="preview" style={{ width:"100%", maxHeight:260, objectFit:"cover", display:"block" }}/>}
            <button onClick={removeMedia}
              style={{ position:"absolute", top:8, right:8, width:28, height:28, borderRadius:"50%", background:"rgba(0,0,0,0.6)", color:"white", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <i className="fa-solid fa-xmark" style={{ fontSize:"0.75rem" }}></i>
            </button>
          </div>
        )}

        <div className="post-modal-actions">
          <div className="post-modal-opts">
            {/* Photo */}
            <div className="post-opt-btn" title="Photo/Video" style={{ color:"#22c55e" }}
              onClick={() => fileRef.current?.click()}>
              <i className="fa-solid fa-image"></i>
            </div>
            {/* Video shortcut */}
            <div className="post-opt-btn" title="Video" style={{ color:"#ef4444" }}
              onClick={() => fileRef.current?.click()}>
              <i className="fa-solid fa-video"></i>
            </div>
            <div className="post-opt-btn" title="Hashtag" style={{ color:"var(--blue)" }}
              onClick={() => setText((t) => t + " #")}>
              <i className="fa-solid fa-hashtag"></i>
            </div>
          </div>

          <input ref={fileRef} type="file" accept="image/*,video/*"
            style={{ display:"none" }} onChange={handleFile} />

          <button className="btn-post" disabled={(!text.trim() && !mediaFile) || loading} onClick={publish}>
            {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Posting…</> : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CreatePost() {
  const { setShowPostModal, currentUser } = useApp();
  return (
    <div className="card post-create-card">
      <div className="post-create-top">
        <Avatar user={currentUser} size={42} avClass="av-me" className="post-create-avatar" />
        <input className="post-create-input" type="text"
          placeholder={`Share an idea, ${currentUser?.firstName || ""}…`}
          onClick={() => setShowPostModal(true)} readOnly />
      </div>
      <div className="post-divider"></div>
      <div className="post-create-actions">
        {[
          { label:"Photo",    icon:"fa-image",    cls:"photo" },
          { label:"Video",    icon:"fa-video",    cls:"video" },
          { label:"Document", icon:"fa-file-alt", cls:"doc"   },
          { label:"Article",  icon:"fa-pen-nib",  cls:"article"},
        ].map((b) => (
          <button key={b.label} className={`post-action-btn ${b.cls}`}
            onClick={() => setShowPostModal(true)}>
            <i className={`fa-solid ${b.icon}`}></i> {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}
