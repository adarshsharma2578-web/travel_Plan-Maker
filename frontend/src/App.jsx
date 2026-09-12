
import { useState } from "react";
import Login from "./login.jsx";
import Register from "./Register";
import "./App.css";

const API_BASE_URL = "http://127.0.0.1:8000";

function App() {
  const [page, setPage] = useState("home");

  const [city, setCity] = useState("");
  const [destination, setDestination] = useState("");
  const [query, setQuery] = useState("");

  const [weather, setWeather] = useState(null);
  const [flights, setFlights] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------- WEATHER ----------------
  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city.");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/weather?city=${encodeURIComponent(city)}`
      );  

      if (!response.ok) {
        throw new Error(`Weather request failed: ${response.status}`);
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      console.error("Weather Error:", err);
      setError(
        "Unable to get weather. Make sure FastAPI is running and the weather endpoint is correct."
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------------- FLIGHTS ----------------
  const searchFlights = async () => {
    if (!destination.trim()) {
      setError("Please enter a destination.");
      return;
    }

    setLoading(true);
    setError("");
    setFlights(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/flights?destination=${encodeURIComponent(
          destination
        )}`
      );

      if (!response.ok) {
        throw new Error(`Flight request failed: ${response.status}`);
      }

      const data = await response.json();
      setFlights(data);
    } catch (err) {
      console.error("Flight Error:", err);
      setError(
        "Unable to search flights. Make sure FastAPI is running and the flight endpoint is correct."
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------------- TRAVEL SEARCH ----------------
  const searchTravel = async () => {
    if (!query.trim()) {
      setError("Please enter something to search.");
      return;
    }

    setLoading(true);
    setError("");
    setSearchResult(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/search?query=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error(`Search request failed: ${response.status}`);
      }

      const data = await response.json();
      setSearchResult(data);
    } catch (err) {
      console.error("Search Error:", err);
      setError(
        "Unable to search travel information. Make sure FastAPI is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------------- LOGIN ----------------
  if (page === "login") {
    return (
      <Login
        onLoginSuccess={() => setPage("home")}
        goToRegister={() => setPage("register")}
        goHome={() => setPage("home")}
      />
    );
  }

  // ---------------- REGISTER ----------------
  if (page === "register") {
    return (
      <Register
        goToLogin={() => setPage("login")}
        goHome={() => setPage("home")}
      />
    );
  }

  // ---------------- HOME ----------------
  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">✈️ Travel Plan Maker</div>

        <div className="nav-buttons">
          <button onClick={() => setPage("home")}>Home</button>

          <button onClick={() => setPage("login")}>
            Login
          </button>

          <button
            className="register-btn"
            onClick={() => setPage("register")}
          >
            Register
          </button>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <p className="tag">AI POWERED TRAVEL PLANNER</p>

            <h1>
              Plan Your Perfect
              <span> Journey</span>
            </h1>

            <p>
              Search destinations, check weather, explore flights
              and discover travel information in one place.
            </p>

            <button
              className="hero-btn"
              onClick={() =>
                document
                  .getElementById("planner")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Start Planning →
            </button>
          </div>
        </section>

        {/* PLANNER */}
        <section id="planner" className="planner-section">
          <h2>Travel Planner</h2>

          <p className="section-subtitle">
            Everything you need to plan your trip
          </p>

          {error && <div className="error">{error}</div>}

          <div className="planner-grid">
            {/* WEATHER */}
            <div className="card">
              <div className="card-icon">🌦️</div>

              <h3>Weather</h3>

              <p>
                Check the current weather at your destination.
              </p>

              <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <button onClick={getWeather}>
                Check Weather
              </button>

              {weather && (
                <div className="result">
                  <h4>Weather Result</h4>

                  <pre>
                    {JSON.stringify(weather, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* FLIGHTS */}
            <div className="card">
              <div className="card-icon">✈️</div>

              <h3>Flight Search</h3>

              <p>
                Find flight information for your destination.
              </p>

              <input
                type="text"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />

              <button onClick={searchFlights}>
                Search Flights
              </button>

              {flights && (
                <div className="result">
                  <h4>Flight Result</h4>

                  <pre>
                    {JSON.stringify(flights, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* TRAVEL SEARCH */}
            <div className="card">
              <div className="card-icon">🔎</div>

              <h3>Travel Search</h3>

              <p>
                Search for hotels, attractions and travel
                information.
              </p>

              <input
                type="text"
                placeholder="e.g. Best places in Jaipur"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <button onClick={searchTravel}>
                Search
              </button>

              {searchResult && (
                <div className="result">
                  <h4>Search Result</h4>

                  <pre>
                    {JSON.stringify(searchResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="loading">
              Loading...
            </div>
          )}
        </section>

        {/* FEATURES */}
        <section className="features">
          <h2>Why Travel Plan Maker?</h2>

          <div className="feature-grid">
            <div>
              <span>🤖</span>
              <h3>AI Powered</h3>
              <p>
                Intelligent travel assistance using AI agents.
              </p>
            </div>

            <div>
              <span>💰</span>
              <h3>Budget Friendly</h3>
              <p>
                Plan your trip according to your budget.
              </p>
            </div>

            <div>
              <span>📍</span>
              <h3>Smart Planning</h3>
              <p>
                Get useful information about your destination.
              </p>
            </div>

            <div>
              <span>🔐</span>
              <h3>Secure</h3>
              <p>
                User authentication with JWT.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <p>
          © 2026 Travel Plan Maker | AI Travel Assistant
        </p>
      </footer>
    </div>
  );
}

export default App;

