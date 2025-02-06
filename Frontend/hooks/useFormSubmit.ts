import { useRouter, usePathname } from "next/navigation";

interface FormField {
  name: string;
  required?: boolean;
  label: string;
}

export function useFormSubmit() {
  const router = useRouter();
  const pathname = usePathname();
  
  // Récupère le dernier segment de l'URL comme endpoint
  const endpoint = pathname?.split("/").filter(Boolean).pop() || "default";

  const handleFormSubmit = <T extends object>(data: T, fields: FormField[]) => {
    // Vérification des champs requis
    const missingFields = fields
      .filter((field) => field.required && !data[field.name as keyof T])
      .map((field) => field.label);

    if (missingFields.length > 0) {
      alert(`Merci de remplir les champs suivants : ${missingFields.join(", ")}`);
      return;
    }

    // Création des paramètres d'URL
    const queryParams = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

    // Redirection
    router.push(`/result?endpoint=${endpoint}&${queryParams.toString()}`);
  };

  return { handleFormSubmit };
} 