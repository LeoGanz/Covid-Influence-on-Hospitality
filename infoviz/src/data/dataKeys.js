const regions = [{
    key: "badenWuerttemberg",
    zpid: "Baden-Wuerttemberg"
}, {
    key: "bavaria",
    zpid: "Bayern"
}, {
    key: "berlin",
    zpid: "Berlin"
}, {
    key: "brandenburg",
    zpid: "Brandenburg"
}, {
    key: "bremen",
    zpid: "Bremen"
}, {
    key: "hamburg",
    zpid: "Hamburg"
}, {
    key: "hessen",
    zpid: "Hessen"
}, {
    key: "mecklenburgVorpommern",
    zpid: "Mecklenburg-Vorpommern"
}, {
    key: "niedersachsen",
    zpid: "Niedersachsen"
}, {
    key: "nordrheinWestfalen",
    zpid: "Nordrhein-Westfalen"
}, {
    key: "rheinlandPfalz",
    zpid: "Rheinland-Pfalz"
}, {
    key: "saarland",
    zpid: "Saarland"
}, {
    key: "sachsen",
    zpid: "Sachsen"
}, {
    key: "sachsenAnhalt",
    zpid: "Sachsen-Anhalt"
}, {
    key: "schleswigHolstein",
    zpid: "Schleswig-Holstein"
}, {
    key: "thueringen",
    zpid: "Thueringen"
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


export {regions, germanyKey, measures, zpidKeys}