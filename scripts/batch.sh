#!/bin/bash
wget https://covid.ourworldindata.org/data/owid-covid-data.json -P ./data/
python3.4 scripts/server.py > result.json