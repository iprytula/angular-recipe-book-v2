import { Ingredient } from "./ingredient.interface"

export interface Recipe {
  id: number
  name: string
  photoUrl: string
  description: string
  ingredients: Ingredient[]
}
