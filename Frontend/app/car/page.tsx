"use client";

import DynamicForm from "@/components/basic/DynamicForm";
import { Car } from "lucide-react";
import FormField from "@/types/FormField.interface";
import PhoneFormData from "@/types/PhoneFormData.interface";
//import { Brand,Conditions } from "@/types/enums/phone.enum";
import { useFormSubmit } from "@/hooks/useFormSubmit";


const marque = [
  "Renault",
  "Peugeot",
  "BMW",
  "Audi",
  "Mercedes",
  "Volkswagen",
  "Toyota",
  "Citroen",
  "Ford",
  "Tesla",
  "Dacia",
  "Hyundai",
  "Kia",
  "Kia",
  "Porsche",
  "Nissan"
]

const carburants = ["Essence", "Diesel", "Electrique", "Hybride"]
const boites_vitesse = ["Manuelle", "Automatique"]
//const types_vehicules = ["Berline", "Break", "SUV", "Coupé", "Monospace", "Pick-up"]
//const pays_origine = ["France", "Allemagne", "Suede", "Italie", "Espagne", "Belgique", "Royaume-Uni", "Autriche"]
//const couleurs = ["Noir", "Blanc", "Gris", "Bleu", "Rouge", "Vert", "Jaune", "Argent", "Orange"]
//const critaires_air = ["Euro 4", "Euro 5", "Euro 6", "Euro 6", "Euro 7", "Euro 8"]
//const classes_co2 = ["A", "B", "C", "D", "E"]
const types_puissance = ["65", "75", "90", "95", "110", "120", "130", "150", "200"]
//const n_places = ["2", "5", "7"]





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
      type: "select",
      placeholder: "Saisissez la puissance",
      options: types_puissance,
      required: true,
    },    

    {
      name: "Critere_air",
      label: "Critere'air",
      type: "select",
      placeholder: "Saisissez le critere'air",
      required: true,


    },
    {
      name: "Couleur",
      label: "Couleur",
      type: "select",
      placeholder: "Saisissez la couleur",
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
