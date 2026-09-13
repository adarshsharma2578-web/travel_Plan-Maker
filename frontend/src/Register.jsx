import { useState } from "react";
import "./register.css";

const API_BASE_URL = "http://127.0.0.1:8000";

function Register({ goToLogin, goHome }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      // Registration failed
      if (!response.ok) {
        throw new Error(
          data.detail || data.message || "Registration failed"
        );
      }

      // Registration successful
      setMessage("Account created successfully! Redirecting to login...");

      // Clear form
      setName("");
      setEmail("");
      setPassword("");

      // Go to Login page after 1 second
      setTimeout(() => {
        goToLogin();
      }, 1000);

    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      <div className="register-container">

        <button
          className="register-back"
          onClick={goHome}
        >
          ← Back to home
        </button>

        <div className="register-box">

          <div className="register-logo">
            ✈ Travel<span>Plan</span>
          </div>

          <h1>Create your account</h1>

          <p>
            Start planning smarter journeys today.
          </p>

          {/* Error */}
          {error && (
            <div className="register-error">
              {error}
            </div>
          )}

          {/* Success */}
          {message && (
            <div className="register-success">
              {message}
            </div>
          )}

          <form onSubmit={handleRegister}>

            {/* Name */}
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {/* Email */}
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password */}
            <label>Password</label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Register Button */}
            <button
              type="submit"
              className="register-submit"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account →"}
            </button>

          </form>

          <div className="already-account">

            Already have an account?

            <button
              type="button"
              onClick={goToLogin}
            >
              Sign In
            </button>

          </div>

        </div>
      </div>

      {/* Right Side */}
      <div className="register-visual">

        <div>

          <h2>
            Your next adventure starts here.
          </h2>

          <p>
            Explore destinations, manage your budget
            and plan your perfect trip with
            Travel Plan Maker.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;