export const IngredientType = {
  VEGAN: 'vegan',
  VEGE: 'vege',
  FLEXI: 'flexi',
  ANY: 'any'
} as const;
export type IngredientType = typeof IngredientType[keyof typeof IngredientType];

export const Season = {
  PRINTEMPS: 'printemps',
  ETE: 'été',
  AUTOMNE: 'automne',
  HIVER: 'hiver',
  TOUTES: 'toutes'
} as const;
export type Season = typeof Season[keyof typeof Season];

export const IngredientCategory = {
  PROTEIN: 'protein',
  VEGETABLE: 'vegetable',
  STARCH: 'starch',
  ACCOMPANIMENT: 'accompaniment'
} as const;
export type IngredientCategory = typeof IngredientCategory[keyof typeof IngredientCategory];

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  type?: IngredientType;
  seasons?: Season[];
}

export interface GeneratedMeal {
  id: string;
  protein: Ingredient;
  vegetable: Ingredient;
  starch: Ingredient;
  accompaniments: Ingredient[];
}
