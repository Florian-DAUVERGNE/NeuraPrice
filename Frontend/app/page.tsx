import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-800 via-pink-500 to-red-500 pt-16 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">À propos de PhonePricer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          Accueil
        </CardContent>
      </Card>
    </main>
  )
}

