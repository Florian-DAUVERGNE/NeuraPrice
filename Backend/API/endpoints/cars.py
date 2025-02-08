import joblib
from flask import Flask, request, jsonify
import pandas as pd
import pickle

# Définir les colonnes attendues
expected_features = ["Marque", "Km", "Carburant", "Boite_vitesse", "Puissance", "Critere_air", "Couleur", "Type_vehicule","Pays","age"]

def predict():
    try:
        try:
            with open('./models/cars/best_model.pkl', 'rb') as f:
                        model = pickle.load(f)
        except (FileNotFoundError, pickle.PickleError) as e:
            return jsonify({ "error": "Failed to load model", "details": str(e) }), 500
                
        # Charger les encodeurs
        try:
            with open('./models/cars/encodeurs_voiture.pkl', 'rb') as f:
                encoder = pickle.load(f)

        except (FileNotFoundError, pickle.PickleError, KeyError) as e:
            return jsonify({
                "error": "Failed to load encoders",
                "details": str(e)
            }), 500

        if model is None:
            return jsonify({"error": "Modèle non disponible"}), 500
        try:
            # Récupérer les données envoyées
            data = request.json["allParams"]
            # Vérifier si toutes les colonnes attendues sont présentes
            missing_features = [feature for feature in expected_features if feature not in data]
            if missing_features:
                return jsonify({"error": f"Features manquantes : {', '.join(missing_features)}"}), 400

            # Convertir en DataFrame
            df_input = pd.DataFrame([data])

        

            # Vérifier et convertir les types (ex. Annee_modele et Km doivent être numériques)
            df_input["Km"] = pd.to_numeric(df_input["Km"], errors="coerce")
            df_input["Puissance"] = pd.to_numeric(df_input["Puissance"], errors="coerce")

            # Vérifier les valeurs NaN après conversion
            if df_input.isnull().values.any():
                return jsonify({"error": "Données invalides ou mal formatées"}), 400
            
            df_input['Km_bins'] = "(225000, 240000]"
            
            df_input['Marque'] = encoder['marque_encoder'].transform(df_input['Marque'])
            df_input['Carburant'] = encoder['carburant_encoder'].transform(df_input['Carburant'])
            df_input['Boite_vitesse'] = encoder['boite_vitesse_encoder'].transform(df_input['Boite_vitesse'])
            df_input['Critere_air'] = encoder['critere_air_encoder'].transform(df_input['Critere_air'])
            print(df_input)
            df_input['Km_bins'] = encoder['km_bins_encoder'].transform(df_input['Km_bins'])


            print(df_input)
            df_input['Couleur'] = encoder['couleur_encoder'].transform(df_input['Couleur'])
            df_input['Type_vehicule'] = encoder['type_vehicule_encoder'].transform(df_input['Type_vehicule'])
            df_input['Pays'] = encoder['pays_encoder'].transform(df_input['Pays'])

            print(df_input)

            df_input['age'] = int(df_input['age'])

            

            prediction = model.predict(df_input)
            
            # Arrondir le prix à 2 chiffres après la virgule
            price = round(float(prediction[0]), 2)
            return jsonify({"price": price})

        except Exception as e:
            return jsonify({
                "error": "Erreur lors de la prédiction",
                "details": str(e)
            }), 500
    except Exception as e:
        return jsonify({
            "error": "Erreur lors de la prédiction",
            "details": str(e)
        }), 500
