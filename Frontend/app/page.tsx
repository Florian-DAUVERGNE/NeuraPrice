"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { Phone, Home, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FormCards() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-pink-600 p-8">
            <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-white animate-fade-in">Nos Formulaires</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <Link href="/phone" className="group transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            <Card className="h-full transition-shadow duration-300 group-hover:shadow-xl">
              <CardHeader>
                <Phone className="mb-2 h-8 w-8 text-purple-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <CardTitle className="transition-colors duration-300 group-hover:text-purple-600">Téléphone</CardTitle>
                <CardDescription>Évaluez le prix de votre téléphone</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Remplissez notre formulaire pour obtenir une estimation précise de la valeur de votre téléphone.
                </p>
              </CardContent>
            </Card>
          </Link>
          </motion.div>
  
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
          <Link href="/realestate" className="group transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            <Card className="h-full transition-shadow duration-300 group-hover:shadow-xl">
              <CardHeader>
                <Home className="mb-2 h-8 w-8 text-purple-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <CardTitle className="transition-colors duration-300 group-hover:text-purple-600">Immobilier</CardTitle>
                <CardDescription>Estimez votre bien immobilier</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Découvrez la valeur de votre bien immobilier avec notre outil d&apos;estimation.
                </p>
              </CardContent>
            </Card>
          </Link>
          </motion.div>


          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }}>
          <Link href="/forms/autre" className="group transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            <Card className="h-full transition-shadow duration-300 group-hover:shadow-xl">
              <CardHeader>
                <FileText className="mb-2 h-8 w-8 text-purple-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <CardTitle className="transition-colors duration-300 group-hover:text-purple-600">
                  Autre Estimation
                </CardTitle>
                <CardDescription>Autres services d&apos;évaluation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Accédez à nos autres services d&apos;estimation et d&apos;évaluation.
                </p>
              </CardContent>
            </Card>
          </Link>
          </motion.div>
        </div>
      </div>
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center text-3xl font-bold text-white animate-fade-in"></div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }}>
          <Link href="/forms/autre" className="group transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            <Card className="h-full transition-shadow duration-300 group-hover:shadow-xl">
              <CardHeader>
                <FileText className="mb-2 h-8 w-8 text-purple-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <CardTitle className="transition-colors duration-300 group-hover:text-purple-600">
                  Autre Estimation
                </CardTitle>
                <CardDescription>Autres services d&apos;évaluation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Accédez à nos autres services d&apos;estimation et d&apos;évaluation.
                </p>
              </CardContent>
            </Card>
          </Link>
          </motion.div>
  
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }}>
          <Link href="/forms/autre" className="group transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            <Card className="h-full transition-shadow duration-300 group-hover:shadow-xl">
              <CardHeader>
                <FileText className="mb-2 h-8 w-8 text-purple-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <CardTitle className="transition-colors duration-300 group-hover:text-purple-600">
                  Autre Estimation
                </CardTitle>
                <CardDescription>Autres services d&apos;évaluation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Accédez à nos autres services d&apos;estimation et d&apos;évaluation.
                </p>
              </CardContent>
            </Card>
          </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }}>
          <Link href="/forms/autre" className="group transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            <Card className="h-full transition-shadow duration-300 group-hover:shadow-xl">
              <CardHeader>
                <FileText className="mb-2 h-8 w-8 text-purple-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <CardTitle className="transition-colors duration-300 group-hover:text-purple-600">
                  Autre Estimation
                </CardTitle>
                <CardDescription>Autres services d&apos;évaluation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Accédez à nos autres services d&apos;estimation et d&apos;évaluation.
                </p>
              </CardContent>
            </Card>
          </Link>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

