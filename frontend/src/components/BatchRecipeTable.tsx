import { Table, ActionIcon, Paper, Title, Center } from '@mantine/core';
import { IconTrash, IconToolsKitchen2 } from '@tabler/icons-react';
import { useRecipeStore } from '../store/useRecipeStore';

export const BatchRecipeTable = () => {
    const batchRecipes = useRecipeStore((s) => s.batchRecipes);
    const removeRecipe = useRecipeStore((s) => s.removeBatchRecipe);

    if (batchRecipes.length === 0) {
        return null;
    }

    const rows = batchRecipes.map((meal) => (
        <Table.Tr key={meal.id}>
            <Table.Td>
                <Center>
                    <IconToolsKitchen2 size={20} color="var(--mantine-color-blue-6)" />
                </Center>
            </Table.Td>
            <Table.Td fw={500}>{meal.protein.name}</Table.Td>
            <Table.Td>{meal.vegetable.name}</Table.Td>
            <Table.Td>{meal.starch.name}</Table.Td>
            <Table.Td>
                <ActionIcon
                    color="red"
                    variant="subtle"
                    onClick={() => removeRecipe(meal.id)}
                    title="Supprimer ce repas"
                >
                    <IconTrash size={18} />
                </ActionIcon>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Paper withBorder p="xl" radius="lg" shadow="sm" className="mt-8">
            <Title order={2} size="h3" mb="lg" c="blue.8">
                Planification des Repas ({batchRecipes.length})
            </Title>

            <Table highlightOnHover withColumnBorders verticalSpacing="sm">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w={60} style={{ textAlign: 'center' }}>Plat</Table.Th>
                        <Table.Th>Protéine</Table.Th>
                        <Table.Th>Légume</Table.Th>
                        <Table.Th>Féculent</Table.Th>
                        <Table.Th w={80}>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Paper>
    );
};
