import React from "react";
import asyncComponent from "./AsyncComponent";
import "./App.css";
import { fetchLiveData } from "./Api";
const BarReact = asyncComponent(() =>
  import(/* webpackChunkName: "BarReact" */ "./Charts/BarReact")
);

const getWorldData = (data) =>
  data.filter((c) => c.vaccinations && c.location === "World")[0];


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
    const countries = data.filter((c) => c.vaccinations && c.location !== "World").map((c) => c.location);
    const vaccinations = data.filter((c) => c.vaccinations && c.location !== "World").map((c) => c.vaccinations);

    const barOption = {
      darkMode: true,
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          axisLabel: {
            rotate: 45
          },
          data: countries,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "Vaccinations",
          type: "bar",
          barWidth: "60%",
          data: vaccinations
        }
      ]
    };


    return (
      <>
        <div className="App-header">
          <h1>
            Covid-19 vaccinations by country
            {world && <span> World 🌍: {world.vaccinations}</span>}
          </h1>
          <h3>
            {world && <span> Last Update: {world.date}</span>}
          </h3>
        </div>
        <BarReact option={barOption} />
      </>
    )
  }
}

export default App;
