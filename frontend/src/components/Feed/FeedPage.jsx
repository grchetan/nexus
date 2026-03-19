import { useState, useEffect, useCallback } from "react";
import { useApp } from "../../context/AppContext";
import { postsAPI } from "../../services/api";
import StoriesRow from "./StoriesRow";
import CreatePost, { PostModal } from "./CreatePost";
import PostCard from "./PostCard";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

export default function FeedPage() {
  const { showToast } = useApp();
  const [posts,    setPosts]    = useState([]);
  const [page,     setPage]     = useState(1);
  const [hasMore,  setHasMore]  = useState(true);
  const [loading,  setLoading]  = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch feed
  const fetchFeed = useCallback(async (p = 1) => {
    try {
      const { posts: newPosts, hasMore: more } = await postsAPI.getFeed(p);
      if (p === 1) {
        setPosts(newPosts);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
      }
      setHasMore(more);
      setPage(p);
    } catch (err) {
      showToast(`❌ ${err.message}`, "error");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [showToast]);

  useEffect(() => { fetchFeed(1); }, [fetchFeed]);

  const loadMore = () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    fetchFeed(page + 1);
  };

  // New post from modal prepended
  const handlePostCreated = (post) => {
    setPosts((prev) => [post, ...prev]);
  };

  // Remove deleted post
  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div className="page active full-page" id="feed-page">
      <PostModal onPostCreated={handlePostCreated} />

      <div className="main-layout" style={{ margin:"0 auto", padding:0 }}>
        <LeftSidebar />

        <main className="feed">
          <StoriesRow />
          <CreatePost />

          {loading ? (
            // Skeleton loader
            [1,2,3].map((i) => (
              <div key={i} className="card post-card" style={{ padding:18 }}>
                <div style={{ display:"flex", gap:12, marginBottom:12 }}>
                  <div style={{ width:46, height:46, borderRadius:"50%", background:"#e2e8f0", flexShrink:0 }}/>
                  <div style={{ flex:1 }}>
                    <div style={{ height:12, background:"#e2e8f0", borderRadius:6, marginBottom:8, width:"40%" }}/>
                    <div style={{ height:10, background:"#f1f5f9", borderRadius:6, width:"60%" }}/>
                  </div>
                </div>
                <div style={{ height:10, background:"#f1f5f9", borderRadius:6, marginBottom:8 }}/>
                <div style={{ height:10, background:"#f1f5f9", borderRadius:6, marginBottom:8, width:"80%" }}/>
                <div style={{ height:10, background:"#f1f5f9", borderRadius:6, width:"60%" }}/>
              </div>
            ))
          ) : posts.length === 0 ? (
            <div className="card" style={{ padding:32, textAlign:"center" }}>
              <div style={{ fontSize:"2.5rem", marginBottom:12 }}>📝</div>
              <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"1rem", color:"var(--text-primary)", marginBottom:6 }}>
                No posts yet
              </div>
              <div style={{ fontSize:"0.85rem", color:"var(--text-muted)" }}>
                Be the first to share something!
              </div>
            </div>
          ) : (
            <>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} onDelete={handleDelete} />
              ))}
              {hasMore && (
                <div style={{ textAlign:"center", padding:"8px 0" }}>
                  <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    style={{ padding:"9px 28px", borderRadius:22, border:"1.5px solid var(--border)", background:"white", fontSize:"0.85rem", fontWeight:600, color:"var(--text-secondary)", cursor:"pointer" }}>
                    {loadingMore ? <><i className="fa-solid fa-spinner fa-spin"></i> Loading…</> : "Load more"}
                  </button>
                </div>
              )}
            </>
          )}
        </main>

        <RightSidebar />
      </div>
    </div>
  );
}
