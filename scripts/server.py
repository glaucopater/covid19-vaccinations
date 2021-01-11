#!/usr/bin/python3.4

import jmespath
import json

filename = "../data/owid-covid-data.json"

with open(filename) as json_file:
    jsonContent = json.load(json_file)


def getResult():
    query = '*.{location: location,total_vaccinations: data[?total_vaccinations!=null]}[?length(total_vaccinations)>"0"].{location: location, tv: length(total_vaccinations), total_vaccinations: total_vaccinations[-1].total_vaccinations}'
    result = jmespath.search(query, jsonContent)
    return json.dumps(result)


print(getResult())