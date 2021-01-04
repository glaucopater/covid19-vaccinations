import React from "react";
import "./App.css";
import { fetchLiveData } from "./Api";
import { getAggregatedData, getCountriesDataByContinent, getWorldData } from "./Utils"
import { getBarOption } from "./Charts/BarChart/helpers";
import { BarChart } from "./Charts/BarChart";


const App = () => {
  const [data, setData] = React.useState();
  React.useEffect(async () => {
    const result = await fetchLiveData(data);
    setData(result);
  }, [fetchLiveData])


  if (!data) {
    return (
      <div className="App-header">
        <h1>Covid-19 vaccinations by country</h1>
        <h2>Loading...</h2>
      </div>)
  }
  else {
    const world = getWorldData(data);

    const countriesDataEurope = getCountriesDataByContinent(data, "Europe");
    const countriesDataAsia = getCountriesDataByContinent(data, "Asia");
    const countriesDataAfrica = getCountriesDataByContinent(data, "Africa");
    const countriesDataNorthAmerica = getCountriesDataByContinent(data, "North America");
    const countriesDataSouthAmerica = getCountriesDataByContinent(data, "South America");
    const countriesDataOceania = getCountriesDataByContinent(data, "Oceania");

    const aggregatedDataEurope = getAggregatedData(countriesDataEurope);
    const barOptionEurope = getBarOption(aggregatedDataEurope);

    const aggregatedDataAsia = getAggregatedData(countriesDataAsia);
    const barOptionAsia = getBarOption(aggregatedDataAsia);

    const aggregatedDataAfrica = getAggregatedData(countriesDataAfrica);
    const barOptionAfrica = getBarOption(aggregatedDataAfrica);

    const aggregatedDataNorthAmerica = getAggregatedData(countriesDataNorthAmerica);
    const barOptionNorthAmerica = getBarOption(aggregatedDataNorthAmerica);

    const aggregatedDataSouthAmerica = getAggregatedData(countriesDataSouthAmerica);
    const barOptionSouthAmerica = getBarOption(aggregatedDataSouthAmerica);

    const aggregatedDataOceania = getAggregatedData(countriesDataOceania);
    const barOptionOceania = getBarOption(aggregatedDataOceania);

    return (
      <>
        <div className="App-header">
          <h1>
            Covid-19 🌍 Vaccinations
            {world && <span> Total 💉{world.vaccinations}</span>}
          </h1>
        </div>
        <div className="App-grid">
          <BarChart className="App-grid-item" option={barOptionEurope} />
          <BarChart className="App-grid-item" option={barOptionAsia} />
          {countriesDataAfrica.length > 0 && <BarChart className="App-grid-item" option={barOptionAfrica} />}
          {countriesDataNorthAmerica.length > 0 && <BarChart className="App-grid-item" option={barOptionNorthAmerica} />}
          {countriesDataSouthAmerica.length > 0 && <BarChart className="App-grid-item" option={barOptionSouthAmerica} />}
          {countriesDataOceania.length > 0 && <BarChart className="App-grid-item" option={barOptionOceania} />}
        </div>
        <div className="App-footer">
          {world && <span> Last Update {world.date}</span>}
          {<span>Made by GP</span>}
        </div>
      </>
    )
  }
}

export default App;
