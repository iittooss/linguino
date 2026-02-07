import { ThemeIcon, Tooltip } from '@mantine/core'
import { IconLeaf, IconSnowflake, IconSun, IconWind } from '@tabler/icons-react'
import { ESeason, type Season } from '../data/types'

interface SeasonIconBadgeProps {
  season: Season
  activeSeason?: Season
  onClick?: (season: Season) => void
  size?: number
}

export const SeasonIconBadge = ({ season, activeSeason, onClick, size = 18 }: SeasonIconBadgeProps) => {
  const isActive = activeSeason === season
  const isInteractive = !!onClick

  const getIconConfig = (s: Season) => {
    switch (s) {
      case ESeason.PRINTEMPS:
        return { color: 'green', icon: <IconLeaf size={size} />, label: 'Printemps' }
      case ESeason.SUMMER:
        return { color: 'orange', icon: <IconSun size={size} />, label: 'Été' }
      case ESeason.FALL:
        return { color: 'orange', icon: <IconWind size={size} />, label: 'Automne' }
      case ESeason.WINTER:
        return { color: 'blue', icon: <IconSnowflake size={size} />, label: 'Hiver' }
      default:
        return { color: 'gray', icon: null, label: '' }
    }
  }

  const { icon, color, label } = getIconConfig(season)

  if (!icon) return null

  return (
    <Tooltip label={label} withArrow>
      <ThemeIcon
        className={isInteractive ? 'hover:scale-110 transition-transform' : ''}
        color={color}
        onClick={e => {
          if (isInteractive && onClick) {
            e.stopPropagation()
            onClick(season)
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
