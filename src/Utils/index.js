
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
            newCases: c.newCases,
            totalCases: c.totalCases,
            lastUpdate: c.date
        }
    });

    aggregatedData.sort(function (a, b) {
        return a.vaccinationsPerPopulation - b.vaccinationsPerPopulation;
    });

    const dates = aggregatedData && aggregatedData.map(d => new Date(d.lastUpdate)) || [];
    const statsDate = dates.length > 0 && (new Date(Math.max.apply(null, dates))).toISOString().split('T')[0] || "";

    return [aggregatedData, statsDate];
}


