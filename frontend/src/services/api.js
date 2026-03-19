const BASE = "http://localhost:5000";

// ─── Helper: get stored token ─────────────────────────────────────────────────
export const getToken = () => localStorage.getItem("nexus_token");
export const setToken = (t) => localStorage.setItem("nexus_token", t);
export const removeToken = () => localStorage.removeItem("nexus_token");

// ─── Helper: get image URL from filename ──────────────────────────────────────
export const avatarUrl = (filename) =>
  filename ? `${BASE}/uploads/avatars/${filename}` : null;

export const coverUrl = (filename) =>
  filename ? `${BASE}/uploads/covers/${filename}` : null;

export const postMediaUrl = (filename) =>
  filename ? `${BASE}/uploads/posts/${filename}` : null;

// ─── Core fetch wrapper ───────────────────────────────────────────────────────
async function api(method, endpoint, body = null, isFormData = false) {
  const token = getToken();
  const headers = {};

  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!isFormData) headers["Content-Type"] = "application/json";

  const options = { method, headers };
  if (body) options.body = isFormData ? body : JSON.stringify(body);

  const res = await fetch(`${BASE}${endpoint}`, options);
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
export const authAPI = {
  signup: (body) => api("POST", "/api/auth/signup", body),
  login:  (body) => api("POST", "/api/auth/login",  body),
  me:     ()     => api("GET",  "/api/auth/me"),
};

// ─── USERS ────────────────────────────────────────────────────────────────────
export const usersAPI = {
  getProfile:  (id)  => api("GET",  `/api/users/${id}`),
  updateProfile:(body)=> api("PUT",  "/api/users/profile", body),
  search:      (q)   => api("GET",  `/api/users/search?q=${encodeURIComponent(q)}`),
  suggestions: ()    => api("GET",  "/api/users/suggestions"),
  connect:     (id)  => api("POST", `/api/users/${id}/connect`),

  uploadAvatar: (file) => {
    const fd = new FormData();
    fd.append("avatar", file);
    return api("POST", "/api/users/avatar", fd, true);
  },

  uploadCover: (file) => {
    const fd = new FormData();
    fd.append("cover", file);
    return api("POST", "/api/users/cover", fd, true);
  },
};

// ─── POSTS ────────────────────────────────────────────────────────────────────
export const postsAPI = {
  getFeed:    (page = 1) => api("GET", `/api/posts/feed?page=${page}`),
  getUserPosts:(userId)  => api("GET", `/api/posts/user/${userId}`),
  like:       (id)       => api("PUT", `/api/posts/${id}/like`),
  comment:    (id, text) => api("POST",`/api/posts/${id}/comment`, { text }),
  delete:     (id)       => api("DELETE", `/api/posts/${id}`),

  create: (text, mediaFile) => {
    const fd = new FormData();
    if (text)      fd.append("text",  text);
    if (mediaFile) fd.append("media", mediaFile);
    return api("POST", "/api/posts", fd, true);
  },
};
