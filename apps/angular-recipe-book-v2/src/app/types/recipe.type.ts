import { Ingredient } from "./ingredient.type"

export type Recipe = {
  id: number
  name: string
  photoUrl: string
  description: string
  ingredients: Ingredient[]
}
