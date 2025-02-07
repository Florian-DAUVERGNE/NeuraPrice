import pickle
from flask import request, jsonify

def predict():
    try:
        with open('../models/phone/model.pkl', 'rb') as f:
                    modele_charge = pickle.load(f)
    except (FileNotFoundError, pickle.PickleError) as e:
        return jsonify({ "error": "Failed to load model", "details": str(e) }), 500
          
    # Charger les encodeurs
    try:
        with open('../models/phone/encodings.pkl', 'rb') as f:
            encodeurs = pickle.load(f)
            label_encoder_marque = encodeurs['marque_encoder']
            label_encoder_etat = encodeurs['etat_encoder']
    except (FileNotFoundError, pickle.PickleError, KeyError) as e:
        return jsonify({
            "error": "Failed to load encoders",
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
    except Exception as e:
        return jsonify({
            "error": "Failed to parse JSON",
            "details": str(e)
        }), 400

    # Extract and encode data
    try:
        nouvelle_marque = [data['allParams']['brand']] if 'brand' in data['allParams'] else ['Apple']
        nouvel_etat = [data['allParams']['condition']] if 'condition' in data['allParams'] else ['Occasion']

        marque_encoded = label_encoder_marque.transform(nouvelle_marque)
        etat_encoded = label_encoder_etat.transform(nouvel_etat)
    except ValueError as e:
        return jsonify({
            "error": "Invalid input values",
            "details": str(e),
            "input_received": {
                "brand": nouvelle_marque[0],
                "condition": nouvel_etat[0]
            }
        }), 400

    # Make prediction
    try:
        X_nouvelles_donnees = [[marque_encoded[0], etat_encoded[0]]]
        y_pred = modele_charge.predict(X_nouvelles_donnees)
        price = str(y_pred[0])
    except Exception as e:
        return jsonify({
            "error": "Prediction failed",
            "details": str(e),
            "model_input": X_nouvelles_donnees
        }), 500

    # Return the prediction result as JSON
    return jsonify({"price": price})