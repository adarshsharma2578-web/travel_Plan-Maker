import { useState } from "react";
import "./travelSearch.css";

const API_BASE_URL = "http://127.0.0.1:8000";

function TravelSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchTravel = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/search?query=${encodeURIComponent(query)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Travel search failed");
      }

      setResult(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="travel-search-page">

      <p className="search-label">AI TRAVEL SEARCH</p>

      <h1>Discover something new 🔎</h1>

      <p className="search-description">
        Search for destinations, attractions, hotels,
        travel tips and more.
      </p>

      <div className="travel-search-box">

        <input
          placeholder="Try: Best places to visit in Bali"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") searchTravel();
          }}
        />

        <button onClick={searchTravel}>
          {loading ? "Searching..." : "Search"}
        </button>

      </div>

      {error && (
        <div className="search-error">
          {error}
        </div>
      )}

      {result && (
        <div className="search-result">

          <h2>Search Results</h2>

          <pre>
            {JSON.stringify(result, null, 2)}
          </pre>

        </div>
      )}

    </div>
  );
}

export default TravelSearch;