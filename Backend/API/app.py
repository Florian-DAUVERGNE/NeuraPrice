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
            allParams:
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
    """
    Prédiction du prix d'un ordinateur portable
    ---
    tags:
      - Ordinateur portable
    parameters:
      - in: body
        name: body
        required: true
        description: Données pour la prédiction
        schema:
          type: object
          properties:
            allParams:
              type: object
              properties:
                Company:
                  type: string
                  example: "MSI"
                TypeName:
                  type: string
                  example: "Gaming"
                Inches:
                  type: number
                  format: float
                  example: 17.3
                Gpu:
                  type: string
                  example: "Nvidia"
                Touchscreen:
                  type: integer
                  example: 0
                  enum: [0, 1]
                Ips:
                  type: integer
                  example: 0
                  enum: [0, 1]
                X_res:
                  type: integer
                  example: 1920
                Y_res:
                  type: integer
                  example: 1080
                CPU Name:
                  type: string
                  example: "Intel Core i7"
                CPU Freq (GHz):
                  type: number
                  format: float
                  example: 2.8
                RAM (GB):
                  type: integer
                  example: 32
                HDD:
                  type: integer
                  example: 500
                SSD:
                  type: integer
                  example: 0
                Flash Storage:
                  type: integer
                  example: 0
                OS:
                  type: string
                  example: "Windows 10"
                Weight (kg):
                  type: number
                  format: float
                  example: 2.8
    responses:
      200:
        description: Prix prédit
        schema:
          type: object
          properties:
            price:
              type: string
              example: "1200.0"
    """
    return laptop.predict()

@app.route('/predict/realestate', methods=['POST'])
def predict_realestate():
    """
    Prédiction du prix d'un bien immobilier
    ---
    tags:
      - Immobilier
    parameters:
      - in: body
        name: body
        required: true
        description: Données pour la prédiction
        schema:
          type: object
          properties:
            allParams:
              type: object
              required:
                - price_direction
                - City
                - num_rooms_categorical
                - isExclusiveness
                - isNew
                - livingArea
                - zipCode
              properties:
                price_direction:
                  type: string
                  example: "Increased"
                  enum: ["Increased", "Decreased", "Stable"]
                City:
                  type: string
                  example: "Paris"
                num_rooms_categorical:
                  type: string
                  example: "medium"
                  enum: ["small", "medium", "large"]
                isExclusiveness:
                  type: string
                  example: "true"
                  enum: ["true", "false"]
                isNew:
                  type: string
                  example: "true"
                  enum: ["true", "false"]
                livingArea:
                  type: string
                  example: "500"
                zipCode:
                  type: string
                  example: "75001"
    responses:
      200:
        description: Prix prédit
        schema:
          type: object
          properties:
            price:
              type: number
              format: float
              example: 450000.0
      400:
        description: Erreur dans les paramètres
        schema:
          type: object
          properties:
            error:
              type: string
            details:
              type: string
      500:
        description: Erreur serveur
        schema:
          type: object
          properties:
            error:
              type: string
            details:
              type: string
    """
    return realestate.predict()

if __name__ == '__main__':
    app.run(debug=True)







