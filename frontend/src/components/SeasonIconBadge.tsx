import { ThemeIcon, Tooltip } from '@mantine/core';
import { IconLeaf, IconSun, IconWind, IconSnowflake } from '@tabler/icons-react';
import { Season } from '../data/ingredients';

interface SeasonIconBadgeProps {
    season: Season;
    activeSeason: Season;
    onClick: (season: Season) => void;
}

export const SeasonIconBadge = ({ season, activeSeason, onClick }: SeasonIconBadgeProps) => {
    const isActive = activeSeason === season;
    const size = 20;

    const getIconConfig = (s: Season) => {
        switch (s) {
            case Season.PRINTEMPS:
                return { icon: <IconLeaf size={size} />, color: 'green' };
            case Season.ETE:
                return { icon: <IconSun size={size} />, color: 'orange' };
            case Season.AUTOMNE:
                return { icon: <IconWind size={size} />, color: 'orange' }; // Orange as requested before
            case Season.HIVER:
                return { icon: <IconSnowflake size={size} />, color: 'blue' };
            default:
                return { icon: null, color: 'gray' };
        }
    };

    const { icon, color } = getIconConfig(season);

    if (!icon) return null;

    return (
        <Tooltip label={season.charAt(0).toUpperCase() + season.slice(1)} withArrow>
            <ThemeIcon
                variant={isActive ? 'filled' : 'light'}
                color={color}
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(season);
                }}
                className="hover:scale-110 transition-transform"
                size="md"
                radius="sm"
            >
                {icon}
            </ThemeIcon>
        </Tooltip>
    );
};
