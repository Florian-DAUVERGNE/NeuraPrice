"use client"
import { Phone, Home, FileText, Laptop } from "lucide-react"
import HomePageCard from "@/components/basic/HomePageCard";

export default function FormCards() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-pink-600 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-white animate-fade-in">Nos Formulaires</h1>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <HomePageCard content="Remplissez notre formulaire pour obtenir une estimation précise de la valeur de votre téléphone." description="Évaluez le prix de votre téléphone" title="Téléphone" href="/phone" Icon={Phone}></HomePageCard>
          
          <HomePageCard content="Découvrez la valeur de votre bien immobilier avec notre outil d&apos;estimation." description="Estimez votre bien immobilier" title="Immobilier" href="/realestate" Icon={Home}></HomePageCard>

          <HomePageCard content="" description="" title="" href="/laptop" Icon={Laptop}></HomePageCard>
          
          <HomePageCard content="Accédez à nos autres services d&apos;estimation et d&apos;évaluation." description="Autres services d&apos;évaluation" title="Autre Estimation" href="/" Icon={FileText}></HomePageCard>

          <HomePageCard content="Accédez à nos autres services d&apos;estimation et d&apos;évaluation." description="Autres services d&apos;évaluation" title="Autre Estimation" href="/" Icon={FileText}></HomePageCard>

          
        </div>
      </div>
    </div>
  )
}

