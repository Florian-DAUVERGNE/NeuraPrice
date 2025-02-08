import joblib
from flask import Flask, request, jsonify
import pandas as pd

try:
    model = joblib.load("./models/cars/best_model.pkl")
except FileNotFoundError as e:
    print(f"Erreur : Impossible de charger le modèle - {e}")
    model = None 

# Définir les colonnes attendues
expected_features = ["Marque", "Annee_modele", "Km", "Carburant", "Boite_vitesse", "Puissance", "Critere_air", "Couleur", "Type_vehicule"]

def predict():
    if model is None:
        return jsonify({"error": "Modèle non disponible"}), 500
    try:
        # Récupérer les données envoyées
        data = request.json
        # Vérifier si toutes les colonnes attendues sont présentes
        missing_features = [feature for feature in expected_features if feature not in data]
        if missing_features:
            return jsonify({"error": f"Features manquantes : {', '.join(missing_features)}"}), 400

        # Convertir en DataFrame
        df_input = pd.DataFrame([data])

        # Vérifier et convertir les types (ex. Annee_modele et Km doivent être numériques)
        df_input["Annee_modele"] = pd.to_numeric(df_input["Annee_modele"], errors="coerce")
        df_input["Km"] = pd.to_numeric(df_input["Km"], errors="coerce")
        df_input["Puissance"] = pd.to_numeric(df_input["Puissance"], errors="coerce")

        # Vérifier les valeurs NaN après conversion
        if df_input.isnull().values.any():
            return jsonify({"error": "Données invalides ou mal formatées"}), 400

        prediction = model.predict(df_input)
        # Arrondir le prix à 2 chiffres après la virgule
        price = round(float(prediction[0]), 2)
        return jsonify({"price": price})

    except Exception as e:
        return jsonify({
            "error": "Erreur lors de la prédiction",
            "details": str(e)
        }), 500

