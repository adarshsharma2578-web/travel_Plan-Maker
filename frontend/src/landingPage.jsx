import "./landing.css";

function LandingPage({ goToLogin, goToRegister }) {
  return (
    <div className="landing-page">

      <header className="landing-header">

        <div className="landing-logo">
          ✈ Travel<span>Plan</span>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#destinations">Destinations</a>
          <a href="#moments">Moments</a>
          <a href="#about">About</a>
        </nav>

        <div className="landing-actions">
          <button
            className="login-link"
            onClick={goToLogin}
          >
            Sign In
          </button>

          <button
            className="register-btn"
            onClick={goToRegister}
          >
            Register
          </button>
        </div>

      </header>

      <section
        id="home"
        className="landing-hero"
      >

        <div className="hero-content">

          <p className="hero-small">
            YOUR SMART TRAVEL COMPANION
          </p>

          <h1>
            Discover the world.
            <br />
            Plan your perfect trip.
          </h1>

          <p className="hero-description">
            Discover beautiful destinations, find amazing places,
            check weather, explore flights and create your perfect
            travel plan.
          </p>

          <div className="hero-search">
            <span>🔍</span>

            <input
              placeholder="Where do you want to go?"
            />

            <button onClick={goToRegister}>
              Explore
            </button>
          </div>

        </div>

      </section>

      <section
        id="destinations"
        className="landing-section"
      >

        <div className="section-heading">
          <div>
            <p>EXPLORE</p>
            <h2>Popular Destinations</h2>
          </div>
        </div>

        <div className="landing-destinations">

          <div className="landing-destination">
            <img
              src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80"
              alt="Bali"
            />

            <div>
              <h3>Bali</h3>
              <p>Indonesia</p>
            </div>
          </div>

          <div className="landing-destination">
            <img
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80"
              alt="Dubai"
            />

            <div>
              <h3>Dubai</h3>
              <p>United Arab Emirates</p>
            </div>
          </div>

          <div className="landing-destination">
            <img
              src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80"
              alt="Paris"
            />

            <div>
              <h3>Paris</h3>
              <p>France</p>
            </div>
          </div>

          <div className="landing-destination">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80"
              alt="Switzerland"
            />

            <div>
              <h3>Switzerland</h3>
              <p>Europe</p>
            </div>
          </div>

        </div>

      </section>

      <section
        id="moments"
        className="moments-section"
      >

        <div className="section-heading">
          <p>TRAVEL INSPIRATION</p>
          <h2>Travel Moments</h2>
          <span>
            Discover experiences from beautiful destinations.
          </span>
        </div>

        <div className="moments-grid">

          <div className="moment-card">
            <img
              src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80"
              alt="Bali"
            />

            <div className="moment-content">
              <h3>5 Days in Bali 🌴</h3>
              <p>
                Beaches, temples, amazing food and unforgettable
                experiences.
              </p>

              <div className="moment-user">
                ❤️ 124 &nbsp; 💬 18
              </div>
            </div>
          </div>

          <div className="moment-card">
            <img
              src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80"
              alt="Paris"
            />

            <div className="moment-content">
              <h3>Paris Weekend 🇫🇷</h3>
              <p>
                Explore iconic places, delicious food and beautiful
                streets.
              </p>

              <div className="moment-user">
                ❤️ 98 &nbsp; 💬 12
              </div>
            </div>
          </div>

        </div>

      </section>

      <section
        id="about"
        className="landing-about"
      >

        <p>ABOUT TRAVELPLAN</p>

        <h2>
          Your intelligent travel companion.
        </h2>

        <p>
          TravelPlan brings destinations, weather, flights,
          travel search and budget planning together in one
          beautiful platform.
        </p>

      </section>

      <footer>
        <strong>✈ TravelPlan</strong>
        <span>Plan smarter. Travel better.</span>
      </footer>

    </div>
  );
}

export default LandingPage;