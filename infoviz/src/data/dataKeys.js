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
    key: "accommodation",
    genesis: "Beherbergung",
  },
  {
    key: "hotelsInnsGuesthouses",
    genesis: "Hotels, Gasthöfe und Pensionen",
  },
  {
    key: "holidayAccommodation",
    genesis: "Ferienunterkünfte u. ähnliche Beherbergungsstätten",
  },
  {
    key: "campingSites",
    genesis: "Campingplätze",
  },
  {
    key: "otherAccommodation",
    genesis: "Sonstige Beherbergungsstätten",
  },
  {
    key: "gastronomy",
    genesis: "Gastronomie",
  },
  {
    key: "restaurantsTavernsSnackbarsCafes",
    genesis: "Restaurants, Gaststätten, Imbissstuben, Cafes u.Ä.",
  },
  {
    key: "catereing",
    genesis: "Caterer und sonstige Verpflegungsdienstleistungen",
  },
  {
    key: "beverages",
    genesis: "Ausschank von Getränken",
  },
  {
    key: "restaurantBusiness",
    genesis: "Gaststättengewerbe",
  },
  {
    key: "hospitality",
    genesis: "Gastgewerbe",
  },
];

const names = {
  germany: "Germany",
};
regions.forEach((value) => {
  names[value.key] = value.covid;
});
export { regions, germanyKey, measures, zpidKeys, sectors, names };
