import React, { useLayoutEffect, useState, useEffect } from 'react';
import * as echarts from "echarts/lib/echarts";
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}


export const useECharts = (chartRef, option) => {
  let chartInstance = null;
  const [width, height] = useWindowSize();

  function renderChart() {
    const renderedInstance = echarts.getInstanceByDom(chartRef.current)
    if (renderedInstance) {
      chartInstance = renderedInstance
    } else {
      chartInstance = echarts.init(chartRef.current)
    }
    chartInstance.setOption(option)
    chartInstance.resize();
  }

  useEffect(() => {
    renderChart()
  }, [option, width, height])

  useEffect(() => {
    return () => {
      chartInstance && chartInstance.dispose()
    }
  }, [])

  return
}
