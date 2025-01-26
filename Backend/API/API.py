from flask import Flask
import pickle
import pandas as pd

# Charger le modèle
with open('modele_telephone.pkl', 'rb') as f:
    modele_charge = pickle.load(f)

# Charger les encodeurs
with open('encodeurs.pkl', 'rb') as f:
    encodeurs = pickle.load(f)
    label_encoder_marque = encodeurs['marque_encoder']
    label_encoder_etat = encodeurs['etat_encoder']


app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/predict")
# Utiliser le modèle pour faire des prédictions
def pred():
    # Exemple de nouvelles données
    nouvelle_marque = ['Apple']  # Exemple de nouvelle marque
    nouvel_etat = ['Occasion']  # Exemple de nouvel état

    # Encoder les nouvelles données
    marque_encoded = label_encoder_marque.transform(nouvelle_marque)
    etat_encoded = label_encoder_etat.transform(nouvel_etat)

    # Créer le tableau des caractéristiques avec les variables encodées
    X_nouvelles_donnees = [[marque_encoded[0], etat_encoded[0]]]  # Exemple avec une ligne de données

    # Prédire avec le modèle
    y_pred = modele_charge.predict(X_nouvelles_donnees)

    return str(y_pred)