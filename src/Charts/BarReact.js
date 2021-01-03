import React from "react";
import echarts from "echarts/lib/echarts";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/grid";
import "echarts/lib/chart/bar";
import "./BarChart.css";


const getContent = ({ label, value }) => {
  return "<p><span class='itemLabel' ></span> " + label + " " + value + "</p>";
}

export const getBarOption = (aggregatedData) => {

  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      },
      formatter: function (params) {
        const { population, vaccinations, lastUpdate } = aggregatedData.filter(c => c.country === params[0].name)[0];
        let content = '<p><b>' + params[0].axisValue + '</b></p>';
        params.forEach(item => {
          content += getContent({ label: "Population", value: population });
          content += getContent({ label: "Vaccinations", value: vaccinations });
          const percentageLabel = item.data < 0.1 ? item.data.toFixed(4) : item.data.toFixed(2);
          content += getContent({ label: "Vaccinated", value: percentageLabel + '%' });
          content += getContent({ label: "Last Update", value: lastUpdate });
        });
        return content;
      }
    },
    grid: {
      left: "3%",
      right: "10%",
      bottom: "5%",
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
        itemStyle: {
          normal: {
            color: (d) => {
              return "#" + Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(16);
            }
          }
        },
        data: aggregatedData.map(c => c.vaccinationsPerPopulation)
      }
    ],
  };
}

export default class BarReact extends React.Component {
  constructor(props) {
    super(props);
    this.initPie = this.initChart.bind(this);
  }

  initChart() {
    const { option = {} } = this.props;
    let myChart = echarts.init(this.ID);
    myChart.setOption(option);
    window.onresize = function () {
      myChart.resize();
    };
  }

  componentDidMount() {
    this.initChart();
  }

  componentDidUpdate() {
    this.initChart();
  }

  render() {
    const { width = "100%", height = "600px" } = this.props;
    return <div ref={(ID) => (this.ID = ID)} style={{ width, height }}></div>;
  }
}
