
export const getContent = ({ label, value }) => {
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
                name: aggregatedData.length > 0 ? aggregatedData[0].continent : "",
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
        ],
    };
}
