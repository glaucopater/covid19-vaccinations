#!/usr/bin/python3.4

import jmespath
import json

filename = "../data/owid-covid-data.json"

with open(filename) as json_file:
    jsonContent = json.load(json_file)


def getResult():
    query = "*.{location: location,population:population,previousDate:data[-2].date,date: data[-1].date, previousVaccinations: data[-2].total_vaccinations,vaccinations: data[-1].total_vaccinations}"
    result = jmespath.search(query, jsonContent)
    return json.dumps(result)


print(getResult())