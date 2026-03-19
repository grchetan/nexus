import { useApp } from "../../context/AppContext";

const NAV_ITEMS = [
  { page: "feed",          icon: "fa-house",        label: "Home" },
  { page: "notifications", icon: "fa-users",         label: "Network" },
  { page: "jobs",          icon: "fa-briefcase",     label: "Jobs" },
  { page: "messages",      icon: "fa-comment-dots",  label: "Msgs" },
  { page: "profile",       icon: "fa-user",          label: "Profile" },
];

export default function MobileNav() {
  const { showPage, currentPage } = useApp();

  return (
    <nav className="mobile-nav" id="mobile-nav">
      {NAV_ITEMS.map((item) => (
        <div
          key={item.page}
          className={`mob-nav-btn ${currentPage === item.page ? "active" : ""}`}
          onClick={() => showPage(item.page)}
        >
          <i className={`fa-solid ${item.icon}`}></i>
          <span>{item.label}</span>
        </div>
      ))}
    </nav>
  );
}
