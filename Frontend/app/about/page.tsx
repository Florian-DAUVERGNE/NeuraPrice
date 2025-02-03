import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 pt-16 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">À propos de PhonePricer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            PhonePricer est un outil en ligne gratuit conçu pour vous aider à estimer rapidement et facilement la valeur
            de votre téléphone portable.
          </p>
          <p>
            Notre algorithme prend en compte divers facteurs tels que la marque, le modèle, l&apos;âge et l&apos;état de votre
            appareil pour fournir une estimation précise de sa valeur sur le marché actuel.
          </p>
          <p>
            Que vous envisagiez de vendre votre téléphone, de l&apos;échanger ou simplement de connaître sa valeur,
            PhonePricer est là pour vous guider.
          </p>
          <p>
            Veuillez noter que les estimations fournies sont à titre indicatif et peuvent varier en fonction des
            conditions du marché local et d&apos;autres facteurs spécifiques.
          </p>
        </CardContent>
      </Card>
    </main>
  )
}

