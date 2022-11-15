import React, { useRef } from 'react';
import { useECharts } from '../../Utils/hooks';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/grid';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/legend';
import './styles.css';

const Chart = ({ option }) => {
  const chartRef = useRef(null);
  useECharts(chartRef, option);
  return <div style={{ width: '100%', height: '800px' }} ref={chartRef} />;
};

export default Chart;
