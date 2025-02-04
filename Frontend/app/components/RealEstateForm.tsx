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
    deposit_rate: number;
    lagged_CPI: number;
    volatility_value: number;
    month: number;
    year: number;
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
    {
      name: "deposit_rate",
      label: "taux de dépôt des banques à la banque centrale",
      type: "input",
      placeholder: "Sélectionnez l'emplacement",
      //options: deposit_rate,
      required: true,
    },
    {
      name: "indice des prix à la consommation",
      label: "tendance des prix",
      type: "input",
      placeholder: "Sélectionnez l'emplacement",
      //options: lagged_CPI,
      required: true,
    },
    {
      name: "volatility_value",
      label: "tendance des prix",
      type: "input",
      placeholder: "Sélectionnez l'emplacement",
      //options: volatility_value,
      required: true,
    },
    {
      name: "month",
      label: "mois en cours (nombre)",
      type: "input",
      placeholder: "Sélectionnez l'emplacement",
      //options: month,
      required: true,
    },
    {
      name: "year",
      label: "Année en cours (nombre)",
      type: "input",
      placeholder: "Sélectionnez l'emplacement",
      //options: year,
      required: true,
    }
  ];

  const handleFormSubmit = (data: RealEstateFormData) => {
    if (!data.price_direction || !data.City || !data.num_rooms_categorical || !data.isExclusiveness || !data.isNew || !data.livingArea || !data.zipCode || !data.deposit_rate || !data.lagged_CPI || !data.volatility_value || !data.month || !data.year)  {
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
