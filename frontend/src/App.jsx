import { useState } from "react";
import LandingPage from "./landingPage";
import Login from "./login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import "./index.css";

function App() {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("travelUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("travelUser", JSON.stringify(userData));
    setPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("travelUser");
    setUser(null);
    setPage("landing");
  };

  return (
    <>
      {page === "landing" && (
        <LandingPage
          goToLogin={() => setPage("login")}
          goToRegister={() => setPage("register")}
        />
      )}

      {page === "login" && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          goToRegister={() => setPage("register")}
          goHome={() => setPage("landing")}
        />
      )}

      {page === "register" && (
        <Register
          goToLogin={() => setPage("login")}
          goHome={() => setPage("landing")}
        />
      )}

      {page === "dashboard" && (
        <Dashboard
          user={user}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}

export default App;