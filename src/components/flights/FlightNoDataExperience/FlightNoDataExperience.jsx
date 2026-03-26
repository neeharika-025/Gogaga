import React from "react";
import { FaPlane } from "react-icons/fa";
import "./FlightNoDataExperience.css";

function FlightNoDataExperience({ onGetStarted }) {
  return (
    <section
      className="sky-stage"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(187,224,255,0.5) 0%, rgba(241,248,255,0.78) 48%, rgba(255,255,255,0.9) 100%), url('https://images.pexels.com/photos/2114014/pexels-photo-2114014.jpeg?cs=srgb&dl=pexels-magda-ehlers-pexels-2114014.jpg&fm=jpg')",
      }}
    >
      <div className="sky-overlay" />
      <div className="welcome-block static-block">
        <h2 className="welcome-title">Welcome Aboard <FaPlane className="btn-planes" /></h2>
        <p className="welcome-subtitle">Your dashboard is ready for takeoff</p>

        <button
          type="button"
          className="get-started-btn"
          onClick={onGetStarted}
        >
          <FaPlane className="btn-plane" /> Get Started
        </button>
      </div>
    </section>
  );
}

export default FlightNoDataExperience;
