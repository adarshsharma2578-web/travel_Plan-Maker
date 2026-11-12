import { useState } from "react";
import "./login.css";

const API_BASE_URL = "http://127.0.0.1:8000";

function Login({ onLoginSuccess, goToRegister, goHome }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/login/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }

      const userData = {
        name: data.name || data.username || email.split("@")[0],
        email: data.email || email,
        token: data.access_token || data.token || "",
      };

      onLoginSuccess(userData);

    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-image">
        <div className="login-image-content">
          <span>✈</span>
          <h1>Travel far.<br />Discover more.</h1>
          <p>
            Your intelligent travel companion for every journey.
          </p>
        </div>
      </div>

      <div className="login-container">

        <button className="back-home" onClick={goHome}>
          ← Back to home
        </button>

        <div className="login-box">

          <div className="login-logo">
            ✈ Travel<span>Plan</span>
          </div>

          <h2>Welcome back</h2>

          <p className="login-subtitle">
            Sign in to continue your journey.
          </p>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>

          </form>

          <p className="register-text">
            Don't have an account?
            <button onClick={goToRegister}>
              Create account
            </button>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;