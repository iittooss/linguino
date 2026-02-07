import { Badge, CloseButton, Divider, Group, Paper, Stack, Text, Title } from '@mantine/core'
import { IconChefHat } from '@tabler/icons-react'
import type { Ingredient } from '../data/types'
import { useRecipeStore } from '../store/useRecipeStore'

export const RecipeDisplay = () => {
  const { protein, vegetable, starch } = useRecipeStore(s => s.selectedRecipe)
  const selectedAccompaniments = useRecipeStore(s => s.selectedAccompaniments)
  const toggleAccompaniment = useRecipeStore(s => s.toggleAccompaniment)

  if (!protein && selectedAccompaniments.length === 0) {
    return null
  }

  return (
    <Paper bg="blue.0" className="border-blue-200 shadow-md" mb="xl" p="xl" radius="lg" withBorder>
      <Stack align="center">
        <Group>
          <IconChefHat color="var(--mantine-color-blue-6)" size={32} />
          <Title c="blue.8" order={2}>
            Menu Inspiré
          </Title>
        </Group>
        <Divider label="La Recette" labelPosition="center" w="100%" />

        {protein && (
          <Text className="text-center" fw={800} size="xl">
            {protein.name} accompagné de {vegetable?.name} et {starch?.name}
          </Text>
        )}

        {selectedAccompaniments.length > 0 && (
          <Group gap="xs" justify="center">
            <Text c="dimmed" fw={600} size="sm">
              Avec :
            </Text>
            {selectedAccompaniments.map((acc: Ingredient) => (
              <Badge
                color="blue"
                key={acc.id}
                pr={3}
                rightSection={
                  <CloseButton
                    color="blue"
                    onClick={() => toggleAccompaniment(acc)}
                    onMouseDown={event => event.preventDefault()}
                    size="xs"
                    variant="transparent"
                  />
                }
                size="lg"
                variant="light"
              >
                {acc.name}
              </Badge>
            ))}
          </Group>
        )}
      </Stack>
    </Paper>
  )
}
