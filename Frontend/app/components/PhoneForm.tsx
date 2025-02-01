"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Smartphone, DollarSign } from "lucide-react"

export default function PhoneForm() {
  const brands = ["Poco", "Motorola", "Apple", "Redmi", "OnePlus", "Vivo", "Nokia", "Samsung", "Lava", "Realme", "Micromax", "Infinix", "Kechaoda", "Jio", "Itel", "Nothing", "Tecno", "Cellecor", "TARA", "Karbonn",  "Oppo", "IQOO", "GFive", "Google", "MTR", "Snexian", "BlackZone", "I",  "Vox", "IAIR", "HOTLINE", "SIAVANTAGE", "Lvix", "ringme", "Honor", "DIZO", "UiSmart", "FONEME", "SAREGAMA", "Huawei", "LG", "Xiaomi", "Sony",  "Lenovo",   "Asus", "Cat", "HTC", "Yu",  "Nubia", "Black Shark", "Coolpad", "Smartron", "LeEco", "BlackBerry", "Gionee", "Meizu", "Panasonic", "InFocus",  "10.or", "Lyf", "Intex", "Xolo", "Acer", "Phicomm",  "Spice", "iVoomi", "Kult", "Nuu Mobile", "Ziox", "Zopo", "ZTE", "Onida", "Microsoft", "iBall", "Mobiistar", "Comio", "Videocon", "Alcatel", "Reach", "Zen", "Tambo", "Razer", "Homtom", "Lephone", "Aqua", "Celkon", "Jivi", "Billion", "Swipe", "M-tech", "Sansui", "Zuk", "TCL", "mPhone", "Blu", "HP", "Philips", "Archos", "Ulefone", "AGM", "Astro", "Rezone", "Blackview", "Bravis",  "UMIDIGI", "Assistant", "Crosscall", "Sharp", "ERGO", "DOOGEE", "Oukitel", "Cubot", "S-TELL", "Sigma mobile", "Bluboo", "2E", "Fly", "Prestigio", "myPhone", "KENEKSI", "Maxcom",  "Vernee", "General", "Globex", "Smartex",  "Land", "MAFAM", "Jinga", "Vodafone", "iOutdoor", "Elephone", "Viaan", "LEAGOO", "Nomi"];
  const conditions = ["Neuf","Bon état","Occasion"]
  
  const endpoint = "phone"
  
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    router.push(`/result?endpoint=${endpoint}&brand=${brand}&condition=${condition}`);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
          <Smartphone className="mr-2" />
          Estimez le prix de votre téléphone
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Label htmlFor="brand" className="text-lg">Marque</Label>
            <Select value={brand} onValueChange={setBrand} required>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Sélectionnez la marque" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((b, index) => (
                  <SelectItem key={index} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <Label htmlFor="condition" className="text-lg">État</Label>
            <Select value={condition} onValueChange={setCondition} required>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Sélectionnez l'état" />
              </SelectTrigger>
              <SelectContent>
                {conditions.map((b, index) => (
                  <SelectItem key={index} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <Button type="submit" className="w-full">
              <DollarSign className="mr-2" />
              Estimer le prix
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  );
}

