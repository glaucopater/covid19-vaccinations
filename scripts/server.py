#!/usr/bin/python3.4

import jmespath
import json

filename = "../data/owid-covid-data.json"

with open(filename) as json_file:
    jsonContent = json.load(json_file)


def getResult():
    query = "*.{continent: continent, location: location,population: population, data:data[?total_vaccinations].{date:date, total_vaccinations: total_vaccinations,people_fully_vaccinated:people_fully_vaccinated,new_cases:new_cases,total_cases: total_cases}}[].{continent: continent,location: location,population:population,date:data[-1].date,vaccinations:data[-1].total_vaccinations,people_fully_vaccinated:data[-1].people_fully_vaccinated,newCases:data[-1].new_cases,totalCases:data[-1].total_cases}"
    result = jmespath.search(query, jsonContent)
    return json.dumps(result)


print(getResult())
