import React from "react";
import echarts from "echarts/lib/echarts";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/grid";
import "echarts/lib/chart/bar";


export const getBarOption = (aggregatedData) => {
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
          const percentageLabel = item.data < 0.1 ? item.data.toFixed(4) : item.data.toFixed(2);
          content += '<p>' + colorSpan(item.color) + ' Vaccinated: ' + percentageLabel + '%' + '</p>';
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
