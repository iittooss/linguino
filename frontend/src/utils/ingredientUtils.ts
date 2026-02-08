import { PROTEINS, STARCHES, VEGETABLES } from '../data/ingredients'
import {
  EIngredientCategory,
  EIngredientType,
  ESeason,
  type Ingredient,
  type IngredientCategory,
  type IngredientType,
  type Season,
} from '../data/types'

export const TYPE_ORDER = {
  [EIngredientType.VEGAN]: 0,
  [EIngredientType.VEGE]: 1,
  [EIngredientType.FLEXI]: 2,
  [EIngredientType.ANY]: 3,
}

export const SEASON_ORDER = {
  [ESeason.PRINTEMPS]: 0,
  [ESeason.SUMMER]: 1,
  [ESeason.FALL]: 2,
  [ESeason.WINTER]: 3,
  [ESeason.ALL]: 4,
}

export const isProteinTypeAllowed = (filter: IngredientType, proteinType?: IngredientType) => {
  if (filter === EIngredientType.ANY) return true
  if (!proteinType) return true
  return TYPE_ORDER[proteinType] <= TYPE_ORDER[filter]
}

export const isSeasonAllowed = (filter: Season, seasons?: Season[]) => {
  if (filter === ESeason.ALL) return true
  if (!seasons) return true
  return seasons.includes(filter)
}

export const getFilteredIngredients = (
  category: IngredientCategory,
  proteinFilter: IngredientType,
  seasonFilter: Season,
): Ingredient[] => {
  switch (category) {
    case EIngredientCategory.PROTEIN:
      return PROTEINS.filter(p => isProteinTypeAllowed(proteinFilter, p.type))
    case EIngredientCategory.VEGETABLE:
      return VEGETABLES.filter(v => isSeasonAllowed(seasonFilter, v.seasons))
    case EIngredientCategory.STARCH:
      return STARCHES
    default:
      return []
  }
}

export const getRandomIngredient = (
  category: IngredientCategory,
  proteinFilter: IngredientType,
  seasonFilter: Season,
): Ingredient => {
  const filtered = getFilteredIngredients(category, proteinFilter, seasonFilter)
  return filtered[Math.floor(Math.random() * filtered.length)]
}
