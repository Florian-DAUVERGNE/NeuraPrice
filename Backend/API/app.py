from flask import Flask, redirect
from flask_cors import CORS
from flasgger import Swagger

from endpoints import phone, laptop, realestate

app = Flask(__name__)
swagger = Swagger(app)
CORS(app)

@app.route('/')
def api():
    return redirect("/apidocs", code=302)



# Routes pour les téléphones
@app.route('/predict/phone', methods=['POST'])
def predict_phone():
    """
    Prédiction du prix d'un téléphone
    ---
    tags:
      - Téléphone
    parameters:
      - in: body
        name: body
        required: true
        description: Données pour la prédiction
        schema:
          type: object
          properties:
            brand:
              type: string
              example: "Apple"
            condition:
              type: string
              example: "Occasion"
    responses:
      200:
        description: Prix prédit
        schema:
          type: object
          properties:
            price:
              type: string
              example: "500.0"
    """
    return phone.predict()

# Routes pour les laptops
@app.route('/predict/laptop', methods=['POST'])
def predict_laptop():
    return laptop.predict()

@app.route('/predict/realestate', methods=['POST'])
def predict_realestate():
    return realestate.predict()

if __name__ == '__main__':
    app.run(debug=True)







