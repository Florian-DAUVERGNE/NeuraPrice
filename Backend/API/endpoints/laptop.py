import pickle
from flask import request, jsonify
import pandas as pd
import numpy as np

def predict():
    # Load model
    try:
        with open('./models/laptop/model_pipelineLaptop.pkl', 'rb') as f:
            pipe = pickle.load(f)
    except (FileNotFoundError, pickle.PickleError) as e:
        return jsonify({
            "error": "Failed to load model",
            "details": str(e)
        }), 500

    # Parse JSON payload
    try:
        data = request.get_json()
        if not data or "allParams" not in data:
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

    # Validate required fields
    try:
        required_keys = ['Company', 'TypeName', 'Inches', 'Gpu', 'resolution', 'CPU Name', 'OS', 'Weight (kg)']
        

        missing_keys = [key for key in required_keys if key not in data]
        if missing_keys:
            return jsonify({
                "error": "Missing required fields",
                "details": f"Missing keys: {', '.join(missing_keys)}",
                "received_data": data
            }), 400
    except Exception as e:
        return jsonify({
            "error": "Data validation failed",
            "details": str(e),
            "received_data": data
        }), 400

    # Process boolean values
    try:
        for key, value in data.items():
            if isinstance(value, str) and value.lower() == "oui":
                data[key] = 1
            if isinstance(value, str) and value.lower() == "non":
                data[key] = 0

    except Exception as e:
        return jsonify({
            "error": "Boolean conversion failed",
            "details": str(e),
            "problematic_data": data
        }), 400

    # Create DataFrame and predict
    try:
        # Ajout des valeurs par défaut
        data["Touchscreen"] = 0
        data["Ips"] = 0
        
        # Extraire la résolution
        resolution = data.get("resolution", "1366x768")  # valeur par défaut si non spécifiée
        data["X_res"] = int(resolution.split("x")[0])
        data["Y_res"] = int(resolution.split("x")[1])
        
        # Ajout des autres valeurs par défaut
        data["CPU Freq (GHz)"] = 2.29
        data["RAM (GB)"] = 8
        data["HDD"] = 128
        data["SSD"] = 128
        data["Flash Storage"] = 0

        print("--------------------------------")
        print(data)
        print("--------------------------------")

        df = pd.DataFrame(data, index=[0])

        price_pred_raw = pipe.predict(df)
        price_pred = np.exp(price_pred_raw)[0] if np.any(price_pred_raw < 0) else price_pred_raw[0]

    except Exception as e:
        return jsonify({
            "error": "Prediction failed",
            "details": str(e),
            "input_data": data,
            "dataframe_info": df.to_dict() if 'df' in locals() else None
        }), 500

    # Return successful response with debug info
    return jsonify({"price": float(price_pred)})
