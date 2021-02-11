
export const getContent = ({ label, value, isOld }) => {
    const valueToString = value ? value.toLocaleString() : 0;
    const val = isOld ? `<span class='itemOld'>${valueToString}</span>` : valueToString;
    return `<p><span class='itemLabel'></span> ${label} ${val} </p>`;
}

const getPercentage = (item) => {
    return item.data < 0.1 ? item.data.toFixed(4) : item.data.toFixed(2);
}

const checkIsOldDate = (lastUpdate, statsDate) => {
    return statsDate !== "" && lastUpdate !== statsDate
}

export const getBarOption = ([aggregatedData, statsDate]) => {

    return {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow"
            },
            formatter: function (params) {
                const { population, vaccinations, totalCases, newCases, lastUpdate } = aggregatedData.filter(c => c.country === params[0].name)[0];
                let content = '<p><b>' + params[0].axisValue + '</b></p>';
                [params[0]].forEach(item => {
                    content += getContent({ label: "Population", value: population });
                    content += getContent({ label: "Vaccinations", value: vaccinations });
                    content += getContent({ label: "Total Cases", value: totalCases });
                    content += getContent({ label: "New Cases", value: newCases });
                    if (item.seriesIndex === 0)
                        content += getContent({ label: "Vaccinated", value: getPercentage(item) + '%' });
                    content += getContent({ label: "Last Update", value: lastUpdate, isOld: checkIsOldDate(lastUpdate, statsDate) });
                });
                return content;
            }
        },
        grid: {
            left: "3%",
            right: "10%",
            bottom: "5%",
            containLabel: true,
            show: true
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
                type: 'value'
            }
        ],
        legend: {
            selected: {
                'Population Vaccinated %': true,
                'Infections': false,
                'New cases': false,
            }
        },
        series: [
            {
                name: 'Vaccinated %',
                type: 'bar',
                stack: 'total',
                itemStyle: {
                    color: '#1B998B'
                },
                data: aggregatedData.map(c => c.vaccinationsPerPopulation)
            },
            {
                name: 'Infections',
                type: 'bar',
                stack: 'total',
                itemStyle: {
                    color: '#E8C547'
                },
                data: aggregatedData.map(c => c.totalCases)
            },

            {
                name: 'New cases',
                type: 'bar',
                stack: 'total',
                itemStyle: {
                    color: '#E53D00'
                },
                data: aggregatedData.map(c => c.newCases)
            }
        ],
    };
}
