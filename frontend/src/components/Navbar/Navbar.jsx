import { useState, useEffect, useRef } from "react";
import { useApp } from "../../context/AppContext";
import { usersAPI } from "../../services/api";
import Avatar from "../common/Avatar";

export default function Navbar() {
  const { showPage, logout, currentUser, currentPage, showToast } = useApp();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchVal,    setSearchVal]    = useState("");
  const [showSearch,   setShowSearch]   = useState(false);
  const [searchResults,setSearchResults]= useState([]);
  const dropRef  = useRef(null);
  const searchTimer = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const h = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setShowDropdown(false); };
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, []);

  // Debounced search
  useEffect(() => {
    clearTimeout(searchTimer.current);
    if (!searchVal.trim()) { setSearchResults([]); return; }
    searchTimer.current = setTimeout(async () => {
      try {
        const { users } = await usersAPI.search(searchVal);
        setSearchResults(users);
      } catch { /* silent */ }
    }, 350);
  }, [searchVal]);

  const navItems = [
    { id: "feed",          icon: "fa-house",       label: "Home"     },
    { id: "notifications", icon: "fa-users",        label: "Network"  },
    { id: "jobs",          icon: "fa-briefcase",    label: "Jobs"     },
    { id: "messages",      icon: "fa-comment-dots", label: "Messages" },
    { id: "notifications", icon: "fa-bell",          label: "Alerts"   },
  ];

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo" onClick={() => showPage("feed")}>
        <div className="logo-icon">N</div>
        <span className="logo-text">Nex<span>us</span></span>
      </div>

      {/* Search */}
      <div className="nav-search">
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
        <input
          type="text"
          placeholder="Search people, jobs…"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          onFocus={() => setShowSearch(true)}
          onBlur={() => setTimeout(() => setShowSearch(false), 200)}
        />
        {showSearch && (searchResults.length > 0 || searchVal.trim()) && (
          <div className="nav-search-results show">
            {searchResults.length === 0 ? (
              <div style={{ padding: "12px 14px", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                No results for "{searchVal}"
              </div>
            ) : searchResults.map((u) => (
              <div key={u._id} className="search-result-item"
                onClick={() => { showPage("profile"); setShowSearch(false); setSearchVal(""); }}>
                <Avatar user={u} size={32} avClass="av-1" className="search-result-avatar" />
                <div className="search-result-info">
                  <div className="search-result-name">{u.fullName}</div>
                  <div className="search-result-role">{u.headline || u.role || ""}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Nav buttons */}
      <div className="nav-actions">
        {navItems.map((item, i) => (
          <div key={i}
            className={`nav-btn ${currentPage === item.id ? "active" : ""}`}
            onClick={() => showPage(item.id)}>
            <i className={`fa-solid ${item.icon}`}></i>
            <span>{item.label}</span>
          </div>
        ))}

        {/* Avatar + Dropdown */}
        <div className="nav-avatar" ref={dropRef} onClick={() => setShowDropdown(!showDropdown)}>
          <Avatar user={currentUser} size={36} avClass="av-me" />
          <div className={`nav-dropdown ${showDropdown ? "show" : ""}`}>
            <div style={{ padding: "10px 12px 8px", borderBottom: "1px solid var(--border)", marginBottom: 6 }}>
              <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--text-primary)" }}>
                {currentUser?.fullName}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{currentUser?.email}</div>
            </div>
            <div className="dd-item" onClick={() => showPage("profile")}>
              <i className="fa-solid fa-user"></i> View Profile
            </div>
            <div className="dd-item" onClick={() => showToast("⚙️ Settings!", "info")}>
              <i className="fa-solid fa-gear"></i> Settings
            </div>
            <div className="dd-separator"></div>
            <div className="dd-item dd-logout" onClick={logout}>
              <i className="fa-solid fa-right-from-bracket"></i> Sign Out
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
