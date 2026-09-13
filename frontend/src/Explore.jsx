import "./explore.css";

function Explore({ onDestinationClick, setActivePage }) {

  const destinations = [
    {
      name: "Bali",
      country: "Indonesia",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=85",
      places: [
        "Nusa Penida",
        "Uluwatu Temple",
        "Mount Batur",
        "Seminyak",
        "Kuta Beach",
      ],
    },
    {
      name: "Dubai",
      country: "United Arab Emirates",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=85",
      places: [
        "Burj Khalifa",
        "Dubai Marina",
        "Palm Jumeirah",
        "Dubai Mall",
        "Jumeirah Beach",
      ],
    },
    {
      name: "Paris",
      country: "France",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=85",
      places: [
        "Eiffel Tower",
        "Louvre Museum",
        "Arc de Triomphe",
        "Montmartre",
        "Seine River",
      ],
    },
    {
      name: "Mumbai",
      country: "India",
      image:
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1000&q=85",
      places: [
        "Gateway of India",
        "Marine Drive",
        "Colaba",
        "Siddhivinayak Temple",
        "Juhu Beach",
      ],
    },
  ];

  return (
    <div className="explore-page">

      <section className="explore-hero">

        <div>
          <p>DISCOVER THE WORLD</p>

          <h1>
            Where will you go next?
          </h1>

          <span>
            Find amazing places, experiences and travel inspiration.
          </span>

          <div className="explore-search">
            🔎
            <input
              placeholder="Search destination..."
            />
            <button>
              Search
            </button>
          </div>
        </div>

      </section>

      <section className="explore-section">

        <div className="explore-title">
          <div>
            <p>POPULAR</p>
            <h2>Explore Destinations</h2>
          </div>
        </div>

        <div className="destination-grid">

          {destinations.map((destination) => (

            <div
              className="destination-card"
              key={destination.name}
              onClick={() => onDestinationClick(destination)}
            >

              <img
                src={destination.image}
                alt={destination.name}
              />

              <div className="destination-overlay">

                <h3>
                  {destination.name}
                </h3>

                <p>
                  {destination.country}
                </p>

                <span>
                  Explore places →
                </span>

              </div>

            </div>

          ))}

        </div>

      </section>

      <section className="quick-section">

        <h2>Plan your journey</h2>

        <div className="quick-grid">

          <button onClick={() => setActivePage("weather")}>
            <span>🌤️</span>
            <strong>Weather</strong>
            <small>Check destination weather</small>
          </button>

          <button onClick={() => setActivePage("flights")}>
            <span>✈️</span>
            <strong>Flights</strong>
            <small>Find flight information</small>
          </button>

          <button onClick={() => setActivePage("budget")}>
            <span>💰</span>
            <strong>Budget</strong>
            <small>Plan your travel budget</small>
          </button>

          <button onClick={() => setActivePage("search")}>
            <span>🔎</span>
            <strong>AI Search</strong>
            <small>Discover travel information</small>
          </button>

        </div>

      </section>

    </div>
  );
}

export default Explore;