from flask import request, Response, json, Blueprint, send_file
from flask_cors import cross_origin
from io import BytesIO

from app.helpers import get_attacked_image, get_model_prediction, get_unattacked_image, get_attacked_image_object

attack_api = Blueprint("attack", __name__)

@attack_api.route('/predictions', methods=['POST'])
@cross_origin()
def attack_image():
    data = request.get_json()
    image_path = data.get('image')
    attacks = data.get('attacks')
    print(image_path)
    print(attacks)

    original = get_unattacked_image(image_path)
    image = get_attacked_image(image_path, attacks)

    original_output = get_model_prediction(original)
    image_output = get_model_prediction(image)

    return Response(
        response=json.dumps({
            "originalTable": original_output, 
            "attackedTable": image_output
        }),
        status=200,
        mimetype='application/json'
    )

@attack_api.route('/get-image', methods=['POST'])
@cross_origin()
def attacked_image_object():
    data = request.get_json()
    image_path = data.get('image')
    attacks = data.get('attacks')

    image = get_attacked_image_object(image_path, attacks)

    image_io = BytesIO()
    image.save(image_io, format='JPEG')
    image_io.seek(0)

    return send_file(image_io, mimetype='image/jpeg')