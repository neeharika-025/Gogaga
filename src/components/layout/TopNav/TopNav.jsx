import React from "react";
import { FaBars, FaBell, FaFilter, FaMapMarkerAlt } from "react-icons/fa";
import "./TopNav.css";

function TopNav({ onToggleSidebar, onLogoClick }) {
  return (
    <nav className="top-nav">
      <div className="nav-left">
        <button type="button" className="logo-btn" onClick={onLogoClick}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS81Qum24otF5wmcKoDFQOAxfCUPzufXafIKg&s"
            alt="Gogaga"
            className="logo-image"
          />
        </button>
        <button className="icon-btn" onClick={onToggleSidebar}>
          <FaBars />
        </button>
      </div>

      <div className="nav-right">
        <button className="icon-btn with-badge">
          <FaFilter />
        </button>
        <button className="icon-btn with-badge">
          <FaMapMarkerAlt />
          <span className="badge">2</span>
        </button>
        <button className="icon-btn with-badge">
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
