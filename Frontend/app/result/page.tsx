"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Smartphone, Loader2, CircleHelp, House,Laptop, Car } from "lucide-react";

function ResultContent() {
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchPrice = async () => {
      const allParams: { [key: string]: string } = {};

      searchParams.forEach((value, key) => {
        if( value.toLocaleUpperCase() == "OUI" ){
          value = "true"
        }

        if( value.toLocaleUpperCase() ==  "NON" ){
          value = "false"
        }

        allParams[key] = value;
      });

      

      const endpoint = allParams["endpoint"];
      if (!endpoint) {
        setError("Le paramètre 'endpoint' est manquant.");
        setIsLoading(false);
        return;
      }

      delete allParams["endpoint"];

      try {
        const response = await fetch(`http://localhost:5000/predict/${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ allParams }),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la requête");
        }

        const data = await response.json();
        if (data.price) {
          setEstimatedPrice(Number(data.price));
        } else {
          setEstimatedPrice(null);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Une erreur inconnue s'est produite.");
        setEstimatedPrice(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrice();
  }, [searchParams]);

  const endpoint = searchParams.get("endpoint");
  let icon = <CircleHelp className="mr-2" />;

  switch (endpoint) {
    case "phone":
      icon = <Smartphone className="mr-2" />;
      break;

    case "realestate":
      icon = <House className="mr-2" />;
      break;

    case "laptop":
      icon = <Laptop className="mr-2" />;
      break;

    case "car":
      icon = <Car className="mr-2" />;
      break;


    default:
      break;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 pt-16 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
            {icon}
            Résultat de l&apos;estimation
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
              Chargement de l&apos;estimation...
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center text-red-600"
            >
              <p className="text-xl">{error}</p>
            </motion.div>
          ) : estimatedPrice !== null ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-xl mb-2">Le prix estimé est :</p>
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
            <Link href={`/${endpoint || ""}`}>
              <Button className="w-full">
                <ArrowLeft className="mr-2" />
                Retour au formulaire
              </Button>
            </Link>
          </motion.div>
        </CardContent>
      </Card>
    </main>
  );
}

export default function Result() {
  return (
    <Suspense fallback={<div>Chargement de la page...</div>}>
      <ResultContent />
    </Suspense>
  );
}
