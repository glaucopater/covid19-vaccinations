# A very simple Flask Hello World app for you to get started with...

from flask import Flask
import json
from flask_cors import CORS

filename = "/home/flagg/mysite/result.json"

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/")
def hello_world():
    return "Hello from Flask API!"


@app.route("/api")
def api():
    with open(filename) as json_file:
        jsonContent = json.load(json_file)
    return json.dumps(jsonContent, sort_keys=True, indent=4)
