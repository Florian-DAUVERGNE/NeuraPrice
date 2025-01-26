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
import { estimatePhonePrice } from "../actions"

export default function PhoneForm() {
  const router = useRouter()
  const [brand, setBrand] = useState("")
  const [model, setModel] = useState("")
  const [age, setAge] = useState("")
  const [condition, setCondition] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("brand", brand)
    formData.append("model", model)
    formData.append("age", age)
    formData.append("condition", condition)

    await estimatePhonePrice(formData)
    router.push("/result")
  }

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
            <Label htmlFor="brand" className="text-lg">
              Marque
            </Label>
            <Input id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} required className="mt-1" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Label htmlFor="model" className="text-lg">
              Modèle
            </Label>
            <Input id="model" value={model} onChange={(e) => setModel(e.target.value)} required className="mt-1" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Label htmlFor="age" className="text-lg">
              Âge (en années)
            </Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="mt-1"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Label htmlFor="condition" className="text-lg">
              État
            </Label>
            <Select value={condition} onValueChange={setCondition} required>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Sélectionnez l'état" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="neuf">Neuf</SelectItem>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="bon">Bon</SelectItem>
                <SelectItem value="moyen">Moyen</SelectItem>
                <SelectItem value="mauvais">Mauvais</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button type="submit" className="w-full">
              <DollarSign className="mr-2" />
              Estimer le prix
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  )
}
