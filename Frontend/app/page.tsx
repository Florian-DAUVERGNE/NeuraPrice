"use client"
import { Phone, Home, FileText, Laptop, Car } from "lucide-react"
import HomePageCard from "@/components/basic/HomePageCard";

export default function FormCards() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-pink-600 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-white animate-fade-in">Nos Formulaires</h1>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <HomePageCard 
            content="Obtenez une estimation instantanée de votre smartphone, notre algorithme analyse les caractéristiques pour une évaluation précise." 
            description="Estimation gratuite en quelques clics" 
            title="Téléphones" 
            href="/phone" 
            Icon={Phone}
          />
          
          <HomePageCard 
            content="Évaluez la valeur de votre bien immobilier en tenant compte des tendances du marché, de la localisation et des caractéristiques spécifiques de votre propriété." 
            description="Analyse immobilière détaillée" 
            title="Immobilier" 
            href="/realestate" 
            Icon={Home}
          />

          <HomePageCard 
            content="Déterminez la valeur de votre ordinateur portable ou fixe en fonction de ses spécifications techniques, son état et la demande du marché actuel." 
            description="Évaluation technique précise" 
            title="Ordinateurs" 
            href="/laptop" 
            Icon={Laptop}
          />
          
          <HomePageCard 
            content="Obtenez une estimation fiable de votre véhicule basée sur le modèle, l'année, le kilométrage et l'état général." 
            description="Estimation automobile personnalisée" 
            title="Voitures" 
            href="/car" 
            Icon={Car}
          />
          
          <HomePageCard 
            content="Découvrez notre gamme complète de services d'estimation. Des experts qualifiés pour évaluer tous types de biens et d'objets de valeur." 
            description="Solutions d'évaluation sur mesure" 
            title="Autre Estimation" 
            href="/" 
            Icon={FileText}
          />

        </div>
      </div>
    </div>
  )
}

