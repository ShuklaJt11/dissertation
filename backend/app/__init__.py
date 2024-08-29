from flask import Flask
from flask_cors import CORS
from app.config.config import Config
from app.routes import api

app = Flask(__name__)
CORS(app)

config_controller = Config()
config = config_controller.dev_config

app.env = config.ENV
app.register_blueprint(api, url_prefix="/api")