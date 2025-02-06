"use client"
import DynamicForm from "@/components/basic/DynamicForm";
import { House } from "lucide-react";
import FormField from "@/types/FormField.interface"
import RealEstateFormData from "@/types/RealestateFormData.interface"
import { City, NumRoomsCategorical, PriceDirection,IsExclusiveness,IsNew } from "@/types/enums/realestate.enum";
import { useFormSubmit } from "@/hooks/useFormSubmit";

export default function RealEstateForm() {
  const { handleFormSubmit } = useFormSubmit();

  const fields: FormField[] = [
    {
      name: "price_direction",
      label: "évolution du prix",
      type: "select",
      placeholder: "Sélectionnez l'emplacement",
      options: Object.values(PriceDirection),
      required: true,
    },
    {
      name: "City",
      label: "Ville du bien",
      type: "select",
      placeholder: "Sélectionnez l'emplacement",
      options: Object.values(City),
      required: true,
    },
    {
      name: "num_rooms_categorical",
      label: "estimation catégorielle du nombre de chambre",
      type: "select",
      placeholder: "Sélectionnez l'emplacement",
      options: Object.values(NumRoomsCategorical),
      required: true,
    },
    {
      name: "isExclusiveness",
      label: "Le bien est-il exclusif ?",
      type: "select",
      placeholder: "Sélectionnez l'emplacement",
      options: Object.values(IsExclusiveness),
      required: true,
    },
    {
      name: "isNew",
      label: "L'annonce est-elle récente ?",
      type: "select",
      placeholder: "Sélectionnez l'emplacement",
      options: Object.values(IsNew),
      required: true,
    },
    {
      name: "livingArea",
      label: "Surface habitable du bien",
      type: "input",
      placeholder: "Sélectionnez l'emplacement",
      // options: livingArea,
      required: true,
    },
    {
      name: "zipCode",
      label: "Code postal du bien",
      type: "input",
      placeholder: "Sélectionnez l'emplacement",
      //options: zipCode,
      required: true,
    },
  ];

  return  <main className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 pt-16 flex items-center justify-center p-4">
<DynamicForm Icon={House}  title="Estimez le prix de votre immobillier" fields={fields} onSubmit={(data: RealEstateFormData) => handleFormSubmit(data, fields)} /></main>
}

