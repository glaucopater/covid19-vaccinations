import React from "react";
import "../../App.css";
import { useApi } from "../../Api";
import { getAggregatedData, getCountriesDataByContinent, getWorldData } from "../../Utils/dashboard"
import { getBarOption } from "../../Charts/BarChart/helpers";
import { BarChart } from "../../Charts/BarChart";
import { AppHeader } from "../../Components/AppHeader";
import { PageTitle } from "../../Components/PageTitle";
import { AppFooter } from "../../Components/AppFooter";

const Dashboard = () => {
    const { apiData, isError } = useApi();

    if (isError)
        return (
            <AppHeader>
                <PageTitle />
                <span>Failed to load!</span>
            </AppHeader>
        );

    if (!apiData) {
        return (
            <AppHeader>
                <PageTitle />
                <span>Loading...</span>
            </AppHeader>);
    }
    else {
        const world = getWorldData(apiData);
        const barOptionsData = ["Europe", "Asia", "Africa", "North America", "South America", "Oceania"].map(country => {
            const countryData = getCountriesDataByContinent(apiData, country);
            return [countryData, getBarOption(getAggregatedData(countryData))];
        })

        const [, barOptionEurope] = barOptionsData[0];
        const [, barOptionAsia] = barOptionsData[1];
        const [countriesDataAfrica, barOptionAfrica] = barOptionsData[2];
        const [countriesDataNorthAmerica, barOptionNorthAmerica] = barOptionsData[3];
        const [countriesDataSouthAmerica, barOptionSouthAmerica] = barOptionsData[4];
        const [countriesDataOceania, barOptionOceania] = barOptionsData[5];

        return (
            <>
                <AppHeader>
                    <h1>
                        <PageTitle />
                    </h1>
                    {world && <h2> Total 💉{world.vaccinations.toLocaleString()}</h2>}
                </AppHeader>
                <main className="App-grid">
                    <BarChart className="App-grid-item" option={barOptionEurope} />
                    <BarChart className="App-grid-item" option={barOptionAsia} />
                    {countriesDataAfrica.length > 0 && <BarChart className="App-grid-item" option={barOptionAfrica} />}
                    {countriesDataNorthAmerica.length > 0 && <BarChart className="App-grid-item" option={barOptionNorthAmerica} />}
                    {countriesDataSouthAmerica.length > 0 && <BarChart className="App-grid-item" option={barOptionSouthAmerica} />}
                    {countriesDataOceania.length > 0 && <BarChart className="App-grid-item" option={barOptionOceania} />}
                </main>
                <AppFooter world={world} />
            </>
        )
    }
}

export default Dashboard;
