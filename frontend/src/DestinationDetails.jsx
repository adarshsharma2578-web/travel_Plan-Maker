import "./destination.css";

function DestinationDetails({ destination, setActivePage }) {

  if (!destination) {
    return (
      <div>
        <h2>Destination not found</h2>
      </div>
    );
  }

  return (
    <div className="destination-details">

      <button
        className="back-destination"
        onClick={() => setActivePage("explore")}
      >
        ← Back to Explore
      </button>

      <div className="destination-cover">

        <img
          src={destination.image}
          alt={destination.name}
        />

        <div className="destination-cover-content">

          <p>{destination.country}</p>

          <h1>
            {destination.name}
          </h1>

          <span>
            Discover beautiful places and unforgettable experiences.
          </span>

        </div>

      </div>

      <div className="destination-actions">

        <button onClick={() => setActivePage("weather")}>
          🌤️ Weather
        </button>

        <button onClick={() => setActivePage("flights")}>
          ✈️ Flights
        </button>

        <button onClick={() => setActivePage("budget")}>
          💰 Budget
        </button>

        <button onClick={() => setActivePage("search")}>
          🔎 More Information
        </button>

      </div>

      <section className="places-section">

        <p className="places-label">
          MUST VISIT
        </p>

        <h2>
          Beautiful Places in {destination.name}
        </h2>

        <div className="places-grid">

          {destination.places.map((place, index) => (

            <div
              className="place-card"
              key={place}
            >

              <div className="place-number">
                0{index + 1}
              </div>

              <div>
                <h3>{place}</h3>
                <p>
                  Discover this amazing attraction in{" "}
                  {destination.name}.
                </p>
              </div>

            </div>

          ))}

        </div>

      </section>

      <section className="plan-banner">

        <div>
          <h2>
            Ready to explore {destination.name}?
          </h2>

          <p>
            Build your personalized trip with TravelPlan.
          </p>
        </div>

        <button onClick={() => setActivePage("budget")}>
          Plan My Trip →
        </button>

      </section>

    </div>
  );
}

export default DestinationDetails;