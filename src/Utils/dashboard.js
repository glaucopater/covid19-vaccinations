export const getWorldData = (data) => data.filter((c) => c.vaccinations && c.location === 'World')[0];

export const getCountriesDataByContinent = (data, continent) =>
  data.filter((c) => c.vaccinations && c.location !== 'World' && c.continent === continent);

export const getAggregatedData = (countriesData) => {
  const aggregatedData = countriesData.map((c) => {
    return {
      continent: c.continent,
      country: c.location,
      population: c.population,
      vaccinations: c.people_fully_vaccinated,
      vaccinationsPerPopulation: (c.people_fully_vaccinated * 100) / c.population,
      newCases: c.newCases,
      totalCases: c.totalCases,
      lastUpdate: c.date
    };
  });

  aggregatedData.sort(function (a, b) {
    return a.vaccinationsPerPopulation - b.vaccinationsPerPopulation;
  });

  const filteredAggregatedData = aggregatedData.filter(
    (country) => country.totalCases && country.totalCases > 0 && country.population > 100000 && country.vaccinationsPerPopulation > 1
  );
  const dates = (filteredAggregatedData && filteredAggregatedData.map((d) => new Date(d.lastUpdate))) || [];
  const statsDate = (dates.length > 0 && new Date(Math.max.apply(null, dates)).toISOString().split('T')[0]) || '';

  return [filteredAggregatedData, statsDate];
};
