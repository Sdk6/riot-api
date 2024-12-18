from flask import Flask, jsonify
from dotenv import load_dotenv
import os
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
import requests

load_dotenv()

app = Flask(__name__)

api_key = os.getenv('RIOT_API_KEY')
mongodb_uri = os.getenv('MONGODB_URI')
client = MongoClient(mongodb_uri)
db = client.python_riot_api
db.summoners.create_index("name", unique=True)

@app.route('/api/hello')
def hello():
    return jsonify(message="Hello from python server!")

def get_version():
    version_url='https://ddragon.leagueoflegends.com/api/versions.json'
    version_response=requests.get(version_url)
    version_response.raise_for_status()
    version = version_response.json()
    return version[0]

def get_championIds():
    try:
        champIds={}
        latest_version = get_version()

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

def get_match_data(match_history, pId, region, region2):
    matches=[]
    headers={
        "X-Riot-Token": api_key
    }
    version = get_version()
    for match in match_history:
        data={"RedTeam":[], "BlueTeam":[], "Winner": "", "Won":False, "User":"","UserItems":[], "UserChampion":"", "UserSummonerSpells": [], "GameType":"", "MatchID": match, "KDA":"", "Version":version, "Region": region, "Region2": region2}
        summoner_spells = {
            1: "SummonerBoost",#Cleanse
            3: "SummonerExhaust",#Exhaust
            4: "SummonerFlash",#Flash
            6: "SummonerHaste",#Ghost
            7: "SummonerHeal",#Heal
            11: "SummonerSmite",#Smite
            12: "SummonerTeleport",#Teleport
            13: "SummonerMana",#Clarity
            14: "SummonerDot",#Ignite
            21: "SummonerBarrier",#Barrier
            32: "SummonerSnowball"#Mark/ARAM-Snowball

        }
        match_url=f"https://{region}.api.riotgames.com/lol/match/v5/matches/{match}"
        # app.logger.info(f"butts {match_url}")
        match_response = requests.get(match_url, headers=headers)
        match_response.raise_for_status()
        match_data = match_response.json()
        participants = match_data['info']
        if participants['gameMode'] == "CLASSIC":
            if participants['queueId'] == 400:
                data['GameType']="NORMAL DRAFT"
            elif participants['queueId'] == 420:
                data['GameType']="RANKED SOLO/DUO"
            elif participants['queueId'] == 430 or participants['queueId'] == 490:
                data['GameType']="NORMAL BLIND"
            elif participants['queueId'] == 440:
                data['GameType']="RANKED FLEX"
        elif participants['gameMode'] == "CHERRY":
            data['GameType']="ARENA"
        else:    
            data['GameType']=participants['gameMode']

        for participant in participants['participants']:
            player_name=f"{participant['riotIdGameName']} #{participant['riotIdTagline']}"
            player_champion=participant['championName']
            player_info={player_name: player_champion}
            if participant['puuid'] == pId:
                data['User']=participant['riotIdGameName']
                data['UserChampion']=participant['championName']
                data['KDA']=f"{participant['kills']}/{participant['deaths']}/{participant['assists']}"
                data['UserSummonerSpells'].append(summoner_spells.get(participant['summoner1Id']))
                data['UserSummonerSpells'].append(summoner_spells.get(participant['summoner2Id']))
                for i in range(7):
                    data['UserItems'].append(participant[f"item{i}"])
                if participant['win'] == True:
                    data['Won']=True
            if participant['teamId']==100:
                data['BlueTeam'].append(player_info)
                if participant['win'] == True and not data['Winner']:
                    data['Winner']="BlueTeam"

            else:
                data['RedTeam'].append(player_info)
                if participant['win'] == True and not data['Winner']:
                    data['Winner']="RedTeam"
        matches.append(data)
    return matches

