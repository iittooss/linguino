import { useMemo } from 'react'
import { ACCOMPANIMENTS, PROTEINS, STARCHES, VEGETABLES } from '../data/ingredients'
import { EIngredientType, ESeason, type Ingredient, type IngredientType, type Season } from '../data/types'
import { isProteinTypeAllowed, SEASON_ORDER, TYPE_ORDER } from '../utils/ingredientUtils'

export const useFilteredProteins = (filter: IngredientType, selectedId?: string) => {
  return useMemo(() => {
    const base = PROTEINS.filter((p: Ingredient) => isProteinTypeAllowed(filter, p.type))

    return [...base].sort((a, b) => {
      if (selectedId === a.id) return -1
      if (selectedId === b.id) return 1
      // 1. Selection priority

      // 2. Type priority
      const typeA = a.type || EIngredientType.ANY
      const typeB = b.type || EIngredientType.ANY
      if (TYPE_ORDER[typeA] !== TYPE_ORDER[typeB]) {
        return TYPE_ORDER[typeA] - TYPE_ORDER[typeB]
      }

      // 3. Name priority
      return a.name.localeCompare(b.name)
    })
  }, [filter, selectedId])
}

export const useFilteredVegetables = (season: Season, selectedId?: string) => {
  return useMemo(() => {
    const base = season === ESeason.ALL ? VEGETABLES : VEGETABLES.filter((v: Ingredient) => v.seasons?.includes(season))

    return [...base].sort((a, b) => {
      if (selectedId === a.id) return -1
      if (selectedId === b.id) return 1
      // 1. Selection priority

      // 2. Season priority (based on the first season if multiple)
      const seasonA = a.seasons?.[0] || ESeason.ALL
      const seasonB = b.seasons?.[0] || ESeason.ALL
      if (SEASON_ORDER[seasonA as keyof typeof SEASON_ORDER] !== SEASON_ORDER[seasonB as keyof typeof SEASON_ORDER]) {
        return SEASON_ORDER[seasonA as keyof typeof SEASON_ORDER] - SEASON_ORDER[seasonB as keyof typeof SEASON_ORDER]
      }

      // 3. Name priority
      return a.name.localeCompare(b.name)
    })
  }, [season, selectedId])
}

export const useSortedStarches = (selectedId?: string) => {
  return useMemo(() => {
    return [...STARCHES].sort((a, b) => {
      if (selectedId === a.id) return -1
      if (selectedId === b.id) return 1
      return a.name.localeCompare(b.name)
    })
  }, [selectedId])
}

export const useSortedAccompaniments = (selectedIds: string[]) => {
  return useMemo(() => {
    return [...ACCOMPANIMENTS].sort((a, b) => {
      const aSelected = selectedIds.includes(a.id)
      const bSelected = selectedIds.includes(b.id)
      if (aSelected && !bSelected) return -1
      if (!aSelected && bSelected) return 1
      return a.name.localeCompare(b.name)
    })
  }, [selectedIds])
}
