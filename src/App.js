import React from "react";
import asyncComponent from "./AsyncComponent";
import "./App.css";
import { fetchLiveData } from "./Api";
import { pop } from "echarts/lib/component/dataZoom/history";
const BarReact = asyncComponent(() =>
  import(/* webpackChunkName: "BarReact" */ "./Charts/BarReact")
);

const getWorldData = (data) =>
  data.filter((c) => c.vaccinations && c.location === "World")[0];

const getBarOption = (aggregatedData) => {


  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      },
      formatter: function (params) {
        const { population, vaccinations, lastUpdate } = aggregatedData.filter(c => c.country === params[0].name)[0];
        var colorSpan = color => '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + color + '"></span>';
        let content = '<p><b>' + params[0].axisValue + '</b></p>';
        params.forEach(item => {
          content += '<p>' + colorSpan(item.color) + ' Population: ' + population + '</p>';
          content += '<p>' + colorSpan(item.color) + ' Vaccinations: ' + vaccinations + '</p>';
          content += '<p>' + colorSpan(item.color) + ' Vaccinated: ' + item.data.toFixed(4) + '%' + '</p>';
          content += '<p>' + colorSpan(item.color) + ' Last Update: ' + lastUpdate + '</p>';

        });
        return content;
      }
    },
    grid: {
      left: "3%",
      right: "10%",
      bottom: "3%",
      containLabel: true
    },
    yAxis: [
      {
        type: "category",
        name: 'Countries',
        data: aggregatedData.map(c => c.country),
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    xAxis: [
      {
        type: 'value',
        name: '%'
      }
    ],
    series: [
      {
        name: 'Population Vaccinated',
        type: 'bar',
        data: aggregatedData.map(c => c.vaccinationsPerPopulation)
      }
    ]
  };



}


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
    const aggregatedData = countriesData.map((c) => {
      return {
        country: c.location,
        population: c.population,
        vaccinations: c.vaccinations,
        vaccinationsPerPopulation: (c.vaccinations * 100 / c.population),
        lastUpdate: c.date
      }
    });

    aggregatedData.sort(function (a, b) {
      return a.vaccinationsPerPopulation - b.vaccinationsPerPopulation;
    });

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