def insert_summoner_to_mongo(document):
    try:
        # Use the 'name' field as the unique identifier
        name = document.get('name')
        if not name:
            app.logger.error("Document is missing 'name' field")
            return

        # Prepare update operation
        update_operation = {}
        for key, value in document.items():
            if key != 'name':  # 'name' is our unique identifier, so we don't update it
                update_operation[key] = value

        result = db.summoners.update_one(
            {"name": name},
            {"$set": update_operation},
            upsert=True
        )

        if result.upserted_id:
            app.logger.info(f"New document inserted with ID: {result.upserted_id}")
        else:
            app.logger.info(f"Existing document updated for name: {name}")

    except DuplicateKeyError:
        app.logger.error(f"Duplicate key error for name: {name}")
    except Exception as e:
        app.logger.error(f"Error during upsert: {str(e)}")

def api_request(endpoint:str):
    headers={
        "X-Riot-Token": api_key
    }
    try:
        api_response = requests.get(endpoint, headers=headers)
        api_response.raise_for_status()
        app.logger.info(f"API request to {endpoint} successful. Status code: {api_response.status_code}")
        return api_response.json()
    
    except requests.exceptions.RequestException as e:
        app.logger.error(f"Request error for {endpoint}: {str(e)}")
        raise Exception(f"API request failed: {str(e)}")
    except Exception as e:
        app.logger.error(f"Error for {endpoint}: {str(e)}")
        raise Exception(f"An error occurred: {str(e)}")

@app.route('/api/account/<region>/<region2>/<gameName>/<tag>')
def get_account_by_name_and_tag(region, region2, gameName, tag):
    try:
        #account-v1 endpoint gamename and tag to get puuid
        accounts_data = api_request(f"https://{region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gameName}/{tag}?")
        
        #summoner-v4 endpoint for id's
        summoners_data = api_request(f"https://{region2}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{accounts_data['puuid']}")
        
        response_data = {
            'name': f"{gameName} #{tag}",
            'summonerLevel': summoners_data['summonerLevel'],
            'ids': {
                'puuid': summoners_data['puuid'],
                'summonerId': summoners_data['id'],
                'accountId': summoners_data['accountId'],
                'profileIconId': summoners_data['profileIconId']
            }
        }

        insert_summoner_to_mongo(response_data)
        return jsonify(response_data)

    except Exception as e:
        app.logger.error(f"Error in get_account_by_name_and_tag: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/summonerinfo/<puuid>/<summonerId>/<gameName>/<tag>/<region>/<region2>')
def get_summoner_rank_masteries_match_history(puuid, summonerId, gameName, tag,region,region2):
    response_data={'name': f"{gameName} #{tag}"}
    champIds={}
    try:  
        champIds= get_championIds()
    except Exception as e:
        app.logger.error(f"unable to fetch champ ids\nerror: {e}")
    try: 
        #masteries
        masteries_data=api_request(f"https://{region2}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/{puuid}/top")
        
        champion_masteries=[]
        for key in masteries_data:
            champion= champIds[str(key['championId'])]
            mastery_level= str(key['championLevel'])
            champion_masteries.append({champion: mastery_level})
        #app.logger.info(masteries_response)
        response_data['masteries']=champion_masteries
    
        #rank
        ranks_data=api_request(f"https://{region2}.api.riotgames.com/lol/league/v4/entries/by-summoner/{summonerId}")
        ranked_tiers={}
        for item in ranks_data:
            if item['queueType'] in ['RANKED_FLEX_SR', 'RANKED_SOLO_5x5']:
                ranked_tiers[item['queueType']]= f"{item['tier']} {item['rank']} {item['leaguePoints']}LP"
        #app.logger.info(f"ranks api status: {ranks_response}")

        #matches
        matches_data=api_request(f"https://{region}.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count=20")
        # app.logger.info(matches_data)

        # match details
        matches=get_match_data(matches_data, puuid, region, region2)

        response_data["ranks"]={
                "soloqueue": ranked_tiers.get("RANKED_SOLO_5x5", "Unranked"),
                "flexqueue": ranked_tiers.get("RANKED_FLEX_SR", "Unranked")
        }
        response_data["matches"]=matches
        response_data["name"]=f"{gameName} #{tag}"
        insert_summoner_to_mongo(response_data)
        #app.logger.info(f"masteries ")
        return jsonify(response_data)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)