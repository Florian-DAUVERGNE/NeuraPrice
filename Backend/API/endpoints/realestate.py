from flask import jsonify, request
import random
import json
import dill
import pandas as pd

def predict():
    # Définition des caractéristiques du modèle
    numeric_features = ['livingArea', 'zipCode']
    categorical_features = ['price_direction', 'num_rooms_categorical']
    categorical_ordinal_features = ['City']
    bool_features = ['isExclusiveness', 'isNew']

    # Load models if not already loaded
    try:
        with open("../models/realestate/preprocessor_real_estate.pkl", "rb") as f:
            preprocessor = dill.load(f)
        with open("../models/realestate/poly_select_pipeline_real_estate.pkl", "rb") as f:
            poly_select_pipeline_real_estate = dill.load(f)
        with open("../models/realestate/rf_best_model.pkl", "rb") as f:
            rf_best_model = dill.load(f)
    except (FileNotFoundError, dill.PickleError) as e:
        return jsonify({
            "error": "Failed to load models",
            "details": str(e)
        }), 500

    # Parse JSON payload
    try:
        data = request.get_json()
        if not data or 'allParams' not in data:
            return jsonify({
                "error": "Invalid request format",
                "details": "Missing 'allParams' in request body"
            }), 400
        data = data["allParams"]
    except Exception as e:
        return jsonify({
            "error": "Failed to parse JSON",
            "details": str(e)
        }), 400

    # Generate random data if none provided
    if not data:
        try:
            data = {
                "price_per_sq_m": random.randint(3000, 10000),
                "price_direction": random.choice(["Stayed the same", "Increased", "Decreased"]),
                "isExclusiveness": random.choice([True, False]),
                "isNew": random.choice([True, False]),
                "livingArea": random.randint(30, 150),
                "zipCode": random.randint(75000, 75999),
                "deposit_rate": 0.02,
                "lagged_CPI": 2.5,
                "volatility_value": 1.2,
                "City": random.choice(["Paris", "Lyon", "Marseille", "Toulouse", "Nantes"]),
                "num_rooms_categorical": random.choice(["small", "medium", "large"]),
                "month": 6,
                "year": 2024
            }
        except Exception as e:
            return jsonify({
                "error": "Failed to generate random data",
                "details": str(e)
            }), 500
    else:
        # Set fixed values for certain parameters
        data['deposit_rate'] = 0.02
        data['lagged_CPI'] = 2.5
        data['volatility_value'] = 1.2
        data['month'] = 6
        data['year'] = 2024

    # Validate input data
    try:
        expected_keys = numeric_features + categorical_features + categorical_ordinal_features + bool_features
        missing_keys = [key for key in expected_keys if key not in data]
        if missing_keys:
            return jsonify({
                "error": "Missing required fields",
                "details": f"Missing keys: {missing_keys}",
                "received_data": data
            }), 400

        # Convert boolean strings to actual booleans
        data["isExclusiveness"] = bool(data["isExclusiveness"])
        data["isNew"] = bool(data["isNew"])
    except Exception as e:
        return jsonify({
            "error": "Data validation failed",
            "details": str(e),
            "received_data": data
        }), 400

    # Preprocess and predict
    try:
        df_input = pd.DataFrame([data])
        df_input_preprocessed = preprocessor.transform(df_input)
        df_input_selected = poly_select_pipeline_real_estate.transform(df_input_preprocessed)
        predicted_value = rf_best_model.predict(df_input_selected)[0]
    except Exception as e:
        return jsonify({
            "error": "Prediction failed",
            "details": str(e),
            "input_data": data,
        }), 500

    # Return successful response with debug info
    return jsonify({"price": predicted_value})