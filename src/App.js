import React, { Component } from "react";
import asyncComponent from "./AsyncComponent";
import { barOption } from "./OptionConfig/options";
import "./App.css";
const BarReact = asyncComponent(() =>
  import(/* webpackChunkName: "BarReact" */ "./Charts/BarReact")
);

class App extends Component {
  render() {
    return (
      <div>
        <h2 className="App-header">Covid-19 vaccinations by country</h2>
        <BarReact option={barOption} />
      </div>
    );
  }
}

export default App;
