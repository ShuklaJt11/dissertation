from flask import Blueprint
from app.controllers.attack_api import attack_api
from app.controllers.image_path_api import image_path_api

api = Blueprint('api', __name__)

api.register_blueprint(attack_api, url_prefix="/attack")
api.register_blueprint(image_path_api, url_prefix="/get-image-path")