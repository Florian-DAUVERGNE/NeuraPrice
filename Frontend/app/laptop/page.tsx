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


const comp = ['Apple', 'HP', 'Acer', 'Asus', 'Dell', 'Lenovo', 'Chuwi', 'MSI',
  'Microsoft', 'Toshiba', 'Huawei', 'Xiaomi', 'Vero', 'Razer',
  'Mediacom', 'Samsung', 'Google', 'Fujitsu', 'LG']

const type = ['Ultrabook', 'Notebook', 'Netbook', 'Gaming', '2 in 1 Convertible',
  'Workstation']

const resolution = ['2560x1600', '1440x900', '1920x1080', '2880x1800', '1366x768',
  '2304x1440', '3200x1800', '1920x1200', '2256x1504', '3840x2160',
  '2160x1440', '2560x1440', '1600x900', '2736x1824', '2400x1600']

const cpu = ['Intel Core i5', 'Intel Core i7', 'AMD A-Series', 'Intel Core i3',
  'Intel Core M', 'Intel Atom', 'AMD E-Series', 'Intel Celeron Dual',
  'AMD Processor', 'Intel Pentium Quad', 'Intel Processor']

const os = ['Mac', 'No OS', 'Windows 10', 'Mac X', 'Linux', 'Android',
  'Windows 10 S', 'Chrome OS', 'Windows 7']

const gpu = ['Intel', 'AMD', 'Nvidia']



interface LaptopSpecs {
  comp: string; // Brand of the laptop
  type: string; // Type of usage, e.g., Gaming, Work, etc.
  inch: number; // Screen size in inches
  res: string; // Screen resolution 
  cpu: string; // Processor model
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
      options: comp,
      required: true,
    },
    {
      name: "TypeName",
      label: "Type",
      type: "select",
      placeholder: "Entrez le type",
      options: type,
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
      options: gpu,
      required: true,

    },
    {
      name: "resolution",
      label: "Résolution",
      type: "select",
      placeholder: "Entrez la résolution",
      options: resolution,
      required: true,

    },
    {
      name: "CPU Name",
      label: "Processeur",
      type: "select",
      placeholder: "Entrez le processeur",
      options: cpu,
      required: true,

    },
    {
      name: "OS",
      label: "Système d'exploitation",
      type: "select",
      placeholder: "Entrez le système d'exploitation",
      options: os,
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
