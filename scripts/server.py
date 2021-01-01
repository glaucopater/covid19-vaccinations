#!/usr/bin/python3.4

import jmespath
import json

filename = "../data/owid-covid-data.json"

with open(filename) as json_file:
    jsonContent = json.load(json_file)


def getResult(lastDayInt):
    lastday = str(lastDayInt)
    query = (
        "*.{location: location, date: data["
        + lastday
        + "].date, vaccinations: data["
        + lastday
        + "].total_vaccinations}"
    )
    result = jmespath.search(query, jsonContent)
    return json.dumps(result)


print(getResult(-1))