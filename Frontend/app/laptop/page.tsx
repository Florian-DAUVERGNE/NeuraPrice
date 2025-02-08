"use client";
import DynamicForm from "@/components/basic/DynamicForm";
import { Laptop } from "lucide-react";
import FormField from "@/types/FormField.interface";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { LaptopSpecs } from "@/types/LaptopFormData.interface";
import { Company, LaptopType, Resolution, CPU, OS, GPU } from "@/types/enums/laptop.enum";

export default function LaptopForm() {
  const { handleFormSubmit } = useFormSubmit();


  const fields: FormField[] = [
    {
      name: "Company",
      label: "Marque",
      type: "select",
      placeholder: "Entrez la marque",
      options: Object.values(Company),
      required: true,
    },
    {
      name: "TypeName",
      label: "Type",
      type: "select",
      placeholder: "Entrez le type",
      options: Object.values(LaptopType),
      required: true,
    },
    {
      name: "Inches",
      label: "Taille de l'écran (pouces)",
      type: "input",
      placeholder: "Entrez la taille de l'écran",
      required: true,
    },
    {
      name: "Gpu",
      label: "Carte graphique",
      type: "select",
      placeholder: "Entrez la carte graphique",
      options: Object.values(GPU),
      required: true,
    },
    {
      name: "resolution",
      label: "Résolution",
      type: "select",
      placeholder: "Entrez la résolution",
      options: Object.values(Resolution),
      required: true,


    },
    {
      name: "CPU Name",
      label: "Processeur",
      type: "select",
      placeholder: "Entrez le processeur",
      options: Object.values(CPU),
      required: true,


    },
    {
      name: "OS",
      label: "Système d'exploitation",
      type: "select",
      placeholder: "Entrez le système d'exploitation",
      options: Object.values(OS),
      required: true,


    },
    {
      name: "Weight (kg)",
      label: "Poids (kg)",
      type: "input",
      placeholder: "Entrez le poids",
      required: true,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 pt-16 flex items-center justify-center p-4">
      <DynamicForm
        Icon={Laptop}
        title="Estimez le prix de votre ordinateur"
        fields={fields}
        onSubmit={(data: LaptopSpecs) => handleFormSubmit(data, fields)}
      />
    </main>
  );
}
