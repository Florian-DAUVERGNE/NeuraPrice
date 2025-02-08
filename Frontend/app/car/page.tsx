"use client";

import DynamicForm from "@/components/basic/DynamicForm";
import { Car } from "lucide-react";
import FormField from "@/types/FormField.interface";

import CarFormData from "@/types/CarFormData.interface";
import { Marque, Carburant, BoiteVitesse, CritaireAir, Couleur, Pays, TypeVehicule } from "@/types/enums/car.enum";
import { useFormSubmit } from "@/hooks/useFormSubmit";

export default function PhoneForm() {
  const { handleFormSubmit } = useFormSubmit();

  const fields: FormField[] = [
    {
      name: "Marque",
      label: "Marque",
      type: "select",
      placeholder: "Sélectionnez la marque",
      options: Object.values(Marque),
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
      options: Object.values(Carburant),
      required: true,
    },
    {
      name: "Boite_vitesse",
      label: "Boite de vitesse",
      type: "select",
      placeholder: "Sélectionnez la boite de vitesse",
      options:  Object.values(BoiteVitesse),
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
      options: Object.values(CritaireAir),
      required: true,
    },
    {
      name: "Couleur",
      label: "Couleur",
      type: "select",
      placeholder: "Saisissez la couleur",
      options: Object.values(Couleur),
      required: true,

    },
    {
      name: "Type_vehicule",
      label: "Type de vehicule",
      type: "select",
      placeholder: "Saisissez le type de vehicule",
      options: Object.values(TypeVehicule),
      required: true,
    },
    {
      name: "Pays",
      label: "Pays d'origine",
      type: "select",
      placeholder: "Saisissez le pays d'origine",
      options: Object.values(Pays),
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
        onSubmit={(data: CarFormData) => handleFormSubmit(data, fields)}
      />

    </main>
  );
}
