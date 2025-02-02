"use client"
import { useRouter } from "next/navigation";
import DynamicForm from "./DynamicForm";
import { Smartphone } from "lucide-react";

const brands = ["Poco", "Motorola", "Apple", "Redmi", "OnePlus", "Vivo", "Nokia", "Samsung", "Lava", "Realme", "Micromax", "Infinix", "Kechaoda", "Jio", "Itel", "Nothing", "Tecno", "Cellecor", "TARA", "Karbonn",  "Oppo", "IQOO", "GFive", "Google", "MTR", "Snexian", "BlackZone", "I",  "Vox", "IAIR", "HOTLINE", "SIAVANTAGE", "Lvix", "ringme", "Honor", "DIZO", "UiSmart", "FONEME", "SAREGAMA", "Huawei", "LG", "Xiaomi", "Sony",  "Lenovo",   "Asus", "Cat", "HTC", "Yu",  "Nubia", "Black Shark", "Coolpad", "Smartron", "LeEco", "BlackBerry", "Gionee", "Meizu", "Panasonic", "InFocus",  "10.or", "Lyf", "Intex", "Xolo", "Acer", "Phicomm",  "Spice", "iVoomi", "Kult", "Nuu Mobile", "Ziox", "Zopo", "ZTE", "Onida", "Microsoft", "iBall", "Mobiistar", "Comio", "Videocon", "Alcatel", "Reach", "Zen", "Tambo", "Razer", "Homtom", "Lephone", "Aqua", "Celkon", "Jivi", "Billion", "Swipe", "M-tech", "Sansui", "Zuk", "TCL", "mPhone", "Blu", "HP", "Philips", "Archos", "Ulefone", "AGM", "Astro", "Rezone", "Blackview", "Bravis",  "UMIDIGI", "Assistant", "Crosscall", "Sharp", "ERGO", "DOOGEE", "Oukitel", "Cubot", "S-TELL", "Sigma mobile", "Bluboo", "2E", "Fly", "Prestigio", "myPhone", "KENEKSI", "Maxcom",  "Vernee", "General", "Globex", "Smartex",  "Land", "MAFAM", "Jinga", "Vodafone", "iOutdoor", "Elephone", "Viaan", "LEAGOO", "Nomi"];

const conditions = ["Neuf","Bon état","Occasion"]

const endpoint = "phone"

export default function PhoneForm() {
  const router = useRouter();

  interface PhoneFormData {
    brand: string;
    condition: string;
  }

  const fields = [
    {
      name: "brand",
      label: "Marque",
      type: "select",
      placeholder: "Sélectionnez la marque",
      options: brands,
      required: true,
    },
    {
      name: "condition",
      label: "État",
      type: "select",
      placeholder: "Sélectionnez l'état",
      options: conditions,
      required: true,
    }
  ];

  const handleFormSubmit = (data: PhoneFormData) => {
    router.push(`/result?endpoint=${endpoint}&brand=${data.brand}&condition=${data.condition}`);
    return 0
  };

  return  <DynamicForm Icon={Smartphone}  title="Estimez le prix de votre téléphone" fields={fields} onSubmit={handleFormSubmit} />
}
