import { useState } from "react";
import "./weather.css";

const API_BASE_URL = "http://127.0.0.1:8000";

function Weather() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchWeather = async () => {

    if (!city.trim()) {
      setError("Please enter a city.");
      return;
    }

    setLoading(true);
    setError("");

    try {

      const response = await fetch(
        `${API_BASE_URL}/api/weather?city=${encodeURIComponent(city)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Unable to get weather."
        );
      }

      setWeather(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="weather-page">

      <p className="weather-label">
        WEATHER
      </p>

      <h1>
        Check destination weather 🌤️
      </h1>

      <p className="weather-description">
        Check the current weather before planning your trip.
      </p>

      <div className="weather-search">

        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city e.g. Mumbai"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchWeather();
            }
          }}
        />

        <button onClick={searchWeather}>
          {loading ? "Checking..." : "Check Weather"}
        </button>

      </div>

      {error && (
        <div className="weather-error">
          {error}
        </div>
      )}

      {weather && (

        <div className="weather-card">

          <div className="weather-main">

            <div>
              <p>Current Weather</p>

              <h2>
                {weather.city || city}
              </h2>
            </div>

            <div className="weather-icon">
              ☀️
            </div>

          </div>

          <div className="weather-temperature">

            {weather.temperature ??
              weather.temp ??
              "--"}°C

          </div>

          <div className="weather-info-grid">

            <div>
              <span>🌡️ Feels Like</span>
              <strong>
                {weather.feels_like ?? "--"}°C
              </strong>
            </div>

            <div>
              <span>💧 Humidity</span>
              <strong>
                {weather.humidity ?? "--"}%
              </strong>
            </div>

            <div>
              <span>💨 Wind</span>
              <strong>
                {weather.wind_speed ?? "--"} km/h
              </strong>
            </div>

            <div>
              <span>☁️ Condition</span>
              <strong>
                {weather.description ||
                  weather.condition ||
                  "Available"}
              </strong>
            </div>

          </div>

          <div className="weather-tip">

            💡 <strong>Travel Tip:</strong>

            Check the weather again before
            starting your journey.

          </div>

        </div>

      )}

    </div>
  );
}

export default Weather;