from flask import Flask, jsonify
from dotenv import load_dotenv
import os
from pymongo import MongoClient
import requests

load_dotenv()

app = Flask(__name__)

api_key = os.getenv('RIOT_API_KEY')
mongodb_uri = os.getenv('MONGODB_URI')

client = MongoClient(mongodb_uri)
db = client.python_riot_api

@app.route('/api/hello')
def hello():
    return jsonify(message="Hello from python server!")

@app.route('/api/account/<region>/<gameName>/<tag>')
def get_account_by_name_and_tag(region, gameName, tag):
    #Riot endpoint for accountv1 using name and tag
    url=f"https://{region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gameName}/{tag}?"
    headers={
        "X-Riot-Token": api_key
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)