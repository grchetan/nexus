import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { authAPI, getToken, setToken, removeToken } from "../services/api";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useState("auth");
  const [isLoggedIn, setIsLoggedIn]   = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [toasts, setToasts]           = useState([]);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connectName, setConnectName]           = useState("");
  const [showPostModal, setShowPostModal]       = useState(false);

  useEffect(() => {
    const restore = async () => {
      const token = getToken();
      if (!token) { setAuthLoading(false); return; }
      try {
        const { user } = await authAPI.me();
        setCurrentUser(user);
        setIsLoggedIn(true);
        setCurrentPage("feed");
      } catch {
        removeToken();
      } finally {
        setAuthLoading(false);
      }
    };
    restore();
  }, []);

  const showToast = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  const showPage = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const login = useCallback((token, user) => {
    setToken(token);
    setCurrentUser(user);
    setIsLoggedIn(true);
    setCurrentPage("feed");
  }, []);

  const logout = useCallback(() => {
    removeToken();
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCurrentPage("auth");
  }, []);

  const updateUser = useCallback((updatedUser) => {
    setCurrentUser((prev) => ({ ...prev, ...updatedUser }));
  }, []);

  const openConnectModal = useCallback((name) => {
    setConnectName(name);
    setShowConnectModal(true);
  }, []);

  const markAllRead = useCallback(() => {}, []);

  return (
    <AppContext.Provider value={{
      currentPage, showPage,
      isLoggedIn, authLoading,
      currentUser, updateUser,
      login, logout,
      toasts, showToast,
      showConnectModal, setShowConnectModal, connectName, openConnectModal,
      showPostModal, setShowPostModal,
      markAllRead,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
