import { IconLeaf } from '@tabler/icons-react';
import { useRecipeStore } from '../store/useRecipeStore';
import { useFilteredVegetables } from '../hooks/useIngredients';
import { IngredientCard } from './IngredientCard';
import { SeasonIconBadge } from './SeasonIconBadge';
import { IngredientColumnShell } from './IngredientColumnShell';
import type { Ingredient } from '../data/types';

export const VegetableColumn = () => {
    const seasonFilter = useRecipeStore((s) => s.seasonFilter);
    const selectedVegetable = useRecipeStore((s) => s.selectedRecipe.vegetable);
    const setSelectedVegetable = useRecipeStore((s) => s.setSelectedVegetable);

    const vegetables = useFilteredVegetables(seasonFilter, selectedVegetable?.id);

    return (
        <IngredientColumnShell
            title="Légumes"
            icon={<IconLeaf size={20} />}
            color="teal"
        >
            {vegetables.map((v: Ingredient) => (
                <IngredientCard
                    key={v.id}
                    ingredient={v}
                    isSelected={selectedVegetable?.id === v.id}
                    onClick={() => setSelectedVegetable(v)}
                >
                    {v.seasons && v.seasons.map(s => (
                        <SeasonIconBadge key={s} season={s} size={14} />
                    ))}
                </IngredientCard>
            ))}
        </IngredientColumnShell>
    );
};
