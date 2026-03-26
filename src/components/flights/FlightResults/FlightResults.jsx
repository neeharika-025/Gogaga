import React from "react";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { formatMoney } from "../../../data/flights";
import FlightCard from "../FlightCard/FlightCard";
import "./FlightResults.css";

function FlightResults({
  selectedDeparture,
  selectedReturn,
  totalPrice,
  passengers,
  searchedDestination,
  departureFlights,
  returnFlights,
  outboundLabel,
  returnLabel,
  onSelectDeparture,
  onSelectReturn,
}) {
  const hasFlights = departureFlights.length > 0 || returnFlights.length > 0;

  function FlightColumnHeader({ routeLabel }) {
    return (
      <div className="flight-col-head">
        <span>{routeLabel}</span>
        <span>Departure</span>
        <span>Duration</span>
        <span>Arrival</span>
      </div>
    );
  }

  return (
    <div className="results-wrap">
      {!hasFlights ? (
        <div className="flight-empty-state">
          No flights found for {searchedDestination || "the selected filters"}.
          Try another location.
        </div>
      ) : (
        <>
          <div className="summary-bar">
            <div className="summary-part">
              <div className="summary-title">
                <FaPlaneDeparture /> Departure
              </div>
              {selectedDeparture ? (
                <>
                  <div className="summary-line">
                    {selectedDeparture.airline}
                  </div>
                  <div className="summary-line">
                    {selectedDeparture.departureTime} -{" "}
                    {selectedDeparture.arrivalTime}
                  </div>
                  <div className="summary-price">
                    Rs {formatMoney(selectedDeparture.price)}
                  </div>
                </>
              ) : (
                <div className="summary-line">Select departure flight</div>
              )}
            </div>

            <div className="summary-part">
              <div className="summary-title">
                <FaPlaneArrival /> Return
              </div>
              {selectedReturn ? (
                <>
                  <div className="summary-line">{selectedReturn.airline}</div>
                  <div className="summary-line">
                    {selectedReturn.departureTime} -{" "}
                    {selectedReturn.arrivalTime}
                  </div>
                  <div className="summary-price">
                    Rs {formatMoney(selectedReturn.price)}
                  </div>
                </>
              ) : (
                <div className="summary-line">Select return flight</div>
              )}
            </div>

            <div className="summary-total">
              <div className="total-title">Total Price</div>
              <div className="total-value">Rs {formatMoney(totalPrice)}</div>
              <div className="total-sub">{passengers}</div>
            </div>
          </div>

          <div className="flight-columns">
            <div className="flight-col">
              <FlightColumnHeader routeLabel={outboundLabel} />
              {departureFlights.map((flight, index) => {
                const isSelected = selectedDeparture === flight;
                return (
                  <FlightCard
                    key={flight.flightNumber + "-" + index}
                    flight={flight}
                    selected={isSelected}
                    onClick={() => onSelectDeparture(flight)}
                    animationDirection="ltr"
                  />
                );
              })}
            </div>

            <div className="flight-col">
              <FlightColumnHeader routeLabel={returnLabel} />
              {returnFlights.map((flight, index) => {
                const isSelected = selectedReturn === flight;
                return (
                  <FlightCard
                    key={flight.flightNumber + "-" + index}
                    flight={flight}
                    selected={isSelected}
                    onClick={() => onSelectReturn(flight)}
                    animationDirection="rtl"
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default FlightResults;
