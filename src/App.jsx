import React, { useEffect, useRef, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import FlightResults from "./components/flights/FlightResults/FlightResults";
import SearchControls from "./components/flights/SearchControls/SearchControls";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import TopNav from "./components/layout/TopNav/TopNav";
import { departureFlights, returnFlights } from "./data/flights";

function App() {
  const defaultSearchState = {
    destination: "",
    startDate: "2026-03-12",
    returnDate: "2026-03-17",
  };

  const popularDestinations = [
    "Goa, India",
    "Mumbai, India",
    "Delhi, India",
    "Bengaluru, India",
    "Chennai, India",
    "Kolkata, India",
  ];

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("Leads");
  const [holidayTab, setHolidayTab] = useState("Indian Holidays");
  const [packageTab, setPackageTab] = useState("Package with Flights");

  const [destination, setDestination] = useState(
    defaultSearchState.destination,
  );
  const [startDate, setStartDate] = useState(defaultSearchState.startDate);
  const [returnDate, setReturnDate] = useState(defaultSearchState.returnDate);
  const [passengers, setPassengers] = useState("2 Adults, 2 Children");

  const [hotelStandard, setHotelStandard] = useState("5");
  const [addLunch, setAddLunch] = useState(false);
  const [addDinner, setAddDinner] = useState(false);
  const [stopFilter, setStopFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("Any");
  const [airlineFilter, setAirlineFilter] = useState("All Airlines");
  const [appliedSearch, setAppliedSearch] = useState(defaultSearchState);
  const [allDepartureFlights, setAllDepartureFlights] = useState([]);
  const [allReturnFlights, setAllReturnFlights] = useState([]);
  const [filteredDepartureFlights, setFilteredDepartureFlights] = useState([]);
  const [filteredReturnFlights, setFilteredReturnFlights] = useState([]);

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isResultsLoading, setIsResultsLoading] = useState(false);
  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const resultsLoadTimerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setAllDepartureFlights(departureFlights);
    setAllReturnFlights(returnFlights);
    setFilteredDepartureFlights(departureFlights);
    setFilteredReturnFlights(returnFlights);
  }, []);

  useEffect(
    () => () => {
      if (resultsLoadTimerRef.current) {
        clearTimeout(resultsLoadTimerRef.current);
      }
    },
    [],
  );

  const executeSearch = (nextDestination = destination) => {
    if (resultsLoadTimerRef.current) {
      clearTimeout(resultsLoadTimerRef.current);
    }

    setSelectedDeparture(null);
    setSelectedReturn(null);
    setAppliedSearch({
      destination: nextDestination,
      startDate,
      returnDate,
    });
    setIsResultsLoading(true);

    resultsLoadTimerRef.current = setTimeout(() => {
      const destinationQuery = String(nextDestination || "").trim();
      const nextDepartureResults = applyFlightFilters(
        allDepartureFlights,
        destinationQuery,
      );
      const nextReturnResults = applyFlightFilters(
        allReturnFlights,
        destinationQuery,
      );

      setFilteredDepartureFlights(nextDepartureResults);
      setFilteredReturnFlights(nextReturnResults);
      setIsResultsLoading(false);
    }, 850);
  };

  const handleSearch = () => {
    executeSearch(destination);
  };

  const handleQuickDestinationSelect = (nextDestination) => {
    setDestination(nextDestination);
    executeSearch(nextDestination);
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
      setAppliedSearch(defaultSearchState);
      setIsResultsLoading(false);
      setSelectedDeparture(null);
      setSelectedReturn(null);
      setDestination(defaultSearchState.destination);
      setStartDate(defaultSearchState.startDate);
      setReturnDate(defaultSearchState.returnDate);
      setFilteredDepartureFlights(allDepartureFlights);
      setFilteredReturnFlights(allReturnFlights);
      return;
    }

    setActiveSection(section);
  };

  const handleLogoClick = () => {
    if (resultsLoadTimerRef.current) {
      clearTimeout(resultsLoadTimerRef.current);
    }

    setActiveSection("Home");
    setIsResultsLoading(false);
  };

  const totalPrice =
    (selectedDeparture ? selectedDeparture.price : 0) +
    (selectedReturn ? selectedReturn.price : 0);

  const airlineOptions = [
    "All Airlines",
    ...new Set([...departureFlights, ...returnFlights].map((f) => f.airline)),
  ];

  const normalizeSearchValue = (value) =>
    String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

  const destinationCodeMap = {
    goa: ["goi", "gox"],
    mumbai: ["bom"],
    delhi: ["del"],
    bengaluru: ["blr"],
    bangalore: ["blr"],
    chennai: ["maa"],
    kolkata: ["ccu"],
    hyderabad: ["hyd"],
  };

  const getSearchTokens = (value) =>
    String(value || "")
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((token) => token.length > 1);

  const expandDestinationTokens = (tokens) => {
    const expanded = new Set(tokens);

    tokens.forEach((token) => {
      const mappedCodes = destinationCodeMap[token] || [];
      mappedCodes.forEach((code) => expanded.add(code));
    });

    return [...expanded];
  };

  const matchesDestination = (flight, tokens) => {
    if (!tokens.length) return true;

    const searchableParts = [
      flight.to,
      flight.from,
      flight.destinationCity,
      flight.destinationAirport,
      flight.sourceCity,
      flight.sourceAirport,
      flight.nearbyNote,
    ].map(normalizeSearchValue);

    return tokens.some((token) =>
      searchableParts.some((part) => part.includes(token)),
    );
  };

  const isTimeMatch = (flight, selectedTime) => {
    if (selectedTime === "Any") return true;
    const hour = Number(flight.departureTime.split(":")[0]);

    if (selectedTime === "Morning") return hour >= 5 && hour < 12;
    if (selectedTime === "Afternoon") return hour >= 12 && hour < 17;
    if (selectedTime === "Evening") return hour >= 17 && hour < 22;

    return hour >= 22 || hour < 5;
  };

  const applyFlightFilters = (flights, destinationQuery) => {
    const destinationTokens = getSearchTokens(destinationQuery);
    const expandedDestinationTokens =
      expandDestinationTokens(destinationTokens);

    return flights.filter((flight) => {
      const destinationMatch = matchesDestination(
        flight,
        expandedDestinationTokens,
      );
      const stopMatch =
        stopFilter === "All" ||
        (stopFilter === "Non-stop"
          ? flight.stops === "Non-stop"
          : flight.stops.toLowerCase().includes("1 stop"));

      const airlineMatch =
        airlineFilter === "All Airlines" || flight.airline === airlineFilter;

      return (
        destinationMatch &&
        stopMatch &&
        isTimeMatch(flight, timeFilter) &&
        airlineMatch
      );
    });
  };

  useEffect(() => {
    const currentDestination = String(appliedSearch.destination || "").trim();
    setFilteredDepartureFlights(
      applyFlightFilters(allDepartureFlights, currentDestination),
    );
    setFilteredReturnFlights(
      applyFlightFilters(allReturnFlights, currentDestination),
    );
  }, [
    stopFilter,
    timeFilter,
    airlineFilter,
    allDepartureFlights,
    allReturnFlights,
    appliedSearch.destination,
  ]);

  const outboundLabel = filteredDepartureFlights.length
    ? `Outbound: ${filteredDepartureFlights[0].from} (${filteredDepartureFlights[0].sourceCity}) to ${filteredDepartureFlights[0].to} (${filteredDepartureFlights[0].destinationCity})`
    : "Outbound flights";
  const returnLabel = filteredReturnFlights.length
    ? `Return: ${filteredReturnFlights[0].from} (${filteredReturnFlights[0].sourceCity}) to ${filteredReturnFlights[0].to} (${filteredReturnFlights[0].destinationCity})`
    : "Return flights";
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
                    popularDestinations={popularDestinations}
                    onQuickDestinationSelect={handleQuickDestinationSelect}
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
                      selectedDeparture={selectedDeparture}
                      selectedReturn={selectedReturn}
                      totalPrice={totalPrice}
                      passengers={passengers}
                      searchedDestination={appliedSearch.destination}
                      departureFlights={filteredDepartureFlights}
                      returnFlights={filteredReturnFlights}
                      outboundLabel={outboundLabel}
                      returnLabel={returnLabel}
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
