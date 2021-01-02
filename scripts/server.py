#!/usr/bin/python3.4

import jmespath
import json

filename = "../data/owid-covid-data.json"

with open(filename) as json_file:
    jsonContent = json.load(json_file)


def getResult():
    query = "*.{location: location,population: population, data:data[?total_vaccinations].{date:date, total_vaccinations: total_vaccinations}}[].{location: location,population: population,date:data[-1].date,vaccinations:data[-1].total_vaccinations}"
    result = jmespath.search(query, jsonContent)
    return json.dumps(result)


print(getResult())