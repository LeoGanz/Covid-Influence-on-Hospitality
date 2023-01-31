const regions = [
  {
    key: "badenWuerttemberg",
    zpid: "Baden-Wuerttemberg",
    genesis: "Baden-Württemberg",
    covid: "Baden-Württemberg",
  },
  {
    key: "bavaria",
    zpid: "Bayern",
    genesis: "Bayern",
    covid: "Bayern",
  },
  {
    key: "berlin",
    zpid: "Berlin",
    genesis: "Berlin",
    covid: "Berlin",
  },
  {
    key: "brandenburg",
    zpid: "Brandenburg",
    genesis: "Brandenburg",
    covid: "Brandenburg",
  },
  {
    key: "bremen",
    zpid: "Bremen",
    genesis: "Bremen",
    covid: "Bremen",
  },
  {
    key: "hamburg",
    zpid: "Hamburg",
    genesis: "Hamburg",
    covid: "Hamburg",
  },
  {
    key: "hessen",
    zpid: "Hessen",
    genesis: "Hessen",
    covid: "Hessen",
  },
  {
    key: "mecklenburgVorpommern",
    zpid: "Mecklenburg-Vorpommern",
    genesis: "Mecklenburg-Vorpommern",
    covid: "Mecklenburg-Vorpommern",
  },
  {
    key: "niedersachsen",
    zpid: "Niedersachsen",
    genesis: "Niedersachsen",
    covid: "Niedersachsen",
  },
  {
    key: "nordrheinWestfalen",
    zpid: "Nordrhein-Westfalen",
    genesis: "Nordrhein-Westfalen",
    covid: "Nordrhein-Westfalen",
  },
  {
    key: "rheinlandPfalz",
    zpid: "Rheinland-Pfalz",
    genesis: "Rheinland-Pfalz",
    covid: "Rheinland-Pfalz",
  },
  {
    key: "saarland",
    zpid: "Saarland",
    genesis: "Saarland",
    covid: "Saarland",
  },
  {
    key: "sachsen",
    zpid: "Sachsen",
    genesis: "Sachsen",
    covid: "Sachsen",
  },
  {
    key: "sachsenAnhalt",
    zpid: "Sachsen-Anhalt",
    genesis: "Sachsen-Anhalt",
    covid: "Sachsen-Anhalt",
  },
  {
    key: "schleswigHolstein",
    zpid: "Schleswig-Holstein",
    genesis: "Schleswig-Holstein",
    covid: "Schleswig-Holstein",
  },
  {
    key: "thueringen",
    zpid: "Thueringen",
    genesis: "Thüringen",
    covid: "Thüringen",
  },
];

const germanyKey = "germany";

const measures = [
  {
    key: "lockdown",
    zpid: "leavehome",
  },
  {
    key: "mask",
    zpid: "msk",
  },
  {
    key: "school",
    zpid: "school",
  },
];

const zpidKeys = {
  regionId: "",
  region: "state",
  measure: "Measure ",
};

const sectors = [
  {
    key: "hospitality",
    genesis: "Gastgewerbe",
    abbreviation: "Hospitality",
  },
  {
    key: "accommodation",
    genesis: "Beherbergung",
    abbreviation: "Accommodation",
  },
  {
    key: "hotelsInnsGuesthouses",
    genesis: "Hotels, Gasthöfe und Pensionen",
    abbreviation: "Hotels",
  },
  {
    key: "holidayAccommodation",
    genesis: "Ferienunterkünfte u. ähnliche Beherbergungsstätten",
    abbreviation: "Holiday Home",
  },
  {
    key: "campingSites",
    genesis: "Campingplätze",
    abbreviation: "Camping",
  },
  {
    key: "otherAccommodation",
    genesis: "Sonstige Beherbergungsstätten",
    abbreviation: "Other Lodging",
  },
  {
    key: "gastronomy",
    genesis: "Gastronomie",
    abbreviation: "Gastronomy",
  },
  {
    key: "restaurantsTavernsSnackbarsCafes",
    genesis: "Restaurants, Gaststätten, Imbissstuben, Cafes u.Ä.",
    abbreviation: "Taverns",
  },
  {
    key: "catereing",
    genesis: "Caterer und sonstige Verpflegungsdienstleistungen",
    abbreviation: "Catering",
  },
  {
    key: "beverages",
    genesis: "Ausschank von Getränken",
    abbreviation: "Beverages",
  },
  {
    key: "restaurantBusiness",
    genesis: "Gaststättengewerbe",
    abbreviation: "Restaurants",
  }
];

const names = {
  germany: "Germany",
};
regions.forEach((value) => {
  names[value.key] = value.covid;
});
export { regions, germanyKey, measures, zpidKeys, sectors, names };
