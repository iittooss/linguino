import { Group, Stack, Text, SegmentedControl, Center, rem } from '@mantine/core';
import { useRecipeStore } from '../store/useRecipeStore';
import { IngredientType, Season } from '../data/types';
import {
    IconSeedling,
    IconEgg,
    IconMeat,
    IconInfinity,
    IconLeaf,
    IconSun,
    IconWind,
    IconSnowflake,
    IconCalendar
} from '@tabler/icons-react';

export const GlobalFilterBar = () => {
    const proteinFilter = useRecipeStore((s) => s.proteinFilter);
    const setProteinFilter = useRecipeStore((s) => s.setProteinFilter);
    const seasonFilter = useRecipeStore((s) => s.seasonFilter);
    const setSeasonFilter = useRecipeStore((s) => s.setSeasonFilter);

    return (
        <Group justify="center" gap="xl" wrap="wrap">
            <Stack gap={4} align="center">
                <Text size="xs" fw={700} c="dimmed" tt="uppercase">Régime</Text>
                <SegmentedControl
                    value={proteinFilter}
                    onChange={(value) => setProteinFilter(value as IngredientType)}
                    data={[
                        {
                            value: IngredientType.ANY,
                            label: (
                                <Center style={{ gap: 10 }}>
                                    <IconInfinity style={{ width: rem(16), height: rem(16) }} />
                                    <span>Tous</span>
                                </Center>
                            ),
                        },
                        {
                            value: IngredientType.VEGAN,
                            label: (
                                <Center style={{ gap: 10 }}>
                                    <IconSeedling style={{ width: rem(16), height: rem(16) }} />
                                    <span>Végan</span>
                                </Center>
                            ),
                        },
                        {
                            value: IngredientType.VEGE,
                            label: (
                                <Center style={{ gap: 10 }}>
                                    <IconEgg style={{ width: rem(16), height: rem(16) }} />
                                    <span>Végé</span>
                                </Center>
                            ),
                        },
                        {
                            value: IngredientType.FLEXI,
                            label: (
                                <Center style={{ gap: 10 }}>
                                    <IconMeat style={{ width: rem(16), height: rem(16) }} />
                                    <span>Flexi</span>
                                </Center>
                            ),
                        },
                    ]}
                    radius="md"
                    size="sm"
                    color="blue"
                    className="shadow-sm"
                />
            </Stack>

            <Stack gap={4} align="center">
                <Text size="xs" fw={700} c="dimmed" tt="uppercase">Saison</Text>
                <SegmentedControl
                    value={seasonFilter}
                    onChange={(value) => setSeasonFilter(value as Season)}
                    data={[
                        {
                            value: Season.TOUTES,
                            label: (
                                <Center style={{ gap: 10 }}>
                                    <IconCalendar style={{ width: rem(16), height: rem(16) }} />
                                    <span>Toutes</span>
                                </Center>
                            ),
                        },
                        {
                            value: Season.PRINTEMPS,
                            label: (
                                <Center style={{ gap: 10 }}>
                                    <IconLeaf style={{ width: rem(16), height: rem(16) }} />
                                    <span>Printemps</span>
                                </Center>
                            ),
                        },
                        {
                            value: Season.ETE,
                            label: (
                                <Center style={{ gap: 10 }}>
                                    <IconSun style={{ width: rem(16), height: rem(16) }} />
                                    <span>Été</span>
                                </Center>
                            ),
                        },
                        {
                            value: Season.AUTOMNE,
                            label: (
                                <Center style={{ gap: 10 }}>
                                    <IconWind style={{ width: rem(16), height: rem(16) }} />
                                    <span>Automne</span>
                                </Center>
                            ),
                        },
                        {
                            value: Season.HIVER,
                            label: (
                                <Center style={{ gap: 10 }}>
                                    <IconSnowflake style={{ width: rem(16), height: rem(16) }} />
                                    <span>Hiver</span>
                                </Center>
                            ),
                        },
                    ]}
                    radius="md"
                    size="sm"
                    color="blue"
                    className="shadow-sm"
                />
            </Stack>
        </Group>
    );
};
