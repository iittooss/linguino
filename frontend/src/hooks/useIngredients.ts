import { useMemo } from 'react';
import { 
  PROTEINS, 
  VEGETABLES, 
  STARCHES, 
  ACCOMPANIMENTS, 
  IngredientType, 
  Season 
} from '../data/ingredients';

const TYPE_ORDER = {
  [IngredientType.VEGAN]: 0,
  [IngredientType.VEGE]: 1,
  [IngredientType.FLEXI]: 2,
  [IngredientType.ANY]: 3,
};

const SEASON_ORDER = {
  [Season.PRINTEMPS]: 0,
  [Season.ETE]: 1,
  [Season.AUTOMNE]: 2,
  [Season.HIVER]: 3,
  [Season.TOUTES]: 4,
};

export const useFilteredProteins = (filter: IngredientType, selectedId?: string) => {
  return useMemo(() => {
    const base = filter === IngredientType.ANY 
      ? PROTEINS 
      : PROTEINS.filter(p => p.type === filter);
    
    return [...base].sort((a, b) => {
      // 1. Selection priority
      if (selectedId === a.id) return -1;
      if (selectedId === b.id) return 1;
      
      // 2. Type priority
      const typeA = a.type || IngredientType.ANY;
      const typeB = b.type || IngredientType.ANY;
      if (TYPE_ORDER[typeA] !== TYPE_ORDER[typeB]) {
        return TYPE_ORDER[typeA] - TYPE_ORDER[typeB];
      }
      
      // 3. Name priority
      return a.name.localeCompare(b.name);
    });
  }, [filter, selectedId]);
};

export const useFilteredVegetables = (season: Season, selectedId?: string) => {
  return useMemo(() => {
    const base = season === Season.TOUTES
      ? VEGETABLES
      : VEGETABLES.filter(v => v.seasons?.includes(season));

    return [...base].sort((a, b) => {
      // 1. Selection priority
      if (selectedId === a.id) return -1;
      if (selectedId === b.id) return 1;

      // 2. Season priority (based on the first season if multiple)
      const seasonA = a.seasons?.[0] || Season.TOUTES;
      const seasonB = b.seasons?.[0] || Season.TOUTES;
      if (SEASON_ORDER[seasonA] !== SEASON_ORDER[seasonB]) {
        return SEASON_ORDER[seasonA] - SEASON_ORDER[seasonB];
      }

      // 3. Name priority
      return a.name.localeCompare(b.name);
    });
  }, [season, selectedId]);
};

export const useSortedStarches = (selectedId?: string) => {
  return useMemo(() => {
    return [...STARCHES].sort((a, b) => {
      if (selectedId === a.id) return -1;
      if (selectedId === b.id) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [selectedId]);
};

export const useSortedAccompaniments = (selectedIds: string[]) => {
  return useMemo(() => {
    return [...ACCOMPANIMENTS].sort((a, b) => {
      const aSelected = selectedIds.includes(a.id);
      const bSelected = selectedIds.includes(b.id);
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [selectedIds]);
};
