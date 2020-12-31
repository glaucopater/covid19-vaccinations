import jmespath
import os
import json

filename = "./data/owid-covid-data.json"

with open(filename) as json_file:
    jsonContent = json.load(json_file)
query = "*.{location: location, date: data[-1].date, vaccinations: data[-1].total_vaccinations}"
res = jmespath.search(query, jsonContent)
print(res)