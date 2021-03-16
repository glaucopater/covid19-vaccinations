import React from "react";
import "./App.css";
import { fetcher } from "./Api";
import { getAggregatedData, getCountriesDataByContinent, getWorldData } from "./Utils"
import { getBarOption } from "./Charts/BarChart/helpers";
import { BarChart } from "./Charts/BarChart";
import useSWR from 'swr';
import { apiUrl } from "./Config";
import { AppHeader } from "./Components/AppHeader";
import { AppFooter } from "./Components/AppFooter";

const App = () => {
  const [data, setData] = React.useState();

  const { data: apiData, error } = useSWR(apiUrl, fetcher);

  React.useEffect(() => {
    setData(apiData);
  }, [apiData])

  const pageTitle = <h1>Covid-19 🌍 Vaccinations</h1>;

  if (error)
    return (
      <AppHeader>
        {pageTitle}
        <span>Failed to load!</span>
      </AppHeader>
    );

  if (!data) {
    return (
      <AppHeader>
        {pageTitle}
        <span>Loading...</span>
      </AppHeader>);
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
        <AppHeader>
          <h1>
            <a href='./'>Covid-19 🌍 Vaccinations</a>
            {world && <span> Total 💉{world.vaccinations.toLocaleString()}</span>}
          </h1>
        </AppHeader>
        <main className="App-grid">
          <BarChart className="App-grid-item" option={barOptionEurope} />
          <BarChart className="App-grid-item" option={barOptionAsia} />
          {countriesDataAfrica.length > 0 && <BarChart className="App-grid-item" option={barOptionAfrica} />}
          {countriesDataNorthAmerica.length > 0 && <BarChart className="App-grid-item" option={barOptionNorthAmerica} />}
          {countriesDataSouthAmerica.length > 0 && <BarChart className="App-grid-item" option={barOptionSouthAmerica} />}
          {countriesDataOceania.length > 0 && <BarChart className="App-grid-item" option={barOptionOceania} />}
        </main>
        <AppFooter world={world} />
      </>
    )
  }
}

export default App;
