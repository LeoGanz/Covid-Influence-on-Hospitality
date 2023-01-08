const regions = [
  {
    key: "badenWuerttemberg",
    zpid: "Baden-Wuerttemberg",
    covid: "Baden-Württemberg",
  },
  {
    key: "bavaria",
    zpid: "Bayern",
    covid: "Bayern",
  },
  {
    key: "berlin",
    zpid: "Berlin",
    covid: "Berlin",
  },
  {
    key: "brandenburg",
    zpid: "Brandenburg",
    covid: "Brandenburg",
  },
  {
    key: "bremen",
    zpid: "Bremen",
    covid: "Bremen",
  },
  {
    key: "hamburg",
    zpid: "Hamburg",
    covid: "Hamburg",
  },
  {
    key: "hessen",
    zpid: "Hessen",
    covid: "Hessen",
  },
  {
    key: "mecklenburgVorpommern",
    zpid: "Mecklenburg-Vorpommern",
    covid: "Mecklenburg-Vorpommern",
  },
  {
    key: "niedersachsen",
    zpid: "Niedersachsen",
    covid: "Niedersachsen",
  },
  {
    key: "nordrheinWestfalen",
    zpid: "Nordrhein-Westfalen",
    covid: "Nordrhein-Westfalen",
  },
  {
    key: "rheinlandPfalz",
    zpid: "Rheinland-Pfalz",
    covid: "Rheinland-Pfalz",
  },
  {
    key: "saarland",
    zpid: "Saarland",
    covid: "Saarland",
  },
  {
    key: "sachsen",
    zpid: "Sachsen",
    covid: "Sachsen",
  },
  {
    key: "sachsenAnhalt",
    zpid: "Sachsen-Anhalt",
    covid: "Sachsen-Anhalt",
  },
  {
    key: "schleswigHolstein",
    zpid: "Schleswig-Holstein",
    covid: "Schleswig-Holstein",
  },
  {
    key: "thueringen",
    zpid: "Thueringen",
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

export { regions, germanyKey, measures, zpidKeys };
