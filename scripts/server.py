import jmespath
import os
import json

# filename = "./data/test.json"
filename = "./data/owid-covid-data.json"
# filename = "./data/owid-covid-data-ita.json"

# file = open(filename, "r")
# fileContent = file.read()
# file.close()


# with open(filename, "r") as file:
#     fileContent = file.read()

with open(filename) as json_file:
    jsonContent = json.load(json_file)

jsonTest = {
    "continent": "Europe",
    "location": "Italy",
    "population": 60461828,
    "population_density": 205.859,
    "data": [
        {
            "date": "2020-12-28",
            "total_cases": 2056277,
            "new_cases": 8581,
            "new_cases_smoothed": 13174.714,
            "total_deaths": 72370,
            "new_deaths": 445,
            "new_deaths_smoothed": 450.857,
            "total_cases_per_million": 34009.508,
            "new_cases_per_million": 141.924,
            "new_cases_smoothed_per_million": 217.901,
            "total_deaths_per_million": 1196.954,
            "new_deaths_per_million": 7.36,
            "new_deaths_smoothed_per_million": 7.457,
            "new_tests": 68681,
            "total_tests": 26114818,
            "total_tests_per_thousand": 431.922,
            "new_tests_per_thousand": 1.136,
            "new_tests_smoothed": 128258,
            "new_tests_smoothed_per_thousand": 2.121,
            "positive_rate": 0.103,
            "tests_per_case": 9.7,
            "tests_units": "tests performed",
        },
        {
            "date": "2020-12-29",
            "total_cases": 2067487,
            "new_cases": 11210,
            "new_cases_smoothed": 12873.857,
            "total_deaths": 73029,
            "new_deaths": 659,
            "new_deaths_smoothed": 455.286,
            "total_cases_per_million": 34194.914,
            "new_cases_per_million": 185.406,
            "new_cases_smoothed_per_million": 212.925,
            "total_deaths_per_million": 1207.853,
            "new_deaths_per_million": 10.899,
            "new_deaths_smoothed_per_million": 7.53,
            "new_tests": 128740,
            "total_tests": 26243558,
            "total_tests_per_thousand": 434.052,
            "new_tests_per_thousand": 2.129,
            "new_tests_smoothed": 124120,
            "new_tests_smoothed_per_thousand": 2.053,
            "positive_rate": 0.104,
            "tests_per_case": 9.6,
            "tests_units": "tests performed",
            "total_vaccinations": 8361,
            "total_vaccinations_per_hundred": 0.01,
        },
        {
            "date": "2020-12-30",
            "total_cases": 2083689,
            "new_cases": 16202,
            "new_cases_smoothed": 13201.571,
            "total_deaths": 73604,
            "new_deaths": 575,
            "new_deaths_smoothed": 458.429,
            "total_cases_per_million": 34462.885,
            "new_cases_per_million": 267.971,
            "new_cases_smoothed_per_million": 218.346,
            "total_deaths_per_million": 1217.363,
            "new_deaths_per_million": 9.51,
            "new_deaths_smoothed_per_million": 7.582,
            "total_vaccinations": 9803,
            "total_vaccinations_per_hundred": 0.02,
        },
    ],
}


# query = '*.{location: location,total_vaccinations: data[?total_vaccinations!=null]}[?length(total_vaccinations)>"0"].{location: location, tv: length(total_vaccinations), total_vaccinations: total_vaccinations[-1].total_vaccinations}'
query = "*.{location: location, date: data[-1].date, vaccinations: data[-1].total_vaccinations}"
res = jmespath.search(query, jsonContent)
# print(json.dumps(res))
print(res)

# path = jmespath.search("foo.bar", {"foo": {"bar": "baz"}})
# print(path)
