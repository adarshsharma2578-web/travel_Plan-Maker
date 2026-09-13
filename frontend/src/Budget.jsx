import { useState } from "react";
import "./budget.css";

const API_BASE_URL = "http://127.0.0.1:8000";

function Budget() {
  const [form, setForm] = useState({
    total_budget: "",
    transport: "",
    hotel: "",
    food: "",
    activities: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const calculateBudget = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        total_budget: form.total_budget,
        transport: form.transport,
        hotel: form.hotel,
        food: form.food,
        activities: form.activities,
      });

      const response = await fetch(
        `${API_BASE_URL}/budget/calculate?${params}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Budget calculation failed");
      }

      setResult(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="budget-page">

      <div className="budget-heading">
        <p>BUDGET PLANNER</p>
        <h1>Plan your trip budget 💰</h1>
        <span>
          Know your expenses before you travel.
        </span>
      </div>

      <div className="budget-layout">

        <form className="budget-form" onSubmit={calculateBudget}>

          <label>Total Budget</label>
          <input
            name="total_budget"
            type="number"
            placeholder="₹ 30,000"
            value={form.total_budget}
            onChange={handleChange}
            required
          />

          <label>Transport</label>
          <input
            name="transport"
            type="number"
            placeholder="₹ 8,000"
            value={form.transport}
            onChange={handleChange}
            required
          />

          <label>Hotel</label>
          <input
            name="hotel"
            type="number"
            placeholder="₹ 7,000"
            value={form.hotel}
            onChange={handleChange}
            required
          />

          <label>Food</label>
          <input
            name="food"
            type="number"
            placeholder="₹ 5,000"
            value={form.food}
            onChange={handleChange}
            required
          />

          <label>Activities</label>
          <input
            name="activities"
            type="number"
            placeholder="₹ 4,000"
            value={form.activities}
            onChange={handleChange}
            required
          />

          <button disabled={loading}>
            {loading ? "Calculating..." : "Calculate Budget"}
          </button>

          {error && <div className="budget-error">{error}</div>}

        </form>

        <div className="budget-result">

          {!result ? (
            <>
              <div className="budget-icon">💰</div>
              <h2>Your budget summary</h2>
              <p>
                Enter your expenses to see how much of your
                budget remains.
              </p>
            </>
          ) : (
            <>
              <div className="budget-icon">🎯</div>

              <h2>
                ₹{result.remaining?.toLocaleString()}
              </h2>

              <p>Remaining Budget</p>

              <div className="budget-details">

                <div>
                  <span>Total Budget</span>
                  <strong>
                    ₹{result.budget?.toLocaleString()}
                  </strong>
                </div>

                <div>
                  <span>Estimated Cost</span>
                  <strong>
                    ₹{result.estimated_cost?.toLocaleString()}
                  </strong>
                </div>

              </div>

              <div
                className={
                  result.within_budget
                    ? "budget-status good"
                    : "budget-status bad"
                }
              >
                {result.within_budget
                  ? "✓ Your trip is within budget"
                  : "⚠ Your trip exceeds the budget"}
              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default Budget;