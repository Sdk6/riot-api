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

def get_championIds():
    try:
        champIds={}
        version_url='https://ddragon.leagueoflegends.com/api/versions.json'
        version_response=requests.get(version_url)
        version_response.raise_for_status()
        version = version_response.json()
        latest_version = version[0]

        champions_url=f"https://ddragon.leagueoflegends.com/cdn/{latest_version}/data/en_US/champion.json"
        champions_response=requests.get(champions_url)
        champions_response.raise_for_status()
        champions_data=champions_response.json()
        for champion_name, champion_info in champions_data['data'].items():
            championid = champion_info['key']
            champIds[championid]=champion_name

        return champIds

    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/account/<region>/<region2>/<gameName>/<tag>')
def get_account_by_name_and_tag(region,region2, gameName, tag):
    #Riot endpoint for accountv1 using name and tag
    accounts_url=f"https://{region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gameName}/{tag}?"
    headers={
        "X-Riot-Token": api_key
    }
    temp = get_championIds()
    #app.logger.info(temp)
    try:
        #account-v1 endpoint gamename and tag to get puuid
        accounts_response = requests.get(accounts_url, headers=headers)
        accounts_response.raise_for_status()
        app.logger.info(f"accounts response status code: {accounts_response.status_code}")
        accounts_data = accounts_response.json()

        #summoner-v4 endpoint for id's
        summoners_url=f"https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{accounts_data['puuid']}"
        summoners_response = requests.get(summoners_url, headers=headers)
        summoners_response.raise_for_status()
        summoners_data = summoners_response.json()
        #app.logger.info(summoners_response.json())

        #masteries
        masteries_url=f"https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/{accounts_data['puuid']}/top"
        masteries_response = requests.get(masteries_url, headers=headers)
        masteries_response.raise_for_status()
        masteries_data = masteries_response.json()
        # app.logger.info(masteries_response.json())
        for key in masteries_data:
            app.logger.info(key['championId'])
            app.logger.info(key['championLevel'])

        #rank
        ranks_url=f"https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/{summoners_data['id']}"
        ranks_response = requests.get(ranks_url, headers=headers)
        ranks_response.raise_for_status()
        ranks_data = ranks_response.json()
        ranked_tiers={}
        for item in ranks_data:
            if item['queueType'] in ['RANKED_FLEX_SR', 'RANKED_SOLO_5x5']:
                ranked_tiers[item['queueType']]= f"{item['tier']} {item['rank']}"
        #app.logger.info(ranks_data)

        #matches
        matches_url=f"https://{region}.api.riotgames.com/lol/match/v5/matches/by-puuid/{accounts_data['puuid']}/ids?start=0&count=20"
        matches_response = requests.get(matches_url, headers=headers)
        matches_response.raise_for_status()
        matches_data = matches_response.json()
        #app.logger.info(matches_data)
        response_data = {
            'ids': {
                'puuid': summoners_data['puuid'],
                'summonerId': summoners_data['id'],
                'accountId': summoners_data['accountId'],
                'profileIconId': summoners_data['profileIconId']
            },
            'summonerLevel': summoners_data['summonerLevel'],
            'rankedSolo5v5': ranked_tiers.get("RANKED_SOLO_5x5", "Unranked"),
            'rankedFlex5v5': ranked_tiers.get("RANKED_FLEX_SR", "Unranked")
        }
        return jsonify(response_data)
        #return jsonify(summoners_data)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)