import pickle
from flask import request, jsonify

def predict():
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