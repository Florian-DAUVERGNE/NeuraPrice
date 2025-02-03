from flask import Flask,jsonify, request
import pickle
import pandas as pd
from flask_cors import CORS
import numpy as np
from flasgger import Swagger


app = Flask(__name__)
swagger = Swagger(app)


CORS(app)

@app.route('/predict/phone', methods=['POST'])
def pred():
  
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

      # Charger le modèle
      with open('..\models\phone\model.pkl', 'rb') as f:
          modele_charge = pickle.load(f)
          
      # Charger les encodeurs
      with open('..\models\phone\encodings.pkl', 'rb') as f:
          encodeurs = pickle.load(f)
          label_encoder_marque = encodeurs['marque_encoder']
          label_encoder_etat = encodeurs['etat_encoder']

      # Parse JSON payload
      data = request.get_json()

      # Extract the necessary fields
      nouvelle_marque = [data['allParams']['brand']] if 'brand' in data['allParams'] else ['Apple']
      
      # Default to 'Apple' if not provided
      nouvel_etat = [data['allParams']['condition']] if 'condition' in data['allParams'] else ['Occasion']


      # Encode the data
      marque_encoded = label_encoder_marque.transform(nouvelle_marque)
      etat_encoded = label_encoder_etat.transform(nouvel_etat)

      # Prepare data for prediction
      X_nouvelles_donnees = [[marque_encoded[0], etat_encoded[0]]]

      # Predict using the model
      y_pred = modele_charge.predict(X_nouvelles_donnees)

      price = str(y_pred[0])

      # Return the prediction result as JSON
      return jsonify({"price": price})

from flask import Flask, request, jsonify
import pickle
import pandas as pd
import numpy as np

app = Flask(__name__)

@app.route('/predict/laptop', methods=['POST'])
def pred2():
    # Charger le modèle entraîné depuis pickle
    with open('../models/model_pipelineLaptop.pkl', 'rb') as f:
        pipe = pickle.load(f)

    # Récupération des données JSON de la requête
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Vérification des clés manquantes
    required_keys = ['Company', 'TypeName', 'Inches', 'Gpu', 'Touchscreen', 'Ips', 
                      'X_res', 'Y_res', 'CPU Name', 'CPU Freq (GHz)', 'RAM (GB)', 
                      'HDD', 'SSD', 'Flash Storage', 'OS', 'Weight (kg)']
    
    missing_keys = [key for key in required_keys if key not in data]
    if missing_keys:
        return jsonify({"error": f"Missing keys: {', '.join(missing_keys)}"}), 400

    # Convertir les données en DataFrame
    df = pd.DataFrame(data, index=[0])

    # Vérification du DataFrame
    print("Données pour la prédiction :")
    print(df)

    # Prédiction du prix du laptop
    price_pred_raw = pipe.predict(df)  # Prédiction du modèle sans appliquer np.exp()
    print(f"Prix brut prédit (sans np.exp): {price_pred_raw}")

    # Si une transformation logarithmique a été appliquée
    price_pred = np.exp(price_pred_raw)[0] if np.any(price_pred_raw < 0) else price_pred_raw[0]
    print(f"Prix final prédit (après inversement du log si nécessaire): {price_pred}")

    # Retourner la prédiction sous forme de JSON
    return jsonify({"price": float(price_pred)})

import json
import random
import dill

# Fonction utilisée dans le préprocesseur
def convert_bool_to_int(X):
    return X.astype(int)

# Charger le preprocessor avec `dill`
with open("../models/preprocessor_real_estate.pkl", "rb") as f:
    preprocessor = dill.load(f)

with open("../models/poly_select_pipeline_real_estate.pkl", "rb") as f:
    poly_select_pipeline_real_estate = dill.load(f)

with open("../models/rf_best_model.pkl", "rb") as f:
    rf_best_model = dill.load(f)

# Définition des caractéristiques du modèle
numeric_features = ['price_per_sq_m', 'livingArea', 'zipCode', 'deposit_rate', 'lagged_CPI', 'volatility_value', 'month', 'year']
categorical_features = ['price_direction', 'num_rooms_categorical']
categorical_ordinal_features = ['City']
bool_features = ['isExclusiveness', 'isNew']


