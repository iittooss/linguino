import { Table, Center, Group, MultiSelect, Tooltip, ActionIcon } from '@mantine/core';
import { IconToolsKitchen2, IconRefresh, IconTrash } from '@tabler/icons-react';
import { type GeneratedMeal, IngredientCategory, type Ingredient } from '../data/types';
import { ACCOMPANIMENTS } from '../data/ingredients';
import { isProteinTypeAllowed, isSeasonAllowed } from '../utils/ingredientUtils';
import { useRecipeStore } from '../store/useRecipeStore';
import { BatchIngredientCell } from './BatchIngredientCell';

interface BatchTableRowProps {
    meal: GeneratedMeal;
}

export const BatchTableRow = ({ meal }: BatchTableRowProps) => {
    const removeRecipe = useRecipeStore((s) => s.removeBatchRecipe);
    const rerollRow = useRecipeStore((s) => s.rerollBatchRow);
    const rerollCol = useRecipeStore((s) => s.rerollBatchColumn);
    const updateRecipe = useRecipeStore((s) => s.updateBatchRecipe);
    const proteinFilter = useRecipeStore((s) => s.proteinFilter);
    const seasonFilter = useRecipeStore((s) => s.seasonFilter);

    const isProteinValid = isProteinTypeAllowed(proteinFilter, meal.protein.type);
    const isVegetableValid = isSeasonAllowed(seasonFilter, meal.vegetable.seasons);

    return (
        <Table.Tr>
            <Table.Td w={60}>
                <Center>
                    <IconToolsKitchen2 size={20} color="var(--mantine-color-blue-6)" />
                </Center>
            </Table.Td>

            <Table.Td w="21%">
                <BatchIngredientCell
                    ingredient={meal.protein}
                    category={IngredientCategory.PROTEIN}
                    isValid={isProteinValid}
                    invalidLabel="Non conforme au régime sélectionné"
                    onUpdate={(protein: Ingredient) => updateRecipe(meal.id, { protein })}
                    onReroll={() => rerollCol(meal.id, 'protein')}
                />
            </Table.Td>

            <Table.Td w="21%">
                <BatchIngredientCell
                    ingredient={meal.vegetable}
                    category={IngredientCategory.VEGETABLE}
                    isValid={isVegetableValid}
                    invalidLabel="Hors saison"
                    onUpdate={(vegetable: Ingredient) => updateRecipe(meal.id, { vegetable })}
                    onReroll={() => rerollCol(meal.id, 'vegetable')}
                />
            </Table.Td>

            <Table.Td w="21%">
                <BatchIngredientCell
                    ingredient={meal.starch}
                    category={IngredientCategory.STARCH}
                    isValid={true}
                    invalidLabel=""
                    onUpdate={(starch: Ingredient) => updateRecipe(meal.id, { starch })}
                    onReroll={() => rerollCol(meal.id, 'starch')}
                />
            </Table.Td>

            <Table.Td w="21%">
                <MultiSelect
                    size="xs"
                    placeholder="Accompagnements"
                    data={ACCOMPANIMENTS.map((a: Ingredient) => ({ value: a.id, label: a.name }))}
                    value={meal.accompaniments.map((a: Ingredient) => a.id)}
                    onChange={(newIds) => {
                        const selectedAccs = ACCOMPANIMENTS.filter((a: Ingredient) => newIds.includes(a.id));
                        updateRecipe(meal.id, { accompaniments: selectedAccs });
                    }}
                    searchable
                    hidePickedOptions
                    variant="unstyled"
                    styles={{
                        input: { fontSize: '12px', padding: 0 },
                        pill: { margin: '1px' }
                    }}
                />
            </Table.Td>

            <Table.Td w={100}>
                <Group gap={4} wrap="nowrap">
                    <Tooltip label="Relancer tout le repas" position="top" withArrow>
                        <ActionIcon
                            color="teal"
                            variant="subtle"
                            onClick={() => rerollRow(meal.id)}
                        >
                            <IconRefresh size={18} />
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Supprimer" position="top" withArrow>
                        <ActionIcon
                            color="red"
                            variant="subtle"
                            onClick={() => removeRecipe(meal.id)}
                        >
                            <IconTrash size={18} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Table.Td>
        </Table.Tr>
    );
};
