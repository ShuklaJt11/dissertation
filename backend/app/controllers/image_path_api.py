from flask import request, Response, json, Blueprint
from flask_cors import cross_origin

from app.helpers import get_random_image, get_unattacked_image, get_model_prediction

image_path_api = Blueprint("image_path", __name__)

@image_path_api.route('/', methods=['GET'])
@cross_origin()
def get_image_path():
    image_path = get_random_image()
    original = get_unattacked_image(image_path)
    output = get_model_prediction(original)

    return Response(
        response=json.dumps({
            'image_url': image_path,
            'probabilities': output
        }),
        status=200,
        mimetype='application/json'
    )