var jmespath = require('jmespath');

const data = require('./data/owid-covid-data.json');
const query = "*.{location: location,total_vaccinations: data[?total_vaccinations!=null]}[?length(total_vaccinations)>\"0\"].{location: location, tv: length(total_vaccinations), total_vaccinations: total_vaccinations[-1].total_vaccinations}";
const res = jmespath.search(data, query);
console.log(res);
