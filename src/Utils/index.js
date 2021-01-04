
export const getWorldData = (data) =>
    data.filter((c) => c.vaccinations && c.location === "World")[0];

export const getCountriesDataByContinent = (data, continent) =>
    data.filter((c) => c.vaccinations && c.location !== "World" && c.continent === continent);

export const getAggregatedData = (countriesData) => {

    const aggregatedData = countriesData.map((c) => {
        return {
            continent: c.continent,
            country: c.location,
            population: c.population,
            vaccinations: c.vaccinations,
            vaccinationsPerPopulation: (c.vaccinations * 100 / c.population),
            lastUpdate: c.date
        }
    });

    aggregatedData.sort(function (a, b) {
        return a.vaccinationsPerPopulation - b.vaccinationsPerPopulation;
    });

    return aggregatedData;
}


