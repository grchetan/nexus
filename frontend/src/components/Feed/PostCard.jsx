import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { postsAPI, postMediaUrl } from "../../services/api";
import Avatar from "../common/Avatar";

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60)   return "Just now";
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400)return `${Math.floor(diff/3600)}h ago`;
  return `${Math.floor(diff/86400)}d ago`;
}

function renderText(text) {
  return text.split(/(#\w+)/g).map((part, i) =>
    part.startsWith("#")
      ? <span key={i} className="hashtag">{part}</span>
      : part.split("\n").map((line, j, arr) =>
          j < arr.length - 1 ? [line, <br key={j}/>] : line
        )
  );
}

export default function PostCard({ post, onDelete }) {
  const { showToast, currentUser } = useApp();
  const [likes,   setLikes]   = useState(post.likes);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [comments,setComments]= useState(post.comments);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [submitting,  setSubmitting]  = useState(false);
  const [expanded, setExpanded] = useState(false);

  const isOwner = currentUser?._id === post.author?._id;
  const TEXT_LIMIT = 280;
  const longText = post.text?.length > TEXT_LIMIT;

  const handleLike = async () => {
    // Optimistic
    setIsLiked((p) => !p);
    setLikes((p) => p + (isLiked ? -1 : 1));
    try {
      const res = await postsAPI.like(post._id);
      setLikes(res.likes);
      setIsLiked(res.isLiked);
    } catch {
      // Revert
      setIsLiked((p) => !p);
      setLikes((p) => p + (isLiked ? 1 : -1));
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    setSubmitting(true);
    try {
      const res = await postsAPI.comment(post._id, commentText.trim());
      setComments(res.comments);
      setCommentText("");
      showToast("💬 Comment added!", "success");
    } catch (err) {
      showToast(`❌ ${err.message}`, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await postsAPI.delete(post._id);
      showToast("🗑️ Post deleted", "info");
      onDelete?.(post._id);
    } catch (err) {
      showToast(`❌ ${err.message}`, "error");
    }
  };

  const mediaUrl = post.mediaUrl ? postMediaUrl(post.mediaUrl) : null;

  return (
    <div className="card post-card">
      {/* Header */}
      <div className="post-header">
        <Avatar user={post.author} size={46} avClass="av-1" className="post-avatar" />
        <div className="post-meta">
          <div className="post-author">{post.author?.fullName || "Unknown"}</div>
          <div className="post-headline">{post.author?.headline || ""}</div>
          <div className="post-time">
            <i className="fa-solid fa-clock"></i> {timeAgo(post.createdAt)} · <i className="fa-solid fa-globe-asia"></i>
          </div>
        </div>
        {isOwner && (
          <button className="post-more-btn" onClick={handleDelete} title="Delete post">
            <i className="fa-solid fa-trash" style={{ color: "var(--red)", fontSize: "0.8rem" }}></i>
          </button>
        )}
      </div>

      {/* Text */}
      {post.text && (
        <div className="post-content">
          <div className="post-text">
            {longText && !expanded
              ? <>{renderText(post.text.slice(0, TEXT_LIMIT))}… <span style={{ color:"var(--blue)", cursor:"pointer", fontWeight:600 }} onClick={()=>setExpanded(true)}>see more</span></>
              : renderText(post.text)
            }
          </div>
        </div>
      )}

      {/* Media */}
      {mediaUrl && (
        <div className="post-image" style={{ position:"static" }}>
          {post.mediaType === "video" ? (
            <video src={mediaUrl} controls style={{ width:"100%", maxHeight:400, background:"#000" }} />
          ) : (
            <img src={mediaUrl} alt="post media"
              style={{ width:"100%", maxHeight:480, objectFit:"cover", display:"block" }} />
          )}
        </div>
      )}

      {/* Reactions bar */}
      <div className="post-reactions">
        <div className="reactions-icons">
          <span className="reaction-emoji">👍</span>
          <span className="reaction-emoji">❤️</span>
          <span style={{ fontSize:"0.75rem", color:"var(--text-secondary)", marginLeft:6 }}>
            {likes} {likes === 1 ? "reaction" : "reactions"}
          </span>
        </div>
        <div style={{ fontSize:"0.75rem", color:"var(--text-muted)", cursor:"pointer" }}
          onClick={() => setShowCommentBox(!showCommentBox)}>
          {comments} {comments === 1 ? "comment" : "comments"}
        </div>
      </div>

      {/* Action buttons */}
      <div className="post-actions-bar">
        <button className={`post-react-btn ${isLiked ? "liked" : ""}`} onClick={handleLike}>
          <i className={`fa-${isLiked ? "solid" : "regular"} fa-thumbs-up`}></i>
          {isLiked ? "Liked" : "Like"}
        </button>
        <button className="post-react-btn" onClick={() => setShowCommentBox(!showCommentBox)}>
          <i className="fa-regular fa-comment"></i> Comment
        </button>
        <button className="post-react-btn" onClick={() => showToast("🔁 Reposted!", "success")}>
          <i className="fa-solid fa-retweet"></i> Repost
        </button>
        <button className="post-react-btn" onClick={() => showToast("📤 Sent!", "success")}>
          <i className="fa-solid fa-paper-plane"></i> Send
        </button>
      </div>

      {/* Comment box */}
      {showCommentBox && (
        <div style={{ padding:"0 18px 14px", borderTop:"1px solid var(--border)" }}>
          <div style={{ display:"flex", gap:10, alignItems:"center", marginTop:12 }}>
            <Avatar user={currentUser} size={34} avClass="av-me" />
            <input
              style={{ flex:1, height:36, background:"#f8fafc", border:"1.5px solid #e2e8f0", borderRadius:18, padding:"0 14px", fontFamily:"var(--font-body)", fontSize:"0.85rem", outline:"none" }}
              placeholder="Write a comment…"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleComment()}
            />
            <button
              onClick={handleComment}
              disabled={!commentText.trim() || submitting}
              style={{ width:34, height:34, borderRadius:"50%", background:"var(--blue)", color:"white", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, opacity: (!commentText.trim()||submitting)?0.5:1 }}>
              <i className={`fa-solid ${submitting ? "fa-spinner fa-spin" : "fa-paper-plane"}`} style={{ fontSize:"0.8rem" }}></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
