import { useState } from 'react'
import './index.css'

const API_BASE = '/api'

function App() {
  const [formData, setFormData] = useState({
    destination: '',
    date: '',
    days: 3,
    budget: 'Medium',
  })

  const [tripResult, setTripResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setTripResult(null)

    try {
      const response = await fetch(`${API_BASE}/generate-trip`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.detail || 'Something went wrong. Please try again.')
      }

      setTripResult(data)
    } catch (err) {
      setError(err.message || 'Could not reach the server. Make sure the backend is running on port 8000.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      {/* ---------------- NAVBAR ---------------- */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 40px',
          position: 'sticky',
          top: 0,
          background: 'rgba(2,6,23,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800, fontSize: '20px' }}>
          <span style={{ fontSize: '24px' }}>✈️</span> Trip Plan Maker
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="button"
            className="secondary"
            style={{ padding: '10px 20px', fontSize: '14px' }}
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Features
          </button>
          <button
            type="button"
            style={{ padding: '10px 20px', fontSize: '14px' }}
            onClick={() => document.getElementById('trip-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Plan a Trip
          </button>
        </div>
      </nav>

      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <h1>Plan Your Perfect Trip with AI</h1>
        <p style={{ maxWidth: 700, margin: '20px auto', fontSize: '18px', lineHeight: 1.7, color: '#CBD5E1' }}>
          Generate personalized itineraries, discover top attractions, get budget estimates,
          and check weather — all in one place. Powered by real-time web search.
        </p>
        <div className="buttons">
          <button type="button" onClick={() => document.getElementById('trip-form')?.scrollIntoView({ behavior: 'smooth' })}>
            Get Started 🚀
          </button>
          <button type="button" className="secondary" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
            Learn More
          </button>
        </div>
      </section>
      {/* ---------------- HERO ---------------- */}
<section className="hero">
  <h1>Plan Your Perfect Trip with AI</h1>

  <p
    style={{
      maxWidth: 700,
      margin: '20px auto',
      fontSize: '18px',
      lineHeight: 1.7,
      color: '#CBD5E1',
    }}
  >
    Generate personalized itineraries, discover top attractions,
    get budget estimates, and check weather — all in one place.
    Powered by real-time web search.
  </p>

  <div className="buttons">
    <button
      type="button"
      onClick={() =>
        document.getElementById('trip-form')?.scrollIntoView({
          behavior: 'smooth',
        })
      }
    >
      Get Started 🚀
    </button>

    <button
      type="button"
      className="secondary"
      onClick={() =>
        document.getElementById('features')?.scrollIntoView({
          behavior: 'smooth',
        })
      }
    >
      Learn More
    </button>
  </div>

  {/* 👇 Add Stats Here */}
  <div className="stats">
    <div>
      <h2>100+</h2>
      <p>Destinations</p>
    </div>

    <div>
      <h2>AI</h2>
      <p>Personalized Plans</p>
    </div>

    <div>
      <h2>24/7</h2>
      <p>Available</p>
    </div>
  </div>
</section>

      {/* ---------------- FEATURES ---------------- */}
      <section id="features" className="features">
        <div className="card">
          <h2>🧭 AI Itineraries</h2>
          <p>Day-by-day travel plans tailored to your destination, duration, and budget.</p>
        </div>
        <div className="card">
          <h2>🌤️ Weather Forecasts</h2>
          <p>Know the conditions before you go with live weather data for any city.</p>
        </div>
        <div className="card">
          <h2>🔍 Real-time Search</h2>
          <p>Fresh recommendations pulled from the web — not stale static content.</p>
        </div>
        <div className="card">
          <h2>💰 Budget Planning</h2>
          <p>Choose your spending style and get suggestions that fit your wallet.</p>
        </div>
      </section>

      {/* ---------------- TRIP FORM ---------------- */}
      <section id="trip-form" className="trip-form">
        <h2>🌍 Plan Your Trip</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="destination"
            placeholder="Destination (e.g. Tokyo, Paris, Bali)"
            value={formData.destination}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <select name="days" value={formData.days} onChange={handleChange}>
            <option value={1}>1 day</option>
            <option value={2}>2 days</option>
            <option value={3}>3 days</option>
            <option value={5}>5 days</option>
            <option value={7}>7 days</option>
            <option value={10}>10 days</option>
            <option value={14}>14 days</option>
          </select>
          <select name="budget" value={formData.budget} onChange={handleChange}>
            <option value="Budget">Budget 💸</option>
            <option value="Medium">Medium 💰</option>
            <option value="Luxury">Luxury ✨</option>
          </select>
          <section
></section>

          <button type="submit" disabled={loading}>
            {loading ? 'Generating itinerary... ⏳' : 'Generate Itinerary ✨'}
          </button>
        </form>

        {error && (
          <div
            style={{
              marginTop: '25px',
              padding: '18px',
              background: 'rgba(239,68,68,0.15)',
              border: '1px solid rgba(239,68,68,0.4)',
              borderRadius: '12px',
              color: '#FCA5A5',
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {tripResult && (
          <div
            style={{
              marginTop: '35px',
              padding: '24px',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '14px',
              border: '1px solid rgba(255,255,255,0.12)',
              textAlign: 'left',
            }}
          >
            <h3 style={{ color: '#38BDF8', marginBottom: '16px', fontSize: '22px' }}>
              ✈️ Your AI Travel Itinerary for {tripResult.destination}
            </h3>
            <p style={{ whiteSpace: 'pre-line', lineHeight: 1.8, color: '#CBD5E1' }}>
              {tripResult.answer}
            </p>

            {tripResult.plan && tripResult.plan.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <h4 style={{ color: '#F59E0B', marginBottom: '12px', fontSize: '18px' }}>
                  📚 Recommended Sources
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {tripResult.plan.map((item, idx) => (
                    <li key={idx}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#38BDF8', textDecoration: 'none' }}
                      >
                        {item.title || item.url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </section>
    
      {/* ---------------- FOOTER ---------------- */}
      <footer>
        © {new Date().getFullYear()} Trip Plan Maker · Powered by React, Vite &amp; FastAPI
      </footer>
    </div>
  )
}

export default App

