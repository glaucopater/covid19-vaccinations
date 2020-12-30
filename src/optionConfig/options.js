import { data } from "../Data";
import * as theme from "./dark.js";

const countries =
  data.filter((c) => c.total_vaccinations).map((c) => c.location) || [];
const vaccinations =
  data.filter((c) => c.total_vaccinations).map((c) => c.total_vaccinations) ||
  [];

export const option = {
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

//柱状图数据
export const barOption = {
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
      data: data.filter((c) => c.total_vaccinations).map((c) => c.location),
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
      data: data
        .filter((c) => c.total_vaccinations)
        .map((c) => c.total_vaccinations)
    }
  ]
};
