import { useState } from "react";

import Explore from "./Explore";
import DestinationDetails from "./DestinationDetails";
import Weather from "./weather";
import Flights from "./Flights";
import Budget from "./Budget";
import TravelSearch from "./TravelSearch";

import "./dashboard.css";

function Dashboard({ user, onLogout }) {

  const [activePage, setActivePage] = useState("explore");
  const [selectedDestination, setSelectedDestination] = useState(null);

  const openDestination = (destination) => {
    setSelectedDestination(destination);
    setActivePage("destination");
  };

  const renderPage = () => {

    if (activePage === "explore") {
      return (
        <Explore
          onDestinationClick={openDestination}
          setActivePage={setActivePage}
        />
      );
    }

    if (activePage === "destination") {
      return (
        <DestinationDetails
          destination={selectedDestination}
          setActivePage={setActivePage}
        />
      );
    }

    if (activePage === "weather") {
      return <Weather />;
    }

    if (activePage === "flights") {
      return <Flights />;
    }

    if (activePage === "budget") {
      return <Budget />;
    }

    if (activePage === "search") {
      return <TravelSearch />;
    }

    if (activePage === "profile") {
      return (
        <div className="profile-simple">
          <div className="profile-avatar">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <h1>{user?.name || "Traveler"}</h1>

          <p>{user?.email || "No email"}</p>

          <button onClick={onLogout}>
            Logout
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="dashboard">

      <aside className="dashboard-sidebar">

        <div className="dashboard-logo">
          ✈ Travel<span>Plan</span>
        </div>

        <div className="sidebar-menu">

          <button
            className={activePage === "explore" ? "active" : ""}
            onClick={() => setActivePage("explore")}
          >
            🏠 Explore
          </button>

          <button
            className={activePage === "search" ? "active" : ""}
            onClick={() => setActivePage("search")}
          >
            🔎 Travel Search
          </button>

          <button
            className={activePage === "weather" ? "active" : ""}
            onClick={() => setActivePage("weather")}
          >
            🌤️ Weather
          </button>

          <button
            className={activePage === "flights" ? "active" : ""}
            onClick={() => setActivePage("flights")}
          >
            ✈️ Flights
          </button>

          <button
            className={activePage === "budget" ? "active" : ""}
            onClick={() => setActivePage("budget")}
          >
            💰 Budget Planner
          </button>

          <button
            className={activePage === "profile" ? "active" : ""}
            onClick={() => setActivePage("profile")}
          >
            👤 Profile
          </button>

        </div>

        <button
          className="logout-button"
          onClick={onLogout}
        >
          🚪 Logout
        </button>

      </aside>

      <main className="dashboard-main">

        <header className="dashboard-header">

          <div>
            <p>WELCOME BACK</p>
            <h2>
              Hello, {user?.name || "Traveler"} 👋
            </h2>
          </div>

          <div className="header-avatar">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

        </header>

        <div className="dashboard-content">
          {renderPage()}
        </div>

      </main>

    </div>
  );
}

export default Dashboard;