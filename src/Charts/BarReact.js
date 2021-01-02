import React from "react";
import echarts from "echarts/lib/echarts";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/grid";
import "echarts/lib/chart/bar";

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
