"use server"

export async function estimatePhonePrice(formData: FormData) {
  const brand = formData.get("brand") as string
  const model = formData.get("model") as string
  const age = Number.parseInt(formData.get("age") as string)
  const condition = formData.get("condition") as string

  // Ici, vous pouvez implémenter une logique plus complexe pour l'estimation du prix
  // Ceci est une estimation très simplifiée à titre d'exemple
  let basePrice = 500 // Prix de base arbitraire

  // Ajustement en fonction de la marque
  if (brand.toLowerCase() === "apple" || brand.toLowerCase() === "samsung") {
    basePrice += 200
  }

  // Ajustement en fonction de l'âge
  basePrice -= age * 50

  // Ajustement en fonction de l'état
  switch (condition) {
    case "neuf":
      break
    case "excellent":
      basePrice *= 0.9
      break
    case "bon":
      basePrice *= 0.8
      break
    case "moyen":
      basePrice *= 0.6
      break
    case "mauvais":
      basePrice *= 0.4
      break
  }

  // Assurez-vous que le prix ne soit pas négatif
  const estimatedPrice = Math.max(basePrice, 0)

  // Stockez le résultat dans une variable globale ou une base de données
  // Pour cet exemple, nous utiliserons localStorage côté client
  return estimatedPrice
}

