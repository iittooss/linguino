import { Badge, Group, Modal, RingProgress, Stack, Text, Title } from '@mantine/core'
import type { Ingredient } from '../../data/types'
import { useBatchRecipeStore } from '../../store/useBatchRecipeStore'

const DAILY_INTAKE = {
  calories: 2000,
  carbs: 260,
  fat: 70,
  protein: 50,
}

const getDailyPercentage = (value: number, type: keyof typeof DAILY_INTAKE) => {
  return Math.round((value / DAILY_INTAKE[type]) * 100)
}

const calculateNutrition = (ingredient: Ingredient) => {
  if (!ingredient.nutritionalInfo) return null

  const { quantity, unit, nutritionalInfo } = ingredient
  if (!quantity) return null

  let ratio = 1
  if (unit === 'g' || unit === 'ml') {
    ratio = quantity / 100
  } else {
    // assume per unit
    ratio = quantity
  }

  return {
    calories: Math.round(nutritionalInfo.calories * ratio),
    carbs: Math.round(nutritionalInfo.carbs * ratio),
    fat: Math.round(nutritionalInfo.fat * ratio),
    protein: Math.round(nutritionalInfo.protein * ratio),
  }
}

const MetricRow = ({
  label,
  value,
  unit,
  type,
}: {
  label: string
  value: number
  unit: string
  type: keyof typeof DAILY_INTAKE
}) => {
  const percentage = getDailyPercentage(value, type)
  let color = 'blue'
  if (percentage > 30) color = 'orange'
  if (percentage > 50) color = 'red'

  return (
    <Group justify="space-between" w="100%">
      <Text size="sm">{label}</Text>
      <Group gap="xs">
        <Text fw={700} size="sm">
          {value}
          {unit}
        </Text>
        <Badge color={color} size="sm" variant="light">
          {percentage}% AJR
        </Badge>
      </Group>
    </Group>
  )
}

const IngredientNutrition = ({ ingredient }: { ingredient: Ingredient }) => {
  const nutrition = calculateNutrition(ingredient)

  if (!nutrition) {
    return (
      <Group justify="space-between" py="xs">
        <Text fw={500}>{ingredient.name}</Text>
        <Text c="dimmed" size="xs">
          Pas d'informations nutritionnelles
        </Text>
      </Group>
    )
  }

  return (
    <Stack gap="xs" py="sm" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
      <Group justify="space-between">
        <Text fw={600} size="md">
          {ingredient.name}
        </Text>
        <Badge variant="dot">
          {ingredient.quantity} {ingredient.unit}
        </Badge>
      </Group>

      <Group grow>
        <Stack gap={2}>
          <MetricRow label="Calories" type="calories" unit="kcal" value={nutrition.calories} />
          <MetricRow label="Protéines" type="protein" unit="g" value={nutrition.protein} />
          <MetricRow label="Glucides" type="carbs" unit="g" value={nutrition.carbs} />
          <MetricRow label="Lipides" type="fat" unit="g" value={nutrition.fat} />
        </Stack>
      </Group>
    </Stack>
  )
}

export const NutritionalInfoModal = () => {
  const { selectedMealForInfo, closeNutritionalModal } = useBatchRecipeStore()

  if (!selectedMealForInfo) return null

  // Collect all ingredients
  const ingredients = [
    selectedMealForInfo.protein,
    selectedMealForInfo.starch,
    selectedMealForInfo.vegetable,
    ...selectedMealForInfo.accompaniments,
  ]

  // Calculate total meal nutrition
  const totalNutrition = ingredients.reduce(
    (acc, ing) => {
      const nut = calculateNutrition(ing)
      if (!nut) return acc
      return {
        calories: acc.calories + nut.calories,
        carbs: acc.carbs + nut.carbs,
        fat: acc.fat + nut.fat,
        protein: acc.protein + nut.protein,
      }
    },
    { calories: 0, carbs: 0, fat: 0, protein: 0 },
  )

  return (
    <Modal
      onClose={closeNutritionalModal}
      opened={!!selectedMealForInfo}
      size="lg"
      title={<Title order={3}>Informations Nutritionnelles (par personne)</Title>}
    >
      <Stack>
        {/* Summary Card */}
        <Group align="center" bg="blue.0" justify="space-around" p="md" style={{ borderRadius: 8 }}>
          <Stack align="center" gap={0}>
            <RingProgress
              label={
                <Text fw={700} size="xl" ta="center">
                  {Math.round((totalNutrition.calories / DAILY_INTAKE.calories) * 100)}%
                </Text>
              }
              roundCaps
              sections={[{ color: 'blue', value: (totalNutrition.calories / DAILY_INTAKE.calories) * 100 }]}
              size={80}
              thickness={8}
            />
            <Text fw={500} size="sm">
              Calories Total
            </Text>
            <Text fw={700} size="lg">
              {totalNutrition.calories} kcal
            </Text>
          </Stack>

          <Stack gap="xs">
            <MetricRow label="Protéines" type="protein" unit="g" value={totalNutrition.protein} />
            <MetricRow label="Glucides" type="carbs" unit="g" value={totalNutrition.carbs} />
            <MetricRow label="Lipides" type="fat" unit="g" value={totalNutrition.fat} />
          </Stack>
        </Group>

        <Title mt="md" order={4} size="h5">
          Détail par ingrédient
        </Title>
        <Stack gap="xs">
          {ingredients.map((ing, idx) => (
            <IngredientNutrition ingredient={ing} key={`${ing.id}-${idx}`} />
          ))}
        </Stack>
      </Stack>
    </Modal>
  )
}
