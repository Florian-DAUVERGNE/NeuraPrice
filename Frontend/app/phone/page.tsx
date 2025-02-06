"use client";
import { useRouter, usePathname } from "next/navigation";
import DynamicForm from "@/components/basic/DynamicForm";
import { Smartphone } from "lucide-react";
import FormField from "@/types/FormField.interface";
import PhoneFormData from "@/types/PhoneFormData.interface";
import { Brand,Conditions } from "@/types/enums/phone.enum";

export default function PhoneForm() {
  const router = useRouter();
  const pathname = usePathname();

  // Récupère le dernier segment de l'URL comme endpoint
  const endpoint = pathname?.split("/").filter(Boolean).pop() || "default";

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

  const handleFormSubmit = (data: PhoneFormData) => {
    const missingFields = fields
      .filter((field) => field.required && !data[field.name as keyof PhoneFormData])
      .map((field) => field.label);

    if (missingFields.length > 0) {
      alert(`Merci de remplir les champs suivants : ${missingFields.join(", ")}`);
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 pt-16 flex items-center justify-center p-4">
      <DynamicForm
        Icon={Smartphone}
        title="Estimez le prix de votre téléphone"
        fields={fields}
        onSubmit={handleFormSubmit}
      />
    </main>
  );
}
