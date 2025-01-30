from flask import Flask,jsonify, request
import pickle
import pandas as pd
from flask_cors import CORS
import numpy as np

app = Flask(__name__)

CORS(app)

@app.route('/predict/phone', methods=['POST'])
def pred():

    # Charger le modèle
    with open('modele_telephone.pkl', 'rb') as f:
        modele_charge = pickle.load(f)
        
    # Charger les encodeurs
    with open('encodeurs.pkl', 'rb') as f:
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





@app.route('/predict/laptop', methods=['GET'])
def pred2():
    

# Charger le modèle entraîné depuis pickle
    with open('..\models\model_pipelineLaptop.pkl', 'rb') as f:
        pipe = pickle.load(f)

    # Spécification des caractéristiques du PC
    comp = 'MSI'  # Remplaçons par les données de votre exemple
    type = 'Gaming'  # Remplaçons par les données de votre exemple
    inch = 17.3  # Taille de l'écran en pouces
    xres = 1920  # Résolution X
    yres = 1080  # Résolution Y
    ips = 0  # Indiquer si c'est un écran IPS
    touchscreen = 0  # Indiquer si l'écran est tactile
    cpu = 'Intel Core i7'  # Nom du processeur
    cpufreq = 2.8  # Fréquence du processeur en GHz
    ram = 32  # Mémoire RAM en GB
    hdd = 500  # Disque dur en Go
    ssd = 0  # SSD en Go
    flash_storage = 0  # Stockage flash en Go
    gpu = 'Nvidia'  # Carte graphique
    os = 'Windows 10'  # Système d'exploitation
    weight = 2.8  # Poids en kg

    # Créer un dictionnaire avec les données
    dict_for_df = {
                    'Company': comp,
                    'TypeName': type,
                    'Inches': inch,
                    'Gpu': gpu,
                    'Touchscreen': touchscreen,
                    'Ips': ips,
                    'X_res': xres,
                    'Y_res': yres,
                    'CPU Name': cpu,
                    'CPU Freq (GHz)': cpufreq,
                    'RAM (GB)': ram,
                    'HDD': hdd,
                    'SSD': ssd,
                    'Flash Storage': flash_storage,
                    'OS': os,
                    'Weight (kg)': weight
                }

    # Convertir le dictionnaire en dataframe
    df = pd.DataFrame(dict_for_df, index=[0])

    # Vérification du DataFrame
    print("Données pour la prédiction :")
    print(df)

    # Prédiction du prix du laptop en utilisant le modèle
    price_pred_raw = pipe.predict(df)  # Prédiction du modèle sans appliquer np.exp()
    print(f"Prix brut prédit (sans np.exp): {price_pred_raw}")

    # Si tu as appliqué une transformation log lors de l'entraînement du modèle, inverse-la avec np.exp()
    price_pred = np.exp(price_pred_raw)[0]  # np.exp() appliqué sur la prédiction du modèle

    print(f"Prix final prédit (après inversement du log): {price_pred}")

        
           
    
    return jsonify({"price": str(price_pred_raw)})

