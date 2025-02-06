"use client";
import DynamicForm from "@/components/basic/DynamicForm";
import { Laptop } from "lucide-react";
import FormField from "@/types/FormField.interface";
import { useFormSubmit } from "@/hooks/useFormSubmit";
//import PhoneFormData from "@/types/PhoneFormData.interface";
/*import { Brand,Conditions } from "@/types/enums/phone/phone.enum";

const comp = 'MSI'
const type = 'Gaming'
const inch = 17.3
const xres = 1920  
const yres = 1080  
const ips = 0
const touchscreen = 0
const cpu = 'Intel Core i7'
const cpufreq = 2.8
const ram = 32
const hdd = 500
const ssd = 0
const flash_storage = 0
const gpu = 'Nvidia'
const os = 'Windows 10'
const weight = 2.8*/


interface LaptopSpecs {
  comp: string; // Brand of the laptop
  type: string; // Type of usage, e.g., Gaming, Work, etc.
  inch: number; // Screen size in inches
  xres: number; // Screen resolution width
  yres: number; // Screen resolution height
  ips: boolean; // Whether the display is IPS (true) or not (false)
  touchscreen: boolean; // Whether the screen is touchscreen (true) or not (false)
  cpu: string; // Processor model
  cpufreq: number; // Processor frequency in GHz
  ram: number; // RAM size in GB
  hdd: number; // HDD size in GB
  ssd: number; // SSD size in GB
  flash_storage: number; // Flash storage size in GB
  gpu: string; // Graphics card brand/model
  os: string; // Operating system
  weight: number; // Weight in kg
}

export default function LaptopForm() {
  const { handleFormSubmit } = useFormSubmit();

  const fields: FormField[] = [
    {
      name: "Company",
      label: "Marque",
      type: "select",
      placeholder: "Entrez la marque",
      options: ["MSI"],
      required: true,
    },
    {
      name: "TypeName",
      label: "Type",
      type: "select",
      placeholder: "Entrez le type",
      options: ["Gaming"],
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
      name: "X_res",
      label: "Résolution X",
      type: "input",
      placeholder: "Entrez la résolution horizontale",
      required: true,
    },
    {
      name: "Y_res",
      label: "Résolution Y",
      type: "input",
      placeholder: "Entrez la résolution verticale",
      required: true,
    },
    {
      name: "Ips",
      label: "Écran IPS",
      type: "select",
      placeholder: "ips",
      options: ["Oui","Non"],
      required: true,
    },
    {
      name: "Touchscreen",
      label: "Écran tactile",
      type: "select",
      placeholder: "",
      options: ["Oui","Non"],
      required: false,
    },
    {
      name: "CPU Name",
      label: "Processeur",
      type: "select",
      placeholder: "Entrez le processeur",
      options: ["Intel Core i7"],
      required: true,
    },
    {
      name: "CPU Freq (GHz)",
      label: "Fréquence CPU (GHz)",
      type: "input",
      placeholder: "Entrez la fréquence du processeur",
      required: true,
    },
    {
      name: "RAM (GB)",
      label: "Mémoire RAM (Go)",
      type: "input",
      placeholder: "Entrez la mémoire RAM",
      required: true,
    },
    {
      name: "HDD",
      label: "Stockage HDD (Go)",
      type: "input",
      placeholder: "Entrez la capacité HDD",
      required: true,
    },
    {
      name: "SSD",
      label: "Stockage SSD (Go)",
      type: "input",
      placeholder: "Entrez la capacité SSD",
      required: false,
    },
    {
      name: "Flash Storage",
      label: "Stockage Flash (Go)",
      type: "input",
      placeholder: "Entrez la capacité de stockage Flash",
      required: false,
    },
    {
      name: "Gpu",
      label: "Carte graphique",
      type: "select",
      placeholder: "Entrez la carte graphique",
      options: ["Nvidia"],
      required: true,
    },
    {
      name: "OS",
      label: "Système d'exploitation",
      type: "select",
      placeholder: "Entrez le système d'exploitation",
      options: ["Windows 10"],
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
