"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Smartphone, Loader2 } from "lucide-react"

export default function Result() {
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch("http://localhost:5000/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            brand: "Apple",
            condition: "Bon état"
          })
        })

        if (!response.ok) {
          throw new Error("Erreur lors de la requête")
        }

        const data = await response.json()
        if (data.price) {
          setEstimatedPrice(Number(data.price))
        }
      } catch (error) {
        console.error("Erreur:", error)
        setEstimatedPrice(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPrice()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 pt-16 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
            <Smartphone className="mr-2" />
            Résultat de l'estimation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center text-xl text-center"
            >
              <Loader2 className="mr-2 animate-spin" />
              Chargement de l'estimation...
            </motion.div>
          ) : estimatedPrice !== null ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-xl mb-2">Le prix estimé de votre téléphone est :</p>
              <p className="text-4xl font-bold text-green-600">{estimatedPrice.toFixed(2)} €</p>
            </motion.div>
          ) : (
            <p className="text-xl text-center">Aucune estimation disponible. Veuillez remplir le formulaire.</p>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/">
              <Button className="w-full">
                <ArrowLeft className="mr-2" />
                Retour au formulaire
              </Button>
            </Link>
          </motion.div>
        </CardContent>
      </Card>
    </main>
  )
}