@app.route('/get_categories/realestate', methods=['GET'])
def get_categories():
    categories = {
        "price_direction": ['Stayed the same', 'Decreased', 'Increased'],
        "City": ["Marseille", "Nantes", "Bordeaux", "Lyon", "Toulouse", "Asnieres-sur-Seine",
        "Boulogne-Billancourt", "Aix-en-Provence", "Toulon", "Perpignan", "Cergy-Pontoise",
        "Brest", "Rouen", "Montpellier", "Metz", "Avignon", "Nanterre", "Angers",
        "Argenteuil", "Caen", "Paris", "Amiens", "Orleans", "Grenoble",
        "Saint-Quentin-en-Yvelines", "Clermont-Ferrand", "Lille", "Tours", "Limoges",
        "Strasbourg", "Courbevoie", "Saint-Etienne", "Versailles", "Reims", "Nancy",
        "Nimes", "Dijon", "Besancon", "Le Havre", "Poitiers", "Saint-Denis",
        "Mulhouse", "Rennes", "Le Mans", "Roubaix", "Tourcoing"],
        "num_rooms_categorical": ['small', 'medium', 'large'],
        "isExclusiveness": [False, True],
        "isNew": [False, True],
    }
    
    return jsonify(categories)

@app.route('/predict/realestate', methods=['POST'])
def pred3():
    try:
        data = request.get_json()

        # Si aucune donnée n'est envoyée, générer des valeurs aléatoires
        if not data:
            data = {
                "price_per_sq_m": random.randint(3000, 10000),
                "price_direction": random.choice(["Stayed the same", "Increased", "Decreased"]),
                "isExclusiveness": random.choice([True, False]),
                "isNew": random.choice([True, False]),
                "livingArea": random.randint(30, 150),
                "zipCode": random.randint(75000, 75999),
                "deposit_rate": round(random.uniform(0.01, 0.05), 2),
                "lagged_CPI": round(random.uniform(1.0, 5.0), 2),
                "volatility_value": round(random.uniform(0.5, 3.0), 2),
                "City": random.choice(["Paris", "Lyon", "Marseille", "Toulouse", "Nantes"]),
                "num_rooms_categorical": random.choice(["small", "medium", "large"]),
                "month": random.randint(1, 12),
                "year": random.randint(2010, 2025)
            }
            print(f"Aucune donnée reçue, génération aléatoire : {json.dumps(data, indent=4)}")

        print(f"JSON reçu : {json.dumps(data, indent=4)}")  # Ajout d'un print pour vérifier ce qui est reçu

        # Vérification des clés manquantes
        expected_keys = numeric_features + categorical_features + categorical_ordinal_features + bool_features
        missing_keys = [key for key in expected_keys if key not in data]
        if missing_keys:
            return jsonify({"error": f"Missing keys: {missing_keys}"}), 400

        # Conversion correcte des booléens venant du JSON ("True"/"False" → bool)
        data["isExclusiveness"] = bool(data["isExclusiveness"])
        data["isNew"] = bool(data["isNew"])

        # Convertir en DataFrame
        df_input = pd.DataFrame([data])

        # Appliquer le préprocesseur (seulement transform, pas fit)
        df_input_preprocessed = preprocessor.transform(df_input)
        
        df_input_selected = poly_select_pipeline_real_estate.transform(df_input_preprocessed)

        # Faire la prédiction
        predicted_value = rf_best_model.predict(df_input_selected)[0]

        print(f"🎯 Prédiction réalisée : {predicted_value}")

        return jsonify({"price": predicted_value})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

""" requête terminal
$headers = @{"Content-Type"="application/json"}
$body = '{
    "price_per_sq_m": 5000,
    "price_direction": "Increased",
    "isExclusiveness": true,
    "isNew": false,
    "livingArea": 75,
    "zipCode": 75000,
    "deposit_rate": 0.02,
    "lagged_CPI": 2.5,
    "volatility_value": 1.2,
    "City": "Paris",
    "num_rooms_categorical": "medium",
    "month": 6,
    "year": 2024
}'

Invoke-RestMethod -Uri "http://127.0.0.1:5000/predict/realestate" -Method POST -Headers $headers -Body $body
"""







