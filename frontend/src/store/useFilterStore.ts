import { create } from 'zustand'
import { EIngredientType, ESeason, type IngredientType, type Season } from '../data/types'

interface FilterState {
  proteinFilter: IngredientType
  seasonFilter: Season
  setProteinFilter: (filter: IngredientType) => void
  setSeasonFilter: (season: Season) => void
}

export const useFilterStore = create<FilterState>()(set => ({
  proteinFilter: EIngredientType.ANY,
  seasonFilter: ESeason.ALL,
  setProteinFilter: proteinFilter => set({ proteinFilter }),
  setSeasonFilter: seasonFilter => set({ seasonFilter }),
}))
