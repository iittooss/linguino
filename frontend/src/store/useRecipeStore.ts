import { create } from 'zustand';
import { 
  PROTEINS, 
  VEGETABLES, 
  STARCHES, 
  IngredientType, 
  Season, 
  type Ingredient 
} from '../data/ingredients';

export interface GeneratedMeal {
  id: string;
  protein: Ingredient;
  vegetable: Ingredient;
  starch: Ingredient;
}

interface RecipeState {
  proteinFilter: IngredientType;
  seasonFilter: Season;
  selectedRecipe: {
    protein: Ingredient | null;
    vegetable: Ingredient | null;
    starch: Ingredient | null;
  };
  selectedAccompaniments: Ingredient[];
  batchRecipes: GeneratedMeal[];
  
  // Actions
  setProteinFilter: (filter: IngredientType) => void;
  setSeasonFilter: (season: Season) => void;
  setSelectedProtein: (p: Ingredient) => void;
  setSelectedVegetable: (v: Ingredient) => void;
  setSelectedStarch: (s: Ingredient) => void;
  toggleAccompaniment: (acc: Ingredient) => void;
  generateRecipe: () => void;
  generateBatchRecipes: (count: number) => void;
  removeBatchRecipe: (id: string) => void;
}

export const useRecipeStore = create<RecipeState>((set, get) => ({
  proteinFilter: IngredientType.ANY,
  seasonFilter: Season.TOUTES,
  selectedRecipe: {
    protein: null,
    vegetable: null,
    starch: null,
  },
  selectedAccompaniments: [],
  batchRecipes: [],

  setProteinFilter: (proteinFilter: IngredientType) => set({ proteinFilter }),
  setSeasonFilter: (seasonFilter: Season) => set({ seasonFilter }),
  
  setSelectedProtein: (protein: Ingredient) => set((state: RecipeState) => ({ 
    selectedRecipe: { ...state.selectedRecipe, protein } 
  })),
  
  setSelectedVegetable: (vegetable: Ingredient) => set((state: RecipeState) => ({ 
    selectedRecipe: { ...state.selectedRecipe, vegetable } 
  })),
  
  setSelectedStarch: (starch: Ingredient) => set((state: RecipeState) => ({ 
    selectedRecipe: { ...state.selectedRecipe, starch } 
  })),
  
  toggleAccompaniment: (acc: Ingredient) => set((state: RecipeState) => {
    const isSelected = state.selectedAccompaniments.some((a: Ingredient) => a.id === acc.id);
    return {
      selectedAccompaniments: isSelected 
        ? state.selectedAccompaniments.filter((a: Ingredient) => a.id !== acc.id)
        : [...state.selectedAccompaniments, acc]
    };
  }),

  generateRecipe: () => {
    const { proteinFilter, seasonFilter } = get();
    
    const filteredProteins = proteinFilter === IngredientType.ANY 
      ? PROTEINS 
      : PROTEINS.filter((p: Ingredient) => p.type === proteinFilter);
      
    const filteredVegetables = seasonFilter === Season.TOUTES
      ? VEGETABLES
      : VEGETABLES.filter((v: Ingredient) => v.seasons?.includes(seasonFilter));

    const protein = filteredProteins[Math.floor(Math.random() * filteredProteins.length)];
    const vegetable = filteredVegetables[Math.floor(Math.random() * filteredVegetables.length)];
    const starch = STARCHES[Math.floor(Math.random() * STARCHES.length)];

    set({ selectedRecipe: { protein, vegetable, starch } });
  },

  generateBatchRecipes: (count: number) => {
    const { proteinFilter, seasonFilter } = get();
    
    const filteredProteins = proteinFilter === IngredientType.ANY 
      ? PROTEINS 
      : PROTEINS.filter((p: Ingredient) => p.type === proteinFilter);
      
    const filteredVegetables = seasonFilter === Season.TOUTES
      ? VEGETABLES
      : VEGETABLES.filter((v: Ingredient) => v.seasons?.includes(seasonFilter));

    const newMeals: GeneratedMeal[] = Array.from({ length: count }).map(() => ({
      id: Math.random().toString(36).substr(2, 9),
      protein: filteredProteins[Math.floor(Math.random() * filteredProteins.length)],
      vegetable: filteredVegetables[Math.floor(Math.random() * filteredVegetables.length)],
      starch: STARCHES[Math.floor(Math.random() * STARCHES.length)],
    }));

    set(state => ({ batchRecipes: [...state.batchRecipes, ...newMeals] }));
  },

  removeBatchRecipe: (id: string) => set(state => ({
    batchRecipes: state.batchRecipes.filter(m => m.id !== id)
  }))
}));
