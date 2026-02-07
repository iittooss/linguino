import { Center, Group, rem, SegmentedControl, Stack, Text } from '@mantine/core'
import {
  IconCalendar,
  IconEgg,
  IconInfinity,
  IconLeaf,
  IconMeat,
  IconSeedling,
  IconSnowflake,
  IconSun,
  IconWind,
} from '@tabler/icons-react'
import { EIngredientType, ESeason, type IngredientType, type Season } from '../data/types'
import useBreakpoint from '../hooks/useBreakpoint'
import { useRecipeStore } from '../store/useRecipeStore'

export const GlobalFilterBar = () => {
  const { proteinFilter, setProteinFilter, seasonFilter, setSeasonFilter } = useRecipeStore()
  const { isMobile } = useBreakpoint()

  const SegmentedControlLabel = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
    <Center style={{ gap: 10 }}>
      <Icon style={{ height: rem(16), width: rem(16) }} />
      <span>{label}</span>
    </Center>
  )

  return (
    <Group gap="xl" justify="center" wrap="wrap">
      <Stack align="center" gap={4}>
        <Text c="dimmed" fw={700} size="xs" tt="uppercase">
          Régime
        </Text>
        <SegmentedControl
          className="shadow-sm"
          color="blue"
          data={[
            {
              label: <SegmentedControlLabel icon={IconInfinity} label="Tous" />,
              value: EIngredientType.ANY,
            },
            {
              label: <SegmentedControlLabel icon={IconSeedling} label="Végan" />,
              value: EIngredientType.VEGAN,
            },
            {
              label: <SegmentedControlLabel icon={IconEgg} label="Végé" />,
              value: EIngredientType.VEGE,
            },
            {
              label: <SegmentedControlLabel icon={IconMeat} label="Flexi" />,
              value: EIngredientType.FLEXI,
            },
          ]}
          onChange={value => setProteinFilter(value as IngredientType)}
          orientation={isMobile ? 'vertical' : 'horizontal'}
          radius="md"
          size="sm"
          value={proteinFilter}
        />
      </Stack>

      <Stack align="center" gap={4}>
        <Text c="dimmed" fw={700} size="xs" tt="uppercase">
          Saison
        </Text>
        <SegmentedControl
          className="shadow-sm"
          color="blue"
          data={[
            {
              label: <SegmentedControlLabel icon={IconCalendar} label="Toutes" />,
              value: ESeason.ALL,
            },
            {
              label: (
                <Center style={{ gap: 10 }}>
                  <IconLeaf style={{ height: rem(16), width: rem(16) }} />
                  <span>Printemps</span>
                </Center>
              ),
              value: ESeason.PRINTEMPS,
            },
            {
              label: (
                <Center style={{ gap: 10 }}>
                  <IconSun style={{ height: rem(16), width: rem(16) }} />
                  <span>Été</span>
                </Center>
              ),
              value: ESeason.SUMMER,
            },
            {
              label: (
                <Center style={{ gap: 10 }}>
                  <IconWind style={{ height: rem(16), width: rem(16) }} />
                  <span>Automne</span>
                </Center>
              ),
              value: ESeason.FALL,
            },
            {
              label: (
                <Center style={{ gap: 10 }}>
                  <IconSnowflake style={{ height: rem(16), width: rem(16) }} />
                  <span>Hiver</span>
                </Center>
              ),
              value: ESeason.WINTER,
            },
          ]}
          onChange={value => setSeasonFilter(value as Season)}
          orientation={isMobile ? 'vertical' : 'horizontal'}
          radius="md"
          size="sm"
          value={seasonFilter}
        />
      </Stack>
    </Group>
  )
}
