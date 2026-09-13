import "./profile.css";

function Profile({ user, onLogout }) {
  return (
    <div className="profile-page">

      <div className="profile-title">
        <p>ACCOUNT</p>
        <h1>My Profile</h1>
      </div>

      <div className="profile-card">

        <div className="large-avatar">
          {(user?.name || "T").charAt(0).toUpperCase()}
        </div>

        <h2>{user?.name || "Traveler"}</h2>

        <p className="profile-email">
          {user?.email || "No email"}
        </p>

        <div className="profile-stats">

          <div>
            <strong>0</strong>
            <span>Trips</span>
          </div>

          <div>
            <strong>0</strong>
            <span>Saved Places</span>
          </div>

          <div>
            <strong>0</strong>
            <span>Plans</span>
          </div>

        </div>

        <button
          className="profile-logout"
          onClick={onLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Profile;