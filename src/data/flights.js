const rawDepartureFlights = [
  {
    airline: "Air India Express",
    flightNumber: "IX 2879 TC",
    departureTime: "12:05",
    arrivalTime: "13:30",
    from: "HYD",
    to: "GOI",
    duration: "1h 25m",
    stops: "Non-stop",
    price: 13300,
    fareType: "Public",
  },
  {
    airline: "Air India",
    flightNumber: "AI 2897 TC",
    departureTime: "11:30",
    arrivalTime: "18:55",
    from: "HYD",
    to: "GOX",
    duration: "7h 25m",
    stops: "1 Stop via BLR",
    price: 105300,
    fareType: "SME",
  },
  {
    airline: "Indigo",
    flightNumber: "6E 424 SM",
    departureTime: "20:50",
    arrivalTime: "06:20",
    from: "HYD",
    to: "GOI",
    duration: "9h 30m",
    stops: "1 Stop via PNQ",
    price: 13300,
    fareType: "Public",
  },
  {
    airline: "Star Air",
    flightNumber: "S5 212 TQ2",
    departureTime: "09:50",
    arrivalTime: "17:55",
    from: "HYD",
    to: "GOX",
    duration: "8h 05m",
    stops: "1 Stop via HYD",
    price: 13300,
    fareType: "SME",
  },
  {
    airline: "Vistara",
    flightNumber: "UK 908 ST",
    departureTime: "14:20",
    arrivalTime: "15:45",
    from: "HYD",
    to: "GOI",
    duration: "1h 25m",
    stops: "Non-stop",
    price: 18900,
    fareType: "Public",
  },
  {
    airline: "Qatar Airways",
    flightNumber: "QR 512 AQ",
    departureTime: "18:40",
    arrivalTime: "22:10",
    from: "HYD",
    to: "GOI",
    duration: "3h 30m",
    stops: "Non-stop",
    price: 35600,
    fareType: "Public",
  },
  {
    airline: "Air India Express",
    flightNumber: "IX 2881 TC",
    departureTime: "15:35",
    arrivalTime: "17:00",
    from: "HYD",
    to: "GOI",
    duration: "1h 25m",
    stops: "Non-stop",
    price: 12800,
    fareType: "Public",
  },
  {
    airline: "Indigo",
    flightNumber: "6E 426 SM",
    departureTime: "07:15",
    arrivalTime: "08:40",
    from: "HYD",
    to: "GOI",
    duration: "1h 25m",
    stops: "Non-stop",
    price: 14200,
    fareType: "Public",
  },
  {
    airline: "Air India",
    flightNumber: "AI 2899 TC",
    departureTime: "22:30",
    arrivalTime: "05:55",
    from: "HYD",
    to: "GOX",
    duration: "7h 25m",
    stops: "1 Stop via BLR",
    price: 108500,
    fareType: "SME",
  },
];

const rawReturnFlights = [
  {
    airline: "Air India Express",
    flightNumber: "IX 2879 TC",
    departureTime: "12:05",
    arrivalTime: "13:30",
    from: "GOI",
    to: "HYD",
    duration: "1h 25m",
    stops: "Non-stop",
    price: 13300,
    fareType: "Public",
  },
  {
    airline: "Air India",
    flightNumber: "AI 2897 TC",
    departureTime: "13:15",
    arrivalTime: "06:15",
    from: "GOX",
    to: "HYD",
    duration: "16h 30m",
    stops: "1 Stop via MAA",
    price: 105300,
    fareType: "SME",
  },
  {
    airline: "Indigo",
    flightNumber: "6E 424 SM",
    departureTime: "20:50",
    arrivalTime: "06:20",
    from: "GOI",
    to: "HYD",
    duration: "9h 30m",
    stops: "1 Stop via PNQ",
    price: 13300,
    fareType: "Public",
  },
  {
    airline: "Star Air",
    flightNumber: "S5 212 TQ2",
    departureTime: "09:50",
    arrivalTime: "17:55",
    from: "GOX",
    to: "HYD",
    duration: "8h 05m",
    stops: "1 Stop via HYD",
    price: 13300,
    fareType: "SME",
  },
  {
    airline: "Vistara",
    flightNumber: "UK 908 ST",
    departureTime: "16:50",
    arrivalTime: "18:15",
    from: "GOI",
    to: "HYD",
    duration: "1h 25m",
    stops: "Non-stop",
    price: 18900,
    fareType: "Public",
  },
  {
    airline: "Qatar Airways",
    flightNumber: "QR 512 AQ",
    departureTime: "23:45",
    arrivalTime: "03:15",
    from: "GOI",
    to: "HYD",
    duration: "3h 30m",
    stops: "Non-stop",
    price: 35600,
    fareType: "Public",
  },
  {
    airline: "Air India Express",
    flightNumber: "IX 2881 TC",
    departureTime: "17:20",
    arrivalTime: "18:45",
    from: "GOI",
    to: "HYD",
    duration: "1h 25m",
    stops: "Non-stop",
    price: 12800,
    fareType: "Public",
  },
  {
    airline: "Indigo",
    flightNumber: "6E 426 SM",
    departureTime: "10:30",
    arrivalTime: "11:55",
    from: "GOI",
    to: "HYD",
    duration: "1h 25m",
    stops: "Non-stop",
    price: 14200,
    fareType: "Public",
  },
  {
    airline: "Air India",
    flightNumber: "AI 2899 TC",
    departureTime: "08:20",
    arrivalTime: "19:50",
    from: "GOX",
    to: "HYD",
    duration: "11h 30m",
    stops: "1 Stop via BLR",
    price: 108500,
    fareType: "SME",
  },
];

