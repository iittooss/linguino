import { Button, Center, Group, Paper, Stack, Text, Title } from '@mantine/core'
import { IconMoodSmile, IconPlus } from '@tabler/icons-react'
import { useRecipeStore } from '../../store/useRecipeStore'

const NoRecipe: React.FC = () => {
  const {generateBatchRecipes, addBatchRecipe} = useRecipeStore()


  return (
    <Paper className="mt-8" p="xl" radius="lg" shadow="sm" withBorder>
      <Center py={50}>
        <Stack align="center" gap="md">
          <IconMoodSmile color="var(--mantine-color-blue-3)" size={64} />
          <Title c="gray.7" order={3}>
            Aucun repas planifié pour le moment
          </Title>
          <Text c="dimmed" ta="center">
            Commencez par générer une semaine de repas ou ajoutez-en un manuellement.
          </Text>
          <Group mt="md">
            <Button
              color="teal"
              leftSection={<IconPlus size={22} />}
              onClick={() => generateBatchRecipes(7)}
              size="lg"
              variant="filled"
            >
              Générer 7 repas
            </Button>
            <Button color="blue" leftSection={<IconPlus size={22} />} onClick={addBatchRecipe} size="lg" variant="outline">
              Ajouter un repas
            </Button>
          </Group>
        </Stack>
      </Center>
    </Paper>
  )
}

export default NoRecipe
