#!/bin/bash
pwd
#wget https://covid.ourworldindata.org/data/owid-covid-data.json -P ./data/
python3.4 scripts/server.py > ../mysite/result.json
