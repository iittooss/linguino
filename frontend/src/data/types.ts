export const EIngredientType = {
  ANY: 'any',
  FLEXI: 'flexi',
  VEGAN: 'vegan',
  VEGE: 'vege',
} as const
export type IngredientType = (typeof EIngredientType)[keyof typeof EIngredientType]

export const ESeason = {
  ALL: 'all',
  FALL: 'fall',
  PRINTEMPS: 'spring',
  SUMMER: 'summer',
  WINTER: 'winter',
} as const
export type Season = (typeof ESeason)[keyof typeof ESeason]

export const IngredientCategory = {
  ACCOMPANIMENT: 'accompaniment',
  PROTEIN: 'protein',
  STARCH: 'starch',
  VEGETABLE: 'vegetable',
} as const
export type IngredientCategory = (typeof IngredientCategory)[keyof typeof IngredientCategory]

export interface Ingredient {
  id: string
  name: string
  category: IngredientCategory
  type?: IngredientType
  seasons?: Season[]
}

export interface GeneratedMeal {
  id: string
  protein: Ingredient
  vegetable: Ingredient
  starch: Ingredient
  accompaniments: Ingredient[]
}
