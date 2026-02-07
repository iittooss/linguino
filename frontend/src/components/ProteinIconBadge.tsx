import { ThemeIcon, Tooltip } from '@mantine/core'
import { IconEgg, IconMeat, IconSeedling } from '@tabler/icons-react'
import { EIngredientType, type IngredientType } from '../data/types'

interface ProteinIconBadgeProps {
  type: IngredientType
  activeType?: IngredientType
  onClick?: (type: IngredientType) => void
  size?: number
}

export const ProteinIconBadge = ({ type, activeType, onClick, size = 18 }: ProteinIconBadgeProps) => {
  const isActive = activeType === type
  const isInteractive = !!onClick

  const getIconConfig = (t: IngredientType) => {
    switch (t) {
      case EIngredientType.VEGAN:
        return { color: 'green', icon: <IconSeedling size={size} />, label: 'Végan' }
      case EIngredientType.VEGE:
        return { color: 'lime', icon: <IconEgg size={size} />, label: 'Végétarien' }
      case EIngredientType.FLEXI:
        return { color: 'blue', icon: <IconMeat size={size} />, label: 'Flexitarien' }
      default:
        return { color: 'gray', icon: null, label: '' }
    }
  }

  const { icon, color, label } = getIconConfig(type)

  if (!icon) return null

  return (
    <Tooltip label={label} withArrow>
      <ThemeIcon
        className={isInteractive ? 'hover:scale-110 transition-transform' : ''}
        color={color}
        onClick={e => {
          if (isInteractive && onClick) {
            e.stopPropagation()
            onClick(type)
          }
        }}
        radius="sm"
        size={size + 10}
        style={{ cursor: isInteractive ? 'pointer' : 'default' }}
        variant={isActive ? 'filled' : 'light'}
      >
        {icon}
      </ThemeIcon>
    </Tooltip>
  )
}
