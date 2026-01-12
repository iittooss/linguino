import { 
  type Ingredient, 
  IngredientType, 
  Season, 
  IngredientCategory 
} from '../data/types';
import { PROTEINS, VEGETABLES, STARCHES } from '../data/ingredients';

export const TYPE_ORDER = {
  [IngredientType.VEGAN]: 0,
  [IngredientType.VEGE]: 1,
  [IngredientType.FLEXI]: 2,
  [IngredientType.ANY]: 3,
};

export const SEASON_ORDER = {
  [Season.PRINTEMPS]: 0,
  [Season.ETE]: 1,
  [Season.AUTOMNE]: 2,
  [Season.HIVER]: 3,
  [Season.TOUTES]: 4,
};

export const isProteinTypeAllowed = (filter: IngredientType, proteinType?: IngredientType) => {
  if (filter === IngredientType.ANY) return true;
  if (!proteinType) return true;
  return TYPE_ORDER[proteinType] <= TYPE_ORDER[filter];
};

export const isSeasonAllowed = (filter: Season, seasons?: Season[]) => {
  if (filter === Season.TOUTES) return true;
  if (!seasons) return true;
  return seasons.includes(filter);
};

export const getFilteredIngredients = (
  category: IngredientCategory, 
  proteinFilter: IngredientType, 
  seasonFilter: Season
): Ingredient[] => {
  switch (category) {
    case IngredientCategory.PROTEIN:
      return PROTEINS.filter(p => isProteinTypeAllowed(proteinFilter, p.type));
    case IngredientCategory.VEGETABLE:
      return VEGETABLES.filter(v => isSeasonAllowed(seasonFilter, v.seasons));
    case IngredientCategory.STARCH:
      return STARCHES;
    default:
      return [];
  }
};

export const getRandomIngredient = (
  category: IngredientCategory, 
  proteinFilter: IngredientType, 
  seasonFilter: Season
): Ingredient => {
  const filtered = getFilteredIngredients(category, proteinFilter, seasonFilter);
  return filtered[Math.floor(Math.random() * filtered.length)];
};
