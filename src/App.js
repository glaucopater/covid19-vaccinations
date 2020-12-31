import React from "react";
import asyncComponent from "./AsyncComponent";
import "./App.css";
import { fetchLiveData } from "./Api";
const BarReact = asyncComponent(() =>
  import(/* webpackChunkName: "BarReact" */ "./Charts/BarReact")
);

const App = () => {
  const [data, setData] = React.useState();
  React.useEffect(async () => {
    const result = await fetchLiveData(data);
    setData(result);
  }, [fetchLiveData])

  let content;

  if (!data) {
    content = <span>Loading...</span>;
  }
  else {
    const countries = data.filter((c) => c.vaccinations).map((c) => c.location);
    const vaccinations = data.filter((c) => c.vaccinations).map((c) => c.vaccinations);

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


    console.log(countries, vaccinations);
    content = <BarReact option={barOption} />;
  }

  return (
    <div>
      <h2 className="App-header">Covid-19 vaccinations by country</h2>
      {content}
    </div>
  );

}

export default App;
