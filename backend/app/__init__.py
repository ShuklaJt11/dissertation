from flask import Flask, request, jsonify
from flask_cors import CORS
from app.config.config import Config
from app.routes import api

app = Flask(__name__)
CORS(app)

@app.before_request
def before_request():
    headers = {'Access-Control-Allow-Origin': '*',
               'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
               'Access-Control-Allow-Headers': 'Content-Type'}
    if request.method.lower() == 'options':
        return jsonify(headers), 200

config_controller = Config()
config = config_controller.dev_config

app.env = config.ENV
app.register_blueprint(api, url_prefix="/api")