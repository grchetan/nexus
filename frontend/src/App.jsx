import { useApp } from "./context/AppContext";
import ToastContainer from "./components/common/Toast";
import ConnectModal from "./components/common/ConnectModal";
import AuthPage from "./components/Auth/AuthPage";
import Navbar from "./components/Navbar/Navbar";
import MobileNav from "./components/MobileNav/MobileNav";
import FeedPage from "./components/Feed/FeedPage";
import ProfilePage from "./components/Profile/ProfilePage";
import MessagesPage from "./components/Messages/MessagesPage";
import NotificationsPage from "./components/Notifications/NotificationsPage";
import JobsPage from "./components/Jobs/JobsPage";

function LoadingScreen() {
  return (
    <div style={{
      minHeight:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", gap:16,
    }}>
      <div style={{
        width:52, height:52, borderRadius:14,
        background:"linear-gradient(135deg,var(--blue),var(--accent))",
        display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:"0 8px 24px rgba(37,99,235,0.35)",
        animation:"pulse 1.5s ease-in-out infinite",
      }}>
        <span style={{ color:"white", fontFamily:"var(--font-display)", fontWeight:800, fontSize:"1.4rem" }}>N</span>
      </div>
      <div style={{ color:"var(--text-muted)", fontSize:"0.85rem", fontWeight:500 }}>Loading Nexus…</div>
      <style>{`@keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }`}</style>
    </div>
  );
}

function AppContent() {
  const { isLoggedIn, authLoading, currentPage } = useApp();

  if (authLoading) return <LoadingScreen />;

  return (
    <>
      <ToastContainer />
      <ConnectModal />

      {!isLoggedIn && <AuthPage />}

      {isLoggedIn && (
        <>
          <Navbar />
          {currentPage === "feed"          && <FeedPage />}
          {currentPage === "profile"       && <ProfilePage />}
          {currentPage === "messages"      && <MessagesPage />}
          {currentPage === "notifications" && <NotificationsPage />}
          {currentPage === "jobs"          && <JobsPage />}
          <MobileNav />
        </>
      )}
    </>
  );
}

export default function App() {
  return <AppContent />;
}
