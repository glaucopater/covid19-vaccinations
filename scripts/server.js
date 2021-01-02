var jmespath = require('jmespath');

const data = require('../data/owid-covid-data.json');
const query = "*.{
location: location,
    population: population,
        previousDate: data[-2].date,
            date: data[-1].date,
                previousVaccinations: data[-2].total_vaccinations,
                    vaccinations: data[-1].total_vaccinations
    }";
const res = jmespath.search(data, query);
console.log(res);
