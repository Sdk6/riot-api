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

@app.route('/api/account/<region>/<region2>/<gameName>/<tag>')
def get_account_by_name_and_tag(region,region2, gameName, tag):
    #Riot endpoint for accountv1 using name and tag
    accounts_url=f"https://{region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gameName}/{tag}?"
    summoner_url=f"https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/B1rhSEujJ244PfTsEpYltNYCRTWbh80QMjvGxS3wYkyyoaM8Z_D0C7m19WsBcxzgndaJ7O_HU4vKHg?api_key=RGAPI-6bf1a594-60b9-4b7d-953f-3294a05ce7b8"
    headers={
        "X-Riot-Token": api_key
    }

    try:
        #account-v1 endpoint gamename and tag to get puuid
        accounts_response = requests.get(accounts_url, headers=headers)
        accounts_response.raise_for_status()
        app.logger.info(f"accounts response status code: {accounts_response.status_code}")



        return jsonify(accounts_response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)