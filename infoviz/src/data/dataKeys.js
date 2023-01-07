const regions = [{
    key: "badenWuerttemberg",
    zpid: "Baden-Wuerttemberg",
    genesis: "Baden-Württemberg"
}, {
    key: "bavaria",
    zpid: "Bayern",
    genesis: "Bayern"
}, {
    key: "berlin",
    zpid: "Berlin",
    genesis: "Berlin"
}, {
    key: "brandenburg",
    zpid: "Brandenburg",
    genesis: "Brandenburg"
}, {
    key: "bremen",
    zpid: "Bremen",
    genesis: "Bremen"
}, {
    key: "hamburg",
    zpid: "Hamburg",
    genesis: "Hamburg"
}, {
    key: "hessen",
    zpid: "Hessen",
    genesis: "Hessen"
}, {
    key: "mecklenburgVorpommern",
    zpid: "Mecklenburg-Vorpommern",
    genesis: "Mecklenburg-Vorpommern"
}, {
    key: "niedersachsen",
    zpid: "Niedersachsen",
    genesis: "Niedersachsen"
}, {
    key: "nordrheinWestfalen",
    zpid: "Nordrhein-Westfalen",
    genesis: "Nordrhein-Westfalen"
}, {
    key: "rheinlandPfalz",
    zpid: "Rheinland-Pfalz",
    genesis: "Rheinland-Pfalz"
}, {
    key: "saarland",
    zpid: "Saarland",
    genesis: "Saarland"
}, {
    key: "sachsen",
    zpid: "Sachsen",
    genesis: "Sachsen"
}, {
    key: "sachsenAnhalt",
    zpid: "Sachsen-Anhalt",
    genesis: "Sachsen-Anhalt"
}, {
    key: "schleswigHolstein",
    zpid: "Schleswig-Holstein",
    genesis: "Schleswig-Holstein"
}, {
    key: "thueringen",
    zpid: "Thueringen",
    genesis: "Thüringen"
}]

const germanyKey = "germany"

const measures = [{
    key: "lockdown",
    zpid: "leavehome"
}, {
    key: "mask",
    zpid: "msk"
}, {
    key: "school",
    zpid: "school"
}]

const zpidKeys = {
    regionId: "",
    region: "state",
    measure: "Measure ",
}

const sectors = [{
    key: "accommodation",
    genesis: "Beherbergung"
}, {
    key: "hotelsInnsGuesthouses",
    genesis: "Hotels, Gasthöfe und Pensionen"
}, {
    key: "holidayAccommodation",
    genesis: "Ferienunterkünfte u. ähnliche Beherbergungsstätten"
}, {
    key:"campingSites",
    genesis: "Campingplätze"
}, {
    key: "otherAccommodation",
    genesis: "Sonstige Beherbergungsstätten"
}, {
    key: "gastronomy",
    genesis: "Gastronomie"
}, {
    key: "restaurantsTavernsSnackbarsCafes",
    genesis: "Restaurants, Gaststätten, Imbissstuben, Cafes u.Ä."
}, {
    key: "catereing",
    genesis: "Caterer und sonstige Verpflegungsdienstleistungen"
}, {
    key:"beverages",
    genesis: "Ausschank von Getränken"
}, {
    key: "restaurantBusiness",
    genesis: "Gaststättengewerbe"
}, {
    key: "hospitality",
    genesis: "Gastgewerbe"
}]

export {regions, germanyKey, measures, zpidKeys, sectors}