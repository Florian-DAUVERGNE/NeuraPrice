from flask import Flask,jsonify, request
import pickle
import pandas as pd
from flask_cors import CORS

# Charger le modèle
with open('modele_telephone.pkl', 'rb') as f:
    modele_charge = pickle.load(f)

# Charger les encodeurs
with open('encodeurs.pkl', 'rb') as f:
    encodeurs = pickle.load(f)
    label_encoder_marque = encodeurs['marque_encoder']
    label_encoder_etat = encodeurs['etat_encoder']


app = Flask(__name__)

CORS(app)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/predict', methods=['POST'])
def pred():
    # Parse JSON payload
    data = request.get_json()

    # Extract the necessary fields
    nouvelle_marque = [data.get('brand', 'Apple')]  # Default to 'Apple' if not provided
    nouvel_etat = [data.get('condition', 'Occasion')]  # Default to 'Occasion' if not provided

    # Encode the data
    marque_encoded = label_encoder_marque.transform(nouvelle_marque)
    etat_encoded = label_encoder_etat.transform(nouvel_etat)

    # Prepare data for prediction
    X_nouvelles_donnees = [[marque_encoded[0], etat_encoded[0]]]

    # Predict using the model
    y_pred = modele_charge.predict(X_nouvelles_donnees)

    # Return the prediction result as JSON
    return jsonify({"price": str(y_pred[0])})
