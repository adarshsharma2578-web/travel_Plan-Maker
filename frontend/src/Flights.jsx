import { useState } from "react";
import "./flights.css";

const API_BASE_URL = "http://127.0.0.1:8000";

function Flights() {
  const [destination, setDestination] = useState("");
  const [flights, setFlights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchFlights = async () => {
    if (!destination.trim()) {
      setError("Please enter a destination");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/flights?destination=${encodeURIComponent(
          destination
        )}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Flight search failed");
      }

      setFlights(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flights-page">
      <p className="flight-label">FLIGHT INFORMATION</p>

      <h1>Find your next flight ✈️</h1>

      <p className="flight-subtitle">
        Search flight information for your destination.
      </p>

      <div className="flight-search-box">
        <input
          type="text"
          placeholder="Enter destination e.g. Dubai"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <button onClick={searchFlights}>
          {loading ? "Searching..." : "Search Flights"}
        </button>
      </div>

      {error && (
        <div className="flight-error">
          {error}
        </div>
      )}

      {flights && (
        <div className="flight-result">
          <h2>Flight Information</h2>

          <pre>
            {JSON.stringify(flights, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default Flights;