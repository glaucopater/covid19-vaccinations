#!/bin/bash
pwd
rm ./owid-covid-data/data/owid-covid-data.json.old
mv ./owid-covid-data/data/owid-covid-data.json ./owid-covid-data/data/owid-covid-data.json.old
wget -nv https://covid.ourworldindata.org/data/owid-covid-data.json -P ./owid-covid-data/data/
python3.4 ./owid-covid-data/scripts/server.py > ./mysite/result.json