const airlineThemes = {
  "Air India Express": {
    shortCode: "AIX",
    logoClass: "aix",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5k6b_6aYg6rc2ikLX_76gijGx5HQO1_nf0g&s",
  },
  "Air India": {
    shortCode: "AI",
    logoClass: "ai",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwy-zEp6nsnbnA9ypdUN6ieyBVc9yQsg9euQ&s",
  },
  Indigo: {
    shortCode: "6E",
    logoClass: "indigo",
    logoUrl:
      "https://i.pinimg.com/736x/2d/06/2c/2d062c935dde7754fa80bf011a9dbdc7.jpg",
  },
  "Star Air": {
    shortCode: "S5",
    logoClass: "star",
    logoUrl:
      "https://media.licdn.com/dms/image/v2/D560BAQEUM3byn6W-Ag/company-logo_200_200/company-logo_200_200/0/1711456284066?e=2147483647&v=beta&t=fD-XxHsoRsPZ8wRDdoqoRq9siTo20x9P_lSIwYC7qZY",
  },
  Vistara: {
    shortCode: "UK",
    logoClass: "default",
    logoUrl: "https://download.logo.wine/logo/Vistara/Vistara-Logo.wine.png",
  },
  "Qatar Airways": {
    shortCode: "QR",
    logoClass: "default",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-2gy3RQl6-FOuZOIn-HbnX5bSRRwWxlONFQ&s",
  },
};

function toMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function getArrivalDayOffset(departureTime, arrivalTime) {
  return toMinutes(arrivalTime) <= toMinutes(departureTime) ? 1 : 0;
}

function buildFareOptions(flight) {
  const basePrice = flight.price;
  const secondLabel = flight.fareType === "SME" ? "Public" : "Flexi";

  return [
    {
      label: flight.fareType,
      price: basePrice,
      selected: true,
      tone: flight.fareType === "SME" ? "amber" : "sky",
    },
    {
      label: secondLabel,
      price: basePrice + 1800,
      selected: false,
      tone: secondLabel === "Public" ? "sky" : "violet",
    },
  ];
}

function enrichFlight(flight) {
  const theme = airlineThemes[flight.airline] || {
    shortCode: flight.airline.slice(0, 2).toUpperCase(),
    logoClass: "default",
    logoUrl: "",
  };

  return {
    ...flight,
    ...theme,
    arrivalDayOffset: getArrivalDayOffset(
      flight.departureTime,
      flight.arrivalTime,
    ),
    stopInfo: flight.stops,
    nearbyNote: "Nearby Airport",
    fareOptions: buildFareOptions(flight),
    features: [
      "Hand Baggage - 7 Kg",
      "Check-In Baggage",
      "Refundable",
      "Rules",
    ],
  };
}

export const departureFlights = rawDepartureFlights.map(enrichFlight);
export const returnFlights = rawReturnFlights.map(enrichFlight);

export function formatMoney(value) {
  return value.toLocaleString("en-IN");
}
