"use client"
import { useRouter } from "next/navigation";
import DynamicForm from "./DynamicForm";
import { House } from "lucide-react";
import FormField from "./FormField.interface"
 
const location = ["Paris"];

const energyClass = ["A","B","C","D","E","F","G"]

const endpoint = "realestate"

export default function RealEstateForm() {
  const router = useRouter();

  interface RealEstateFormData {
    location: string;
    energyClass: string;
  }

  const fields: FormField[] = [
    {
      name: "location",
      label: "Emplacement",
      type: "select",
      placeholder: "Sélectionnez l'emplacement",
      options: location,
      required: true,
    },
    {
      name: "energyClass",
      label: "classe énergétique",
      type: "select",
      placeholder: "Sélectionnez la classe énergétique",
      options: energyClass,
      required: true,
    }
  ];

  const handleFormSubmit = (data: RealEstateFormData) => {
    if (!data.location || !data.energyClass) {
      alert("Merci de remplir tous les champs !");
      return;
    }
    // Créer dynamiquement la chaîne de paramètres pour l'URL
    const queryParams = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });
  
    // Rediriger vers l'URL avec les paramètres
    router.push(`/result?endpoint=${endpoint}&${queryParams.toString()}`);
  };
  

  return  <DynamicForm Icon={House}  title="Estimez le prix de votre immobillier" fields={fields} onSubmit={handleFormSubmit} />
}
