import React from 'react';
import '../../App.css';
import { getAggregatedData, getCountriesDataByContinent, getWorldData } from '../../Utils/dashboard';
import { getBarOption } from '../../Charts/BarChart/helpers';
import { BarChart } from '../../Charts/BarChart';
import { Header } from '../../Components/Header';
import { PageTitle } from '../../Components/PageTitle';
import { Footer } from '../../Components/Footer';

import apiData from '../../data/apiData.json';

const availableContinents = ['Europe', 'Asia', 'Africa', 'North America', 'South America', 'Oceania'];

const Dashboard = () => {
  if (!apiData)
    return (
      <Header>
        <PageTitle />
        <span>{isError ? 'Failed to load!' : 'Loading data...'}</span>
      </Header>
    );
  else {
    const worldData = getWorldData(apiData);
    const barOptionsData = availableContinents.map((country) => {
      const countryData = getCountriesDataByContinent(apiData, country);
      return [countryData, getBarOption(getAggregatedData(countryData))];
    });

    return (
      <>
        <Header>
          <h1>
            <PageTitle />
          </h1>
          {worldData && <h1> Total 💉{worldData.vaccinations.toLocaleString()}</h1>}
        </Header>
        <main className="App-grid">
          {barOptionsData.map(
            ([continentData, barOptionData], index) =>
              continentData.length > 0 && <BarChart key={index.toString()} className="App-grid-item" option={barOptionData} />
          )}
        </main>
        <Footer world={worldData} />
      </>
    );
  }
};

export default Dashboard;
