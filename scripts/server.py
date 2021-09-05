#!/usr/bin/python3.4

import jmespath
import json

filename = "../data/owid-covid-data.json"

with open(filename) as json_file:
    jsonContent = json.load(json_file)


def getResult():
    query = '*.{location: location,people_fully_vaccinated: data[?people_fully_vaccinated!=null]}[?length(people_fully_vaccinated)>"0"].{location: location, tv: length(people_fully_vaccinated), people_fully_vaccinated: people_fully_vaccinated[-1].people_fully_vaccinated}'
    result = jmespath.search(query, jsonContent)
    return json.dumps(result)


print(getResult())
