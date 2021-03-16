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
        <h1>Covid-19 🌍 Vaccinations</h1>
        <span>Loading...</span>
      </div>)
  }
  else {
    const world = getWorldData(data);

    const barOptionsData = ["Europe", "Asia", "Africa", "North America", "South America", "Oceania"].map(country => {
      const countryData = getCountriesDataByContinent(data, country);
      return [countryData, getBarOption(getAggregatedData(countryData))];
    })

    const [, barOptionEurope] = barOptionsData[0];
    const [, barOptionAsia] = barOptionsData[1];
    const [countriesDataAfrica, barOptionAfrica] = barOptionsData[2];
    const [countriesDataNorthAmerica, barOptionNorthAmerica] = barOptionsData[3];
    const [countriesDataSouthAmerica, barOptionSouthAmerica] = barOptionsData[4];
    const [countriesDataOceania, barOptionOceania] = barOptionsData[5];

    return (
      <>
        <div className="App-header">
          <h1>
            <a href='./'>Covid-19 🌍 Vaccinations</a>
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
