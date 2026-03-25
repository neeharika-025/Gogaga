import React, { useEffect, useState } from "react";
import {
  FaPlane,
  FaBriefcase,
  FaCheckCircle,
  FaListUl,
  FaRegCheckSquare,
  FaSuitcase,
} from "react-icons/fa";
import { formatMoney } from "../../../data/flights";
import "./FlightCard.css";

function FlightCard({ flight, selected, onClick, animationDirection = "ltr" }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const [animatePlane, setAnimatePlane] = useState(false);

  useEffect(() => {
    if (!selected) {
      setAnimatePlane(false);
      return;
    }

    setAnimatePlane(false);
    const frameId = window.requestAnimationFrame(() => setAnimatePlane(true));
    const timeoutId = window.setTimeout(() => setAnimatePlane(false), 900);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, [selected, animationDirection]);

  function policyIcon(label) {
    if (label.includes("Hand Baggage")) return <FaSuitcase />;
    if (label.includes("Check-In")) return <FaBriefcase />;
    if (label.includes("Refundable")) return <FaCheckCircle />;
    return <FaListUl />;
  }

  return (
    <div
      className={selected ? "flight-card selected" : "flight-card"}
      onClick={onClick}
    >
      <div className="flight-main-grid">
        <div className="airline-stack">
          <div className={`airline-logo ${flight.logoClass}`}>
            {!logoFailed && flight.logoUrl ? (
              <img
                src={flight.logoUrl}
                alt={flight.airline}
                className="airline-logo-image"
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <span className="airline-logo-fallback">{flight.shortCode}</span>
            )}
          </div>
          <div>
            <div className="airline">{flight.airline}</div>
            <div className="flight-number">{flight.flightNumber}</div>
          </div>
        </div>

        <div>
          <div className="time">{flight.departureTime}</div>
          <div className="code">{flight.from}</div>
        </div>

        <div className="flight-mid">
          <div className="duration">{flight.duration}</div>
          <div className="timeline-wrap">
            <div className="line"></div>
            <FaPlane
              className={`timeline-plane ${
                animatePlane
                  ? animationDirection === "rtl"
                    ? "plane-animate-rtl"
                    : "plane-animate-ltr"
                  : ""
              }`}
            />
          </div>
          <div className="stops">{flight.stopInfo}</div>
          <div className="nearby-note">{flight.nearbyNote}</div>
        </div>

        <div className="arrival-block">
          <div className="time">
            {flight.arrivalTime}
            {flight.arrivalDayOffset ? (
              <span className="day-offset"> +1D</span>
            ) : null}
          </div>
          <div className="code">{flight.to}</div>
        </div>
      </div>

      <div className="fare-row">
        {flight.fareOptions.map((option, index) => (
          <button
            key={`${flight.flightNumber}-${option.label}-${index}`}
            className="fare-option"
            type="button"
          >
            <FaRegCheckSquare
              className={option.selected ? "fare-check selected" : "fare-check"}
            />
            <span className="fare-price">Rs {formatMoney(option.price)}</span>
            <span className={`fare-chip ${option.tone}`}>{option.label}</span>
          </button>
        ))}
      </div>

      <div className="policy-row">
        {flight.features.map((feature, index) => (
          <div
            className="policy-item"
            key={`${flight.flightNumber}-feature-${index}`}
          >
            {policyIcon(feature)}
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FlightCard;
