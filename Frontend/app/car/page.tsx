"use client";

import DynamicForm from "@/components/basic/DynamicForm";
import { Car } from "lucide-react";
import FormField from "@/types/FormField.interface";
import PhoneFormData from "@/types/PhoneFormData.interface";
import { Brand,Conditions } from "@/types/enums/phone.enum";
import { useFormSubmit } from "@/hooks/useFormSubmit";

export default function PhoneForm() {
  const { handleFormSubmit } = useFormSubmit();

  const fields: FormField[] = [
    {
      name: "brand",
      label: "Marque",
      type: "select",
      placeholder: "Sélectionnez la marque",
      options: Object.values(Brand),
      required: true,
    },
    {
      name: "condition",
      label: "État",
      type: "select",
      placeholder: "Sélectionnez l'état",
      options: Object.values(Conditions),
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
