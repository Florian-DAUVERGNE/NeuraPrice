from flask import jsonify, request
import random
import json
import dill
import pandas as pd

# Charger les modèles
with open("../models/preprocessor_real_estate.pkl", "rb") as f:
    preprocessor = dill.load(f)

with open("../models/poly_select_pipeline_real_estate.pkl", "rb") as f:
    poly_select_pipeline_real_estate = dill.load(f)

with open("../models/rf_best_model.pkl", "rb") as f:
    rf_best_model = dill.load(f)

# Définition des caractéristiques du modèle
numeric_features = ['livingArea', 'zipCode']
categorical_features = ['price_direction', 'num_rooms_categorical']
categorical_ordinal_features = ['City']
bool_features = ['isExclusiveness', 'isNew']

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

def predict():
    try:
        data = request.get_json()["allParams"]

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

        data['deposit_rate'] = 0.02
        data['lagged_CPI'] = 2.5
        data['volatility_value'] = 1.2
        data['month'] = 6
        data['year'] = 2024

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

        print(data)

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
