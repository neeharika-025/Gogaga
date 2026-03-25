import React, { useEffect, useRef, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import FlightResults from "./components/flights/FlightResults/FlightResults";
import SearchControls from "./components/flights/SearchControls/SearchControls";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import TopNav from "./components/layout/TopNav/TopNav";
import { departureFlights, returnFlights } from "./data/flights";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("Leads");
  const [holidayTab, setHolidayTab] = useState("Indian Holidays");
  const [packageTab, setPackageTab] = useState("Package with Flights");

  const [destination, setDestination] = useState("Goa, India");
  const [startDate, setStartDate] = useState("2026-03-12");
  const [returnDate, setReturnDate] = useState("2026-03-17");
  const [passengers, setPassengers] = useState("2 Adults, 2 Children");

  const [hotelStandard, setHotelStandard] = useState("5");
  const [addLunch, setAddLunch] = useState(false);
  const [addDinner, setAddDinner] = useState(false);
  const [stopFilter, setStopFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("Any");
  const [airlineFilter, setAirlineFilter] = useState("All Airlines");

  const [showResults, setShowResults] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isResultsLoading, setIsResultsLoading] = useState(false);
  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const resultsLoadTimerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(
    () => () => {
      if (resultsLoadTimerRef.current) {
        clearTimeout(resultsLoadTimerRef.current);
      }
    },
    [],
  );

  const handleSearch = () => {
    if (resultsLoadTimerRef.current) {
      clearTimeout(resultsLoadTimerRef.current);
    }

    setIsResultsLoading(true);
    setShowResults(false);

    resultsLoadTimerRef.current = setTimeout(() => {
      setIsResultsLoading(false);
      setShowResults(true);
    }, 850);
  };

  const handleSectionChange = (section) => {
    if (section === "Leads") {
      if (resultsLoadTimerRef.current) {
        clearTimeout(resultsLoadTimerRef.current);
      }

      setActiveSection("Leads");
      setHolidayTab("Indian Holidays");
      setPackageTab("Package with Flights");
      setStopFilter("All");
      setTimeFilter("Any");
      setAirlineFilter("All Airlines");
      setShowResults(false);
      setIsResultsLoading(false);
      setSelectedDeparture(null);
      setSelectedReturn(null);
      return;
    }

    setActiveSection(section);
  };

  const handleLogoClick = () => {
    if (resultsLoadTimerRef.current) {
      clearTimeout(resultsLoadTimerRef.current);
    }

    setActiveSection("Home");
    setShowResults(false);
    setIsResultsLoading(false);
  };

  const totalPrice =
    (selectedDeparture ? selectedDeparture.price : 0) +
    (selectedReturn ? selectedReturn.price : 0);

  const airlineOptions = [
    "All Airlines",
    ...new Set([...departureFlights, ...returnFlights].map((f) => f.airline)),
  ];

  const isTimeMatch = (flight, selectedTime) => {
    if (selectedTime === "Any") return true;
    const hour = Number(flight.departureTime.split(":")[0]);

    if (selectedTime === "Morning") return hour >= 5 && hour < 12;
    if (selectedTime === "Afternoon") return hour >= 12 && hour < 17;
    if (selectedTime === "Evening") return hour >= 17 && hour < 22;

    return hour >= 22 || hour < 5;
  };

  const applyFlightFilters = (flights) =>
    flights.filter((flight) => {
      const stopMatch =
        stopFilter === "All" ||
        (stopFilter === "Non-stop"
          ? flight.stops === "Non-stop"
          : flight.stops.toLowerCase().includes("1 stop"));

      const airlineMatch =
        airlineFilter === "All Airlines" || flight.airline === airlineFilter;

      return stopMatch && isTimeMatch(flight, timeFilter) && airlineMatch;
    });

  const filteredDepartureFlights = applyFlightFilters(departureFlights);
  const filteredReturnFlights = applyFlightFilters(returnFlights);
  const showHomeState = !isPageLoading && activeSection === "Home";
  const showLeadsFlights =
    activeSection === "Leads" &&
    holidayTab === "Indian Holidays" &&
    packageTab === "Package with Flights";

  const showNoDataState = !isPageLoading && !showLeadsFlights && !showHomeState;

  const noDataText =
    activeSection !== "Leads"
      ? `No data available for ${activeSection} section.`
      : "No data available for this holiday/package selection.";

  return (
    <div className="app-shell">
      <TopNav
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onLogoClick={handleLogoClick}
      />

      <div className="body-wrap">
        <Sidebar
          sidebarOpen={sidebarOpen}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />

        <main className="main-content">
          {showHomeState ? (
            <div className="home-page">
              <h1 className="home-text">Home</h1>
            </div>
          ) : showNoDataState ? (
            <div className="no-data-page">
              <div className="no-data-state no-data-state-full">
                <img
                  className="no-data-image"
                  src="https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150570252.jpg?semt=ais_hybrid&w=740&q=80"
                  alt="No data"
                />
                <h3 className="no-data-title">No data</h3>
                <p className="no-data-text">{noDataText}</p>
              </div>
            </div>
          ) : (
            <section className="panel">
              {isPageLoading ? (
                <SkeletonTheme
                  baseColor="#e8edf6"
                  highlightColor="#f5f8fd"
                  borderRadius={10}
                >
                  <div className="page-skeleton">
                    <div className="skeleton-tabs-row">
                      <Skeleton height={36} width={170} />
                      <Skeleton height={36} width={210} />
                    </div>

                    <Skeleton height={64} style={{ marginBottom: 12 }} />

                    <div className="skeleton-filter-row">
                      <Skeleton height={52} />
                      <Skeleton height={52} />
                      <Skeleton height={52} />
                    </div>

                    <div className="skeleton-summary-row">
                      <Skeleton height={58} />
                    </div>

                    <div className="skeleton-cards-grid">
                      <Skeleton height={168} />
                      <Skeleton height={168} />
                      <Skeleton height={168} />
                      <Skeleton height={168} />
                    </div>
                  </div>
                </SkeletonTheme>
              ) : (
                <>
                  <SearchControls
                    holidayTab={holidayTab}
                    packageTab={packageTab}
                    destination={destination}
                    startDate={startDate}
                    returnDate={returnDate}
                    passengers={passengers}
                    hotelStandard={hotelStandard}
                    addLunch={addLunch}
                    addDinner={addDinner}
                    stopFilter={stopFilter}
                    timeFilter={timeFilter}
                    airlineFilter={airlineFilter}
                    airlineOptions={airlineOptions}
                    onHolidayTabChange={setHolidayTab}
                    onPackageTabChange={setPackageTab}
                    onDestinationChange={setDestination}
                    onStartDateChange={setStartDate}
                    onReturnDateChange={setReturnDate}
                    onPassengersChange={setPassengers}
                    onHotelStandardChange={setHotelStandard}
                    onAddLunchChange={setAddLunch}
                    onAddDinnerChange={setAddDinner}
                    onStopFilterChange={setStopFilter}
                    onTimeFilterChange={setTimeFilter}
                    onAirlineFilterChange={setAirlineFilter}
                    onSearch={handleSearch}
                  />

                  {isResultsLoading ? (
                    <SkeletonTheme
                      baseColor="#e8edf6"
                      highlightColor="#f5f8fd"
                      borderRadius={10}
                    >
                      <div className="results-skeleton">
                        <Skeleton height={58} />
                        <div className="results-skeleton-cols">
                          <div className="results-skeleton-col">
                            <Skeleton height={46} />
                            <Skeleton height={158} />
                            <Skeleton height={158} />
                          </div>
                          <div className="results-skeleton-col">
                            <Skeleton height={46} />
                            <Skeleton height={158} />
                            <Skeleton height={158} />
                          </div>
                        </div>
                      </div>
                    </SkeletonTheme>
                  ) : (
                    <FlightResults
                      showResults={showResults}
                      selectedDeparture={selectedDeparture}
                      selectedReturn={selectedReturn}
                      totalPrice={totalPrice}
                      passengers={passengers}
                      departureFlights={filteredDepartureFlights}
                      returnFlights={filteredReturnFlights}
                      onSelectDeparture={setSelectedDeparture}
                      onSelectReturn={setSelectedReturn}
                    />
                  )}
                </>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
