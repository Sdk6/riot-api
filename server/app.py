from flask import Flask, jsonify
from dotenv import load_dotenv
import os
from pymongo import MongoClient

load_dotenv()

app = Flask(__name__)

api_key = os.getenv('RIOT_API_KEY')
mongodb_uri = os.getenv('MONGODB_URI')

client = MongoClient(mongodb_uri)
db = client.python_riot_api

@app.route('/api/hello')
def hello():
    return jsonify(message="Hello from python server!")

if __name__ == '__main__':
    app.run(debug=True)