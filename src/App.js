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

    const barOptionEurope = getBarOption(getAggregatedData(countriesDataEurope));

    const barOptionAsia = getBarOption(getAggregatedData(countriesDataAsia));

    const barOptionAfrica = getBarOption(getAggregatedData(countriesDataAfrica));

    const barOptionNorthAmerica = getBarOption(getAggregatedData(countriesDataNorthAmerica));

    const barOptionSouthAmerica = getBarOption(getAggregatedData(countriesDataSouthAmerica));

    const barOptionOceania = getBarOption(getAggregatedData(countriesDataOceania));

    return (
      <>
        <div className="App-header">
          <h1>
            Covid-19 🌍 Vaccinations
            {world && <span> Total 💉{world.vaccinations.toLocaleString()}</span>}
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
          {<span>Made with 💙 by <a href='https://github.com/glaucopater/covid19-vaccinations'>GP</a></span>}
        </div>
      </>
    )
  }
}

export default App;
