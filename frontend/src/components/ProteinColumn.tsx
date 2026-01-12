import { IconMeat } from '@tabler/icons-react';
import { useRecipeStore } from '../store/useRecipeStore';
import { useFilteredProteins } from '../hooks/useIngredients';
import { IngredientCard } from './IngredientCard';
import { ProteinIconBadge } from './ProteinIconBadge';
import { IngredientColumnShell } from './IngredientColumnShell';
import type { Ingredient } from '../data/types';

export const ProteinColumn = () => {
    const proteinFilter = useRecipeStore((s) => s.proteinFilter);
    const selectedProtein = useRecipeStore((s) => s.selectedRecipe.protein);
    const setSelectedProtein = useRecipeStore((s) => s.setSelectedProtein);

    const proteins = useFilteredProteins(proteinFilter, selectedProtein?.id);

    return (
        <IngredientColumnShell
            title="Protéines"
            icon={<IconMeat size={20} />}
            color="red"
        >
            {proteins.map((p: Ingredient) => (
                <IngredientCard
                    key={p.id}
                    ingredient={p}
                    isSelected={selectedProtein?.id === p.id}
                    onClick={() => setSelectedProtein(p)}
                >
                    {p.type && <ProteinIconBadge type={p.type} size={14} />}
                </IngredientCard>
            ))}
        </IngredientColumnShell>
    );
};
