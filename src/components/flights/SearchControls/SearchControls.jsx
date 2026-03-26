import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FaCalendarAlt,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaExchangeAlt,
  FaMinus,
  FaPlus,
  FaSearch,
  FaStar,
} from "react-icons/fa";
import "./SearchControls.css";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"];

function toIsoDate(year, month, day) {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

function parseIsoDate(dateStr) {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function addDays(dateStr, days) {
  const date = parseIsoDate(dateStr);
  if (!date) return "";
  date.setDate(date.getDate() + days);
  return toIsoDate(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatShortDate(dateStr) {
  const date = parseIsoDate(dateStr);
  if (!date) return "";
  const month = MONTH_NAMES[date.getMonth()].slice(0, 3);
  return `${date.getDate()} ${month}`;
}

function getDisplayRangeLabel(startDate, returnDate) {
  if (!startDate && !returnDate) return "Add dates";
  if (startDate && !returnDate)
    return `${formatShortDate(startDate)} - Add return`;
  return `${formatShortDate(startDate)} - ${formatShortDate(returnDate)}`;
}

function getMonthMatrix(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];

  for (let i = 0; i < firstDay; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(day);

  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function parsePassengersLabel(label) {
  const adultsMatch = label.match(/(\d+)\s*Adult/i);
  const childrenMatch = label.match(/(\d+)\s*Child/i);
  const infantsMatch = label.match(/(\d+)\s*Infant/i);
  const petsMatch = label.match(/(\d+)\s*Pet/i);

  return {
    adults: adultsMatch ? Number(adultsMatch[1]) : 2,
    children: childrenMatch ? Number(childrenMatch[1]) : 0,
    infants: infantsMatch ? Number(infantsMatch[1]) : 0,
    pets: petsMatch ? Number(petsMatch[1]) : 0,
  };
}

function formatPassengersLabel({ adults, children, infants, pets }) {
  const parts = [];

  parts.push(`${adults} ${adults === 1 ? "Adult" : "Adults"}`);

  if (children > 0) {
    parts.push(`${children} ${children === 1 ? "Child" : "Children"}`);
  }

  if (infants > 0) {
    parts.push(`${infants} ${infants === 1 ? "Infant" : "Infants"}`);
  }

  if (pets > 0) {
    parts.push(`${pets} ${pets === 1 ? "Pet" : "Pets"}`);
  }

  return parts.join(", ");
}

function SearchControls({
  holidayTab,
  packageTab,
  destination,
  startDate,
  returnDate,
  passengers,
  hotelStandard,
  addLunch,
  addDinner,
  stopFilter,
  timeFilter,
  airlineFilter,
  airlineOptions,
  onHolidayTabChange,
  onPackageTabChange,
  onDestinationChange,
  onStartDateChange,
  onReturnDateChange,
  onPassengersChange,
  onHotelStandardChange,
  onAddLunchChange,
  onAddDinnerChange,
  onStopFilterChange,
  onTimeFilterChange,
  onAirlineFilterChange,
  popularDestinations,
  onQuickDestinationSelect,
  onSearch,
}) {
  const [isPassengerOpen, setIsPassengerOpen] = useState(false);
  const [isDatePanelOpen, setIsDatePanelOpen] = useState(false);
  const [dateMode, setDateMode] = useState("dates");
  const [monthOffset, setMonthOffset] = useState(0);
  const [flexDuration, setFlexDuration] = useState(7);
  const [activeFilterMenu, setActiveFilterMenu] = useState(null);
  const [passengerCounts, setPassengerCounts] = useState(() =>
    parsePassengersLabel(passengers),
  );
  const passengerBoxRef = useRef(null);
  const datePanelRef = useRef(null);
  const filterRowRef = useRef(null);

  const passengerLabel = useMemo(
    () => formatPassengersLabel(passengerCounts),
    [passengerCounts],
  );
  const todayIso = useMemo(() => {
    const now = new Date();
    return toIsoDate(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  useEffect(() => {
    if (!startDate || startDate < todayIso) {
      onStartDateChange(todayIso);

      if (!returnDate || returnDate <= todayIso) {
        onReturnDateChange(addDays(todayIso, 5));
      }

      return;
    }

    if (returnDate && returnDate < startDate) {
      onReturnDateChange(addDays(startDate, 5));
    }
  }, [startDate, returnDate, todayIso, onStartDateChange, onReturnDateChange]);

  useEffect(() => {
    if (passengers !== passengerLabel) {
      onPassengersChange(passengerLabel);
    }
  }, [passengerLabel, passengers, onPassengersChange]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        passengerBoxRef.current &&
        !passengerBoxRef.current.contains(event.target)
      ) {
        setIsPassengerOpen(false);
      }

      if (
        datePanelRef.current &&
        !datePanelRef.current.contains(event.target)
      ) {
        setIsDatePanelOpen(false);
      }

      if (
        filterRowRef.current &&
        !filterRowRef.current.contains(event.target)
      ) {
        setActiveFilterMenu(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const updatePassengerCount = (type, delta) => {
    setPassengerCounts((prev) => {
      const minValue = type === "adults" ? 1 : 0;
      const nextValue = Math.max(minValue, Math.min(9, prev[type] + delta));

      return {
        ...prev,
        [type]: nextValue,
      };
    });
  };

  const toggleFilterMenu = (menuName) => {
    setActiveFilterMenu((prev) => (prev === menuName ? null : menuName));
  };

  const handleDateClick = (isoDate) => {
    if (isoDate < todayIso) {
      return;
    }

    if (!startDate || (startDate && returnDate)) {
      onStartDateChange(isoDate);
      onReturnDateChange("");
      return;
    }

    if (isoDate >= startDate) {
      onReturnDateChange(isoDate);
      return;
    }

    onStartDateChange(isoDate);
  };

  const applyMonthPreset = (year, month) => {
    const firstDate = toIsoDate(year, month, 1);
    const lastDate = toIsoDate(
      year,
      month,
      new Date(year, month + 1, 0).getDate(),
    );
    onStartDateChange(firstDate);
    onReturnDateChange(lastDate);
    setIsDatePanelOpen(false);
  };

  const applyFlexiblePreset = (year, month) => {
    const firstDate = toIsoDate(year, month, 1);
    onStartDateChange(firstDate);
    onReturnDateChange(addDays(firstDate, flexDuration - 1));
    setIsDatePanelOpen(false);
  };

  const renderMonthCalendar = (offset) => {
    const monthDate = new Date();
    monthDate.setMonth(monthDate.getMonth() + offset);
    const month = monthDate.getMonth();
    const year = monthDate.getFullYear();
    const cells = getMonthMatrix(year, month);

    return (
      <div className="calendar-month" key={`${month}-${year}`}>
        <div className="calendar-month-title">{`${MONTH_NAMES[month]} ${year}`}</div>
        <div className="calendar-week-row">
          {WEEK_DAYS.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="calendar-grid">
          {cells.map((day, index) => {
            if (!day) {
              return (
                <span
                  key={`${month}-${year}-blank-${index}`}
                  className="calendar-empty"
                />
              );
            }

            const isoValue = toIsoDate(year, month, day);
            const isPastDate = isoValue < todayIso;

            const isSelected =
              isoValue === startDate || isoValue === returnDate;
            const isBetween =
              startDate &&
              returnDate &&
              isoValue > startDate &&
              isoValue < returnDate;

            return (
              <button
                key={isoValue}
                type="button"
                className={`calendar-day ${
                  isPastDate
                    ? "disabled-past-day"
                    : isSelected
                      ? "selected-day"
                      : isBetween
                        ? "between-day"
                        : ""
                }`}
                disabled={isPastDate}
                onClick={() => handleDateClick(isoValue)}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const selectFilterOption = (menuName, value) => {
    if (menuName === "stops") {
      onStopFilterChange(value);
    }

    if (menuName === "time") {
      onTimeFilterChange(value);
    }

    if (menuName === "airline") {
      onAirlineFilterChange(value);
    }

    setActiveFilterMenu(null);
  };

  return (
    <>
      <div className="tabs-row">
        <button
          className={
            holidayTab === "Indian Holidays" ? "tab-btn active-tab" : "tab-btn"
          }
          onClick={() => onHolidayTabChange("Indian Holidays")}
        >
          Indian Holidays
        </button>
        <button
          className={
            holidayTab === "International Holidays"
              ? "tab-btn active-tab"
              : "tab-btn"
          }
          onClick={() => onHolidayTabChange("International Holidays")}
        >
          International Holidays
        </button>
      </div>

      <div className="package-row">
        <button
          className={
            packageTab === "Package with Flights"
              ? "package-btn active-package"
              : "package-btn"
          }
          onClick={() => onPackageTabChange("Package with Flights")}
        >
          Package with Flights
        </button>
        <button
          className={
            packageTab === "Package without Flights"
              ? "package-btn active-package"
              : "package-btn"
          }
          onClick={() => onPackageTabChange("Package without Flights")}
        >
          Package without Flights
        </button>
      </div>

      <div className="search-grid">
        <div className="field-box large">
          <label>Destination</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => onDestinationChange(e.target.value)}
            placeholder="City"
          />
        </div>

        <div
          className={`field-box date-range-field ${
            isDatePanelOpen ? "date-range-open" : ""
          }`}
          ref={datePanelRef}
        >
          <label>When</label>
          <button
            type="button"
            className="date-range-trigger"
            onClick={() => {
              setIsDatePanelOpen((prev) => !prev);
              setIsPassengerOpen(false);
              setActiveFilterMenu(null);
            }}
          >
            <span>{getDisplayRangeLabel(startDate, returnDate)}</span>
            <FaChevronDown
              className={`passenger-arrow ${
                isDatePanelOpen ? "passenger-arrow-open" : ""
              }`}
            />
          </button>

          <div
            className={`date-panel ${isDatePanelOpen ? "date-panel-open" : ""}`}
          >
            <div className="date-mode-tabs">
              <button
                type="button"
                className={
                  dateMode === "dates"
                    ? "date-mode-tab active"
                    : "date-mode-tab"
                }
                onClick={() => setDateMode("dates")}
              >
                Dates
              </button>
              <button
                type="button"
                className={
                  dateMode === "months"
                    ? "date-mode-tab active"
                    : "date-mode-tab"
                }
                onClick={() => setDateMode("months")}
              >
                Months
              </button>
              <button
                type="button"
                className={
                  dateMode === "flexible"
                    ? "date-mode-tab active"
                    : "date-mode-tab"
                }
                onClick={() => setDateMode("flexible")}
              >
                Flexible
              </button>
            </div>

            {dateMode === "dates" && (
              <div className="date-content dates-view">
                <div className="calendar-nav-row">
                  <button
                    type="button"
                    className="nav-btn"
                    disabled={monthOffset <= 0}
                    onClick={() =>
                      setMonthOffset((prev) => Math.max(prev - 1, 0))
                    }
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    type="button"
                    className="nav-btn"
                    onClick={() => setMonthOffset((prev) => prev + 1)}
                  >
                    <FaChevronRight />
                  </button>
                </div>

                <div className="calendar-wrap">
                  {renderMonthCalendar(monthOffset)}
                  {renderMonthCalendar(monthOffset + 1)}
                </div>
              </div>
            )}

            {dateMode === "months" && (
              <div className="date-content month-preset-view">
                <h4 className="date-panel-heading">Pick a full month</h4>
                <div className="month-card-row">
                  {Array.from({ length: 6 }).map((_, index) => {
                    const date = new Date();
                    date.setMonth(date.getMonth() + index);
                    const month = date.getMonth();
                    const year = date.getFullYear();
                    const label = MONTH_NAMES[month];

                    return (
                      <button
                        type="button"
                        key={`${month}-${year}`}
                        className="month-card"
                        onClick={() => applyMonthPreset(year, month)}
                      >
                        <FaCalendarAlt className="month-card-icon" />
                        <span className="month-card-label">{label}</span>
                        <span className="month-card-year">{year}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {dateMode === "flexible" && (
              <div className="date-content flexible-view">
                <h4 className="date-panel-heading">
                  How long would you like to stay?
                </h4>
                <div className="duration-pills">
                  {[3, 7, 14, 30].map((duration) => (
                    <button
                      key={duration}
                      type="button"
                      className={`duration-pill ${
                        flexDuration === duration ? "duration-pill-active" : ""
                      }`}
                      onClick={() => setFlexDuration(duration)}
                    >
                      {duration} days
                    </button>
                  ))}
                </div>

                <div className="month-card-row">
                  {Array.from({ length: 6 }).map((_, index) => {
                    const date = new Date();
                    date.setMonth(date.getMonth() + index);
                    const month = date.getMonth();
                    const year = date.getFullYear();

                    return (
                      <button
                        type="button"
                        key={`flex-${month}-${year}`}
                        className="month-card"
                        onClick={() => applyFlexiblePreset(year, month)}
                      >
                        <FaCalendarAlt className="month-card-icon" />
                        <span className="month-card-label">
                          {MONTH_NAMES[month]}
                        </span>
                        <span className="month-card-year">{year}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className={`field-box passenger-field ${
            isPassengerOpen ? "passenger-open" : ""
          }`}
          ref={passengerBoxRef}
        >
          <label>No. of Passengers</label>
          <button
            type="button"
            className="passenger-trigger"
            onClick={() => setIsPassengerOpen((prev) => !prev)}
          >
            <span className="passenger-trigger-text">{passengerLabel}</span>
            <FaChevronDown
              className={`passenger-arrow ${
                isPassengerOpen ? "passenger-arrow-open" : ""
              }`}
            />
          </button>

          <div
            className={`passenger-panel ${
              isPassengerOpen ? "passenger-panel-open" : ""
            }`}
          >
            <div className="passenger-row">
              <div className="passenger-meta">
                <span className="passenger-type">Adults</span>
                <span className="passenger-subtext">Ages 13 or above</span>
              </div>
              <div className="passenger-stepper">
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => updatePassengerCount("adults", -1)}
                  disabled={passengerCounts.adults <= 1}
                >
                  <FaMinus />
                </button>
                <span className="step-value">{passengerCounts.adults}</span>
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => updatePassengerCount("adults", 1)}
                  disabled={passengerCounts.adults >= 9}
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            <div className="passenger-row">
              <div className="passenger-meta">
                <span className="passenger-type">Children</span>
                <span className="passenger-subtext">Ages 2-12</span>
              </div>
              <div className="passenger-stepper">
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => updatePassengerCount("children", -1)}
                  disabled={passengerCounts.children <= 0}
                >
                  <FaMinus />
                </button>
                <span className="step-value">{passengerCounts.children}</span>
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => updatePassengerCount("children", 1)}
                  disabled={passengerCounts.children >= 9}
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            <div className="passenger-row">
              <div className="passenger-meta">
                <span className="passenger-type">Infants</span>
                <span className="passenger-subtext">Under 2</span>
              </div>
              <div className="passenger-stepper">
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => updatePassengerCount("infants", -1)}
                  disabled={passengerCounts.infants <= 0}
                >
                  <FaMinus />
                </button>
                <span className="step-value">{passengerCounts.infants}</span>
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => updatePassengerCount("infants", 1)}
                  disabled={passengerCounts.infants >= 9}
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            <div className="passenger-row last-passenger-row">
              <div className="passenger-meta">
                <span className="passenger-type">Pets</span>
                <span className="passenger-subtext service-animal-note">
                  Bringing a service animal?
                </span>
              </div>
              <div className="passenger-stepper">
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => updatePassengerCount("pets", -1)}
                  disabled={passengerCounts.pets <= 0}
                >
                  <FaMinus />
                </button>
                <span className="step-value">{passengerCounts.pets}</span>
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => updatePassengerCount("pets", 1)}
                  disabled={passengerCounts.pets >= 9}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
        </div>

        <button className="search-btn" onClick={onSearch}>
          <FaSearch />
        </button>
      </div>

      <div className="quick-destination-row">
        <span className="quick-destination-label">Popular Locations</span>
        <div className="quick-destination-list">
          {popularDestinations.map((city) => (
            <button
              key={city}
              type="button"
              className={
                destination === city
                  ? "quick-destination-chip active-quick-destination"
                  : "quick-destination-chip"
              }
              onClick={() => onQuickDestinationSelect(city)}
            >
              {city.replace(", India", "")}
            </button>
          ))}
        </div>
      </div>

      <div className="filters-row">
        <div className="hotel-filter">
          <span className="filter-label">Hotel Standard</span>
          <button
            className={hotelStandard === "3" ? "star-btn selected" : "star-btn"}
            onClick={() => onHotelStandardChange("3")}
          >
            3<FaStar className="tiny-star" />
          </button>
          <button
            className={hotelStandard === "4" ? "star-btn selected" : "star-btn"}
            onClick={() => onHotelStandardChange("4")}
          >
            4<FaStar className="tiny-star" />
          </button>
          <button
            className={hotelStandard === "5" ? "star-btn selected" : "star-btn"}
            onClick={() => onHotelStandardChange("5")}
          >
            5<FaStar className="tiny-star" />
          </button>
        </div>

        <label className="check-wrap">
          <input
            type="checkbox"
            checked={addLunch}
            onChange={() => onAddLunchChange(!addLunch)}
          />
          Add Lunch
        </label>

        <label className="check-wrap">
          <input
            type="checkbox"
            checked={addDinner}
            onChange={() => onAddDinnerChange(!addDinner)}
          />
          Add Dinner
        </label>
      </div>

      <div className="flight-filters-row" ref={filterRowRef}>
        <div className="mini-filter custom-mini-filter">
          <span className="mini-filter-label">Stops</span>
          <button
            type="button"
            className="mini-filter-trigger"
            onClick={() => toggleFilterMenu("stops")}
          >
            <span>{stopFilter}</span>
            <FaChevronDown
              className={`mini-filter-arrow ${
                activeFilterMenu === "stops" ? "mini-filter-arrow-open" : ""
              }`}
            />
          </button>

          <div
            className={`mini-filter-menu ${
              activeFilterMenu === "stops" ? "mini-filter-menu-open" : ""
            }`}
          >
            {["All", "Non-stop", "1 Stop"].map((option) => (
              <button
                key={option}
                type="button"
                className={`mini-filter-option ${
                  stopFilter === option ? "mini-filter-option-selected" : ""
                }`}
                onClick={() => selectFilterOption("stops", option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mini-filter custom-mini-filter">
          <span className="mini-filter-label">Departure Slot</span>
          <button
            type="button"
            className="mini-filter-trigger"
            onClick={() => toggleFilterMenu("time")}
          >
            <span>{timeFilter}</span>
            <FaChevronDown
              className={`mini-filter-arrow ${
                activeFilterMenu === "time" ? "mini-filter-arrow-open" : ""
              }`}
            />
          </button>

          <div
            className={`mini-filter-menu ${
              activeFilterMenu === "time" ? "mini-filter-menu-open" : ""
            }`}
          >
            {["Any", "Morning", "Afternoon", "Evening", "Night"].map(
              (option) => (
                <button
                  key={option}
                  type="button"
                  className={`mini-filter-option ${
                    timeFilter === option ? "mini-filter-option-selected" : ""
                  }`}
                  onClick={() => selectFilterOption("time", option)}
                >
                  {option}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="mini-filter custom-mini-filter">
          <span className="mini-filter-label">Airline</span>
          <button
            type="button"
            className="mini-filter-trigger"
            onClick={() => toggleFilterMenu("airline")}
          >
            <span>{airlineFilter}</span>
            <FaChevronDown
              className={`mini-filter-arrow ${
                activeFilterMenu === "airline" ? "mini-filter-arrow-open" : ""
              }`}
            />
          </button>

          <div
            className={`mini-filter-menu ${
              activeFilterMenu === "airline" ? "mini-filter-menu-open" : ""
            }`}
          >
            {airlineOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={`mini-filter-option ${
                  airlineFilter === option ? "mini-filter-option-selected" : ""
                }`}
                onClick={() => selectFilterOption("airline", option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="route-card">
        <div className="route-block">
          <span className="route-label">From</span>
          <div className="route-value">
            Rajiv Gandhi International Airport (HYD), Hyderabad, India
          </div>
        </div>

        <div className="route-block">
          <span className="route-label">Departure Date</span>
          <div className="route-value">{startDate || "Select date"}</div>
        </div>

        <div className="route-swap">
          <FaExchangeAlt />
        </div>

        <div className="route-block">
          <span className="route-label">To</span>
          <div className="route-value">{destination || "Destination"}</div>
        </div>

        <div className="route-block">
          <span className="route-label">Return Date</span>
          <div className="route-value">{returnDate || "Select date"}</div>
        </div>
      </div>
    </>
  );
}

export default SearchControls;
