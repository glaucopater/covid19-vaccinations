import urllib.request

url = "https://covid.ourworldindata.org/data/owid-covid-data.json"

response = urllib.request.urlopen(url)
data = response.read()  # a `bytes` object
text = data.decode("utf-8")  # a `str`; this step can't be used if data is binary

with open("../data/owid-covid-data.json", "w") as f:
    f.write(text)
