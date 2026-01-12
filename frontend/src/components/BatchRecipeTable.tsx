import {
    Table,
    Paper,
    Title,
    Center,
    Button,
    Tooltip,
    Group,
    Text,
    UnstyledButton,
    Stack,
    ActionIcon
} from '@mantine/core';
import { IconPlus, IconMoodSmile, IconRotateClockwise2 } from '@tabler/icons-react';
import { useRecipeStore } from '../store/useRecipeStore';
import { isProteinTypeAllowed, isSeasonAllowed } from '../utils/ingredientUtils';
import { BatchTableRow } from './BatchTableRow';

export const BatchRecipeTable = () => {
    const batchRecipes = useRecipeStore((s) => s.batchRecipes);
    const proteinFilter = useRecipeStore((s) => s.proteinFilter);
    const seasonFilter = useRecipeStore((s) => s.seasonFilter);
    const addOne = useRecipeStore((s) => s.addBatchRecipe);
    const generateBatch = useRecipeStore((s) => s.generateBatchRecipes);
    const fixCol = useRecipeStore((s) => s.fixBatchColumn);

    if (batchRecipes.length === 0) {
        return (
            <Paper withBorder p="xl" radius="lg" shadow="sm" className="mt-8">
                <Center py={50}>
                    <Stack align="center" gap="md">
                        <IconMoodSmile size={64} color="var(--mantine-color-blue-3)" />
                        <Title order={3} c="gray.7">Aucun repas planifié pour le moment</Title>
                        <Text c="dimmed" ta="center">Commencez par générer une semaine de repas ou ajoutez-en un manuellement.</Text>
                        <Group mt="md">
                            <Button
                                size="lg"
                                variant="filled"
                                color="teal"
                                leftSection={<IconPlus size={22} />}
                                onClick={() => generateBatch(7)}
                            >
                                Générer 7 repas
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                color="blue"
                                leftSection={<IconPlus size={22} />}
                                onClick={addOne}
                            >
                                Ajouter un repas
                            </Button>
                        </Group>
                    </Stack>
                </Center>
            </Paper>
        );
    }

    const hasInvalidProtein = batchRecipes.some(m => !isProteinTypeAllowed(proteinFilter, m.protein.type));
    const hasInvalidVegetable = batchRecipes.some(m => !isSeasonAllowed(seasonFilter, m.vegetable.seasons));

    return (
        <Paper withBorder p="xl" radius="lg" shadow="sm" className="mt-8">
            <Group justify="space-between" mb="lg">
                <Title order={2} size="h3" c="blue.8">
                    Planification des Repas ({batchRecipes.length})
                </Title>
                <Button
                    leftSection={<IconPlus size={18} />}
                    variant="light"
                    color="blue"
                    onClick={addOne}
                >
                    Ajouter un repas
                </Button>
            </Group>

            <Table highlightOnHover withColumnBorders verticalSpacing="sm" layout="fixed">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w={60} style={{ textAlign: 'center' }}>Plat</Table.Th>
                        <Table.Th w="21%">
                            <Group gap="xs" wrap="nowrap">
                                <Text size="sm" fw={700}>Protéine</Text>
                                {hasInvalidProtein && (
                                    <Tooltip label="Corriger les incohérences de régime" position="top" withArrow>
                                        <ActionIcon size="sm" variant="filled" color="orange" onClick={() => fixCol('protein')} radius="xl">
                                            <IconRotateClockwise2 size={12} />
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                            </Group>
                        </Table.Th>
                        <Table.Th w="21%">
                            <Group gap="xs" wrap="nowrap">
                                <Text size="sm" fw={700}>Légume</Text>
                                {hasInvalidVegetable && (
                                    <Tooltip label="Corriger les légumes hors saison" position="top" withArrow>
                                        <ActionIcon size="sm" variant="filled" color="orange" onClick={() => fixCol('vegetable')} radius="xl">
                                            <IconRotateClockwise2 size={12} />
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                            </Group>
                        </Table.Th>
                        <Table.Th w="21%">Féculent</Table.Th>
                        <Table.Th w="21%">Accompagnements</Table.Th>
                        <Table.Th w={100}>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {batchRecipes.map((meal) => (
                        <BatchTableRow key={meal.id} meal={meal} />
                    ))}
                    <Table.Tr>
                        <Table.Td colSpan={6} p={0}>
                            <UnstyledButton
                                onClick={addOne}
                                w="100%"
                                py="md"
                                style={{
                                    textAlign: 'center',
                                    backgroundColor: 'var(--mantine-color-blue-0)',
                                    transition: 'background-color 0.2s ease',
                                    cursor: 'pointer'
                                }}
                                className="hover:bg-blue-50"
                            >
                                <Group justify="center" gap="xs">
                                    <IconPlus size={20} color="var(--mantine-color-blue-6)" />
                                    <Text fw={600} c="blue.7">Ajouter un repas à la liste</Text>
                                </Group>
                            </UnstyledButton>
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </Paper>
    );
};
