import { ThemeIcon } from '@mantine/core'
import { IconChefHat, IconGrain, IconLeaf, IconMeat } from '@tabler/icons-react'
import { EIngredientCategory, type IngredientCategory } from '../data/types'

export class IngredientCategoryHelper {
  static getIcon(category: IngredientCategory) {
    if (category === EIngredientCategory.PROTEIN) return <IconMeat size={16} />
    if (category === EIngredientCategory.VEGETABLE) return <IconLeaf size={16} />
    if (category === EIngredientCategory.STARCH) return <IconGrain size={16} />
    if (category === EIngredientCategory.ACCOMPANIMENT) return <IconChefHat size={16} />
  }

  static getColor(category: IngredientCategory) {
    if (category === EIngredientCategory.PROTEIN) return 'red'
    if (category === EIngredientCategory.VEGETABLE) return 'green'
    if (category === EIngredientCategory.STARCH) return 'yellow'
    if (category === EIngredientCategory.ACCOMPANIMENT) return 'blue'
  }

  static getThemeIcon(category: IngredientCategory) {
    const color = IngredientCategoryHelper.getColor(category)
    const icon = IngredientCategoryHelper.getIcon(category)

    return (
      <ThemeIcon color={color} size="xs" variant="light">
        {icon}
      </ThemeIcon>
    )
  }
}
