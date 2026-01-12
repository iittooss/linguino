import { IconChefHat } from '@tabler/icons-react';
import { useRecipeStore } from '../store/useRecipeStore';
import { useSortedAccompaniments } from '../hooks/useIngredients';
import { IngredientCard } from './IngredientCard';
import { IngredientColumnShell } from './IngredientColumnShell';
import type { Ingredient } from '../data/types';

export const AccompanimentColumn = () => {
    const selectedAccompaniments = useRecipeStore((s) => s.selectedAccompaniments);
    const toggleAccompaniment = useRecipeStore((s) => s.toggleAccompaniment);

    const selectedIds = selectedAccompaniments.map(a => a.id);
    const accompaniments = useSortedAccompaniments(selectedIds);

    return (
        <IngredientColumnShell
            title="Accompagnements"
            icon={<IconChefHat size={20} />}
            color="indigo"
        >
            {accompaniments.map((a: Ingredient) => (
                <IngredientCard
                    key={a.id}
                    ingredient={a}
                    isSelected={selectedIds.includes(a.id)}
                    onClick={() => toggleAccompaniment(a)}
                />
            ))}
        </IngredientColumnShell>
    );
};
