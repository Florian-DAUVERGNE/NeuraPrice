"use client"
import { useRouter } from "next/navigation";
import DynamicForm from "./DynamicForm";
import { House } from "lucide-react";
import FormField from "./FormField.interface"

  const price_direction = ['Stayed the same', 'Decreased', 'Increased']
  const City = ["Marseille", "Nantes", "Bordeaux", "Lyon", "Toulouse", "Asnieres-sur-Seine",
  "Boulogne-Billancourt", "Aix-en-Provence", "Toulon", "Perpignan", "Cergy-Pontoise",
  "Brest", "Rouen", "Montpellier", "Metz", "Avignon", "Nanterre", "Angers",
  "Argenteuil", "Caen", "Paris", "Amiens", "Orleans", "Grenoble",
  "Saint-Quentin-en-Yvelines", "Clermont-Ferrand", "Lille", "Tours", "Limoges",
  "Strasbourg", "Courbevoie", "Saint-Etienne", "Versailles", "Reims", "Nancy",
  "Nimes", "Dijon", "Besancon", "Le Havre", "Poitiers", "Saint-Denis",
  "Mulhouse", "Rennes", "Le Mans", "Roubaix", "Tourcoing"]
  const num_rooms_categorical = ['small', 'medium', 'large']
  const isExclusiveness = [false, true]
  const isNew = [false, true]

const endpoint = "realestate"

export default function RealEstateForm() {
  const router = useRouter();

  interface RealEstateFormData {
    price_direction: string;
    City: string;
    num_rooms_categorical: string;
    isExclusiveness: boolean;
    isNew: boolean;
    price_per_sq_m: number;
    livingArea: number;
    zipCode: number;
    lagged_CPI: number;
  }

  const fields: FormField[] = [
    {
      name: "price_direction",
      label: "évolution du prix",
      type: "select",
      placeholder: "Sélectionnez l'emplacement",
      options: price_direction,
      required: true,
    },
    {
      name: "City",
      label: "Ville du bien",
      type: "select",
      placeholder: "Sélectionnez l'emplacement",
      options: City,
      required: true,
    },
    {
      name: "num_rooms_categorical",
      label: "estimation catégorielle du nombre de chambre",
      type: "select",
      placeholder: "Sélectionnez l'emplacement",
      options: num_rooms_categorical,
      required: true,
    },
    {
      name: "isExclusiveness",
      label: "Le bien est-il exclusif ?",
      type: "select",
      placeholder: "Sélectionnez l'emplacement",
      options: isExclusiveness,
      required: true,
    },
    {
      name: "isNew",
      label: "L'annonce est-elle récente ?",
      type: "select",
      placeholder: "Sélectionnez l'emplacement",
      options: isNew,
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

  const handleFormSubmit = (data: RealEstateFormData) => {
    const missingFields = fields
      .filter(field => field.required && !data[field.name as keyof RealEstateFormData]) 
      .map(field => field.label); 
  
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
  

  return  <DynamicForm Icon={House}  title="Estimez le prix de votre immobillier" fields={fields} onSubmit={handleFormSubmit} />
}
