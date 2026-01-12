import { Group, Select, Tooltip, ActionIcon } from '@mantine/core';
import { IconAlertTriangle, IconRefresh } from '@tabler/icons-react';
import { type Ingredient, IngredientCategory } from '../data/types';
import { getFilteredIngredients } from '../utils/ingredientUtils';
import { useRecipeStore } from '../store/useRecipeStore';

interface BatchIngredientCellProps {
    ingredient: Ingredient;
    category: IngredientCategory;
    isValid: boolean;
    invalidLabel: string;
    onUpdate: (val: Ingredient) => void;
    onReroll: () => void;
}

export const BatchIngredientCell = ({
    ingredient,
    category,
    isValid,
    invalidLabel,
    onUpdate,
    onReroll
}: BatchIngredientCellProps) => {
    const proteinFilter = useRecipeStore((s) => s.proteinFilter);
    const seasonFilter = useRecipeStore((s) => s.seasonFilter);

    const availableIngredients = getFilteredIngredients(category, proteinFilter, seasonFilter);

    return (
        <Group gap="xs" wrap="nowrap">
            {!isValid && (
                <Tooltip label={invalidLabel} position="top" withArrow color="orange">
                    <IconAlertTriangle size={16} color="orange" style={{ flexShrink: 0 }} />
                </Tooltip>
            )}
            <Select
                size="xs"
                data={availableIngredients.map(i => ({ value: i.id, label: i.name }))}
                value={ingredient.id}
                onChange={(val) => {
                    const found = availableIngredients.find(i => i.id === val);
                    if (found) onUpdate(found);
                }}
                searchable
                variant="unstyled"
                styles={{
                    input: {
                        fontWeight: 500,
                        padding: 0,
                        color: isValid ? 'inherit' : 'var(--mantine-color-orange-7)'
                    },
                    root: { flex: 1 }
                }}
            />
            <ActionIcon size="sm" variant="subtle" color="gray" onClick={onReroll}>
                <IconRefresh size={14} />
            </ActionIcon>
        </Group>
    );
};
