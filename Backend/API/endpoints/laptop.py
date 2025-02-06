import pickle
from flask import request, jsonify
import pandas as pd
import numpy as np

def predict():
    # Charger le modèle entraîné depuis pickle
    with open('../models/laptop/model_pipelineLaptop.pkl', 'rb') as f:
        pipe = pickle.load(f)

    # Récupération des données JSON de la requête
    data = request.get_json()["allParams"]
    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Vérification des clés manquantes
    required_keys = ['Company', 'TypeName', 'Inches', 'Gpu', 'Touchscreen', 'Ips', 
                      'X_res', 'Y_res', 'CPU Name', 'CPU Freq (GHz)', 'RAM (GB)', 
                      'HDD', 'SSD', 'Flash Storage', 'OS', 'Weight (kg)']
    
    missing_keys = [key for key in required_keys if key not in data]
    if missing_keys:
        return jsonify({"error": f"Missing keys: {', '.join(missing_keys)}"}), 400

    # Parcourir les clés de `data` et remplacer les valeurs "true" par 1
    for key, value in data.items():
        if isinstance(value, str) and value.lower() == "true":
            data[key] = 1
        
        if isinstance(value, str) and value.lower() == "false":
            data[key] = 0

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
