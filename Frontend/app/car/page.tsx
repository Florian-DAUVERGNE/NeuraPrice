"use client";

import DynamicForm from "@/components/basic/DynamicForm";
import { Car } from "lucide-react";
import FormField from "@/types/FormField.interface";
import PhoneFormData from "@/types/PhoneFormData.interface";
//import { Brand,Conditions } from "@/types/enums/phone.enum";
import { useFormSubmit } from "@/hooks/useFormSubmit";


const marque = ['Tesla', 'Hyundai', 'BMW', 'Peugeot', 'Renault', 'Dacia', 'Mercedes', 'Toyota', 'Porsche', 'Citroen', 'Kia', 'Nissan',
  'Volkswagen', 'Ford', 'Audi']

const carburants = ['Electrique', 'Diesel', 'Gaz', 'Essence', 'Hybride']
const boites_vitesse = ["Manuelle", "Automatique"]

const critaires_air = ['Euro 1', 'Euro 3', 'Euro 6', 'Euro 4', 'Euro 5']

const couleurs = ['Bleu', 'Noir', 'Gris', 'Blanc', 'Rouge']

const pays = ['Japon', 'USA', 'Espagne', 'France', 'Allemagne', 'Italie']

const types= ['Break', 'SUV', 'Monospace', 'Crossover', 'Berline']






export default function PhoneForm() {
  const { handleFormSubmit } = useFormSubmit();

  const fields: FormField[] = [
    {
      name: "Marque",
      label: "Marque",
      type: "select",
      placeholder: "Sélectionnez la marque",
      options: marque,
      required: true,
    },
    {
      name: "Km",
      label: "Kilométrage",
      type: "input",
      placeholder: "Saisissez le kilométrage",
      required: true,
    },
    {
      name: "Carburant",
      label: "Carburant",
      type: "select",
      placeholder: "Sélectionnez le carburant",
      options: carburants,
      required: true,
    },
    {
      name: "Boite_vitesse",
      label: "Boite de vitesse",
      type: "select",
      placeholder: "Sélectionnez la boite de vitesse",
      options: boites_vitesse,
      required: true,
    },
    {
      name: "Puissance",
      label: "Puissance",
      type: "input",
      placeholder: "Saisissez la puissance",
      required: true,
    },    

    {
      name: "Critere_air",
      label: "Critere'air",
      type: "select",
      placeholder: "Saisissez le critere'air",
      options: critaires_air,
      required: true,
    },
    {
      name: "Couleur",
      label: "Couleur",
      type: "select",
      placeholder: "Saisissez la couleur",
      options: couleurs,
      required: true,

    },
    {
      name: "Type_vehicule",
      label: "Type de vehicule",
      type: "select",
      placeholder: "Saisissez le type de vehicule",
      options: types,
      required: true,
    },
    {
      name: "Pays",
      label: "Pays d'origine",
      type: "select",
      placeholder: "Saisissez le pays d'origine",
      options: pays,
      required: true,
    },
    {
      name: "age",
      label: "Age",
      type: "input",
      placeholder: "Saisissez l'age",
      required: true,
    },


  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 pt-16 flex items-center justify-center p-4">
      <DynamicForm
        Icon={Car}
        title="Estimez le prix de votre voiture"
        fields={fields}
        onSubmit={(data: PhoneFormData) => handleFormSubmit(data, fields)}
      />

    </main>
  );
}
