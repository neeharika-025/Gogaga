import React from "react";
import {
  FaBars,
  FaBell,
  FaFilter,
  FaMapMarkerAlt,
  FaThLarge,
} from "react-icons/fa";
import "./TopNav.css";

function TopNav({ onToggleSidebar, onLogoClick }) {
  return (
    <nav className="top-nav">
      <div className="nav-left">
        <button type="button" className="logo-btn" onClick={onLogoClick}>
          <img
            src="https://media.licdn.com/dms/image/v2/C4E16AQEe8hYCeM0niA/profile-displaybackgroundimage-shrink_200_800/profile-displaybackgroundimage-shrink_200_800/0/1624758591546?e=2147483647&v=beta&t=wSksJfY0EJeUY4Dbm43Zl2GT0sKQjqY-lXmaI9om9W8"
            alt="Gogaga"
            className="logo-image"
          />
        </button>
        <button className="icon-btn" onClick={onToggleSidebar}>
          <FaBars />
        </button>
      </div>

      <div className="nav-right">
        <button className="icon-btn with-badge widget-btn" aria-label="Widgets">
          <FaThLarge />
          <span className="badge">52</span>
        </button>
        <button className="icon-btn with-badge filter-btn" aria-label="Filters">
          <FaFilter />
        </button>
        <button
          className="icon-btn with-badge location-btn"
          aria-label="Locations"
        >
          <FaMapMarkerAlt />
          <span className="badge">1</span>
        </button>
        <button
          className="icon-btn with-badge alert-btn"
          aria-label="Notifications"
        >
          <FaBell />
          <span className="badge">15</span>
        </button>

        <div className="profile-box">
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="profile"
            className="profile-image"
          />
          <span>Girish Kumar</span>
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
