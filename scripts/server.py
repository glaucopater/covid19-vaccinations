#!/usr/bin/python3.4

import jmespath
import json

filename = "./data/owid-covid-data.json"

with open(filename) as json_file:
    jsonContent = json.load(json_file)

lastday = str(-2)
query = (
    "*.{location: location, date: data["
    + lastday
    + "].date, vaccinations: data["
    + lastday
    + "].total_vaccinations}"
)
res = jmespath.search(query, jsonContent)
print(json.dumps(res))