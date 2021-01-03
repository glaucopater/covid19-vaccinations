import React from "react";
import "./App.css";
import { fetchLiveData } from "./Api";
import { getAggregatedData, getWorldData } from "./Utils"
import BarReact, { getBarOption } from "./Charts/BarReact";


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
    const countriesData = data.filter((c) => c.vaccinations && c.location !== "World");
    const aggregatedData = getAggregatedData(countriesData);
    const barOption = getBarOption(aggregatedData);

    return (
      <>
        <div className="App-header">
          <h1>
            Covid-19 Worldwide Vaccinations 🌍
            {world && <span> Total 💉{world.vaccinations}</span>}
          </h1>
        </div>
        <BarReact option={barOption} />
        <div className="App-footer">
          {world && <span> Last Update {world.date}</span>}
          {<span>Made by GP</span>}
        </div>
      </>
    )
  }
}

export default App;
