"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

interface GitHubProfile {
  avatar_url: string
  name: string
  login: string
  bio: string
  public_repos: number
  followers: number
}

const GITHUB_USERNAMES = [
  "Florian-DAUVERGNE",
  "amiraydin",
  "Thibaut-Longchamps",
  "NithuSiva",
  "Quthbulhameed"
]

export default function About() {
  const [profiles, setProfiles] = useState<GitHubProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all(
      GITHUB_USERNAMES.map(username =>
        fetch(`https://api.github.com/users/${username}`)
          .then(response => response.json())
      )
    )
      .then(data => {
        setProfiles(data)
        setLoading(false)
      })
      .catch(error => {
        console.error("Error fetching GitHub profiles:", error)
        setLoading(false)
      })
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 pt-16 flex flex-col items-center justify-center p-4 space-y-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Nos profils GitHub</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {loading ? (
            // Afficher plusieurs skeletons pendant le chargement
            Array(GITHUB_USERNAMES.length).fill(0).map((_, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            ))
          ) : (
            profiles.map((profile, index) => (
              <a href={`https://github.com/${profile.login}`} key={index} className="flex flex-col items-center space-y-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={profile.avatar_url} alt={profile.name} />
                  <AvatarFallback>{profile.name}</AvatarFallback>

                </Avatar>
                <p className="text-xs text-gray-500">@{profile.login}</p>
              </a>
            ))
          )}
        </CardContent>

        <CardContent className="space-y-4">
          <p>
            NeuraPrice est une plateforme innovante d&apos;estimation de prix utilisant des modèles d&apos;intelligence
            artificielle avancés pour vous fournir des estimations précises et fiables.
          </p>
          <p>
            Notre technologie analyse de multiples paramètres pour différents types de biens (téléphones, ordinateurs
            portables, biens immobiliers et plus encore). 
          </p>
          <p>
            Chaque estimation est basée sur des modèles spécifiques entraînés sur des données récentes du marché.
          </p>
          <p>

            Que vous soyez un particulier souhaitant connaître la valeur de vos biens ou un professionnel recherchant
            des estimations fiables, NeuraPrice vous accompagne dans votre prise de décision.
          </p>
          <p>
            Veuillez noter que les estimations fournies sont à titre indicatif et peuvent varier en fonction des
            conditions du marché local et d&apos;autres facteurs spécifiques non pris en compte dans nos modèles.
          </p>
        </CardContent>
      </Card>
    </main>
  )
}

