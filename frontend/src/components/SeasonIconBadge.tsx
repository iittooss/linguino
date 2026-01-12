import { ThemeIcon, Tooltip } from '@mantine/core';
import { IconLeaf, IconSun, IconWind, IconSnowflake } from '@tabler/icons-react';
import { Season } from '../data/types';

interface SeasonIconBadgeProps {
    season: Season;
    activeSeason?: Season;
    onClick?: (season: Season) => void;
    size?: number;
}

export const SeasonIconBadge = ({
    season,
    activeSeason,
    onClick,
    size = 18
}: SeasonIconBadgeProps) => {
    const isActive = activeSeason === season;
    const isInteractive = !!onClick;

    const getIconConfig = (s: Season) => {
        switch (s) {
            case Season.PRINTEMPS:
                return { icon: <IconLeaf size={size} />, color: 'green', label: 'Printemps' };
            case Season.ETE:
                return { icon: <IconSun size={size} />, color: 'orange', label: 'Été' };
            case Season.AUTOMNE:
                return { icon: <IconWind size={size} />, color: 'orange', label: 'Automne' };
            case Season.HIVER:
                return { icon: <IconSnowflake size={size} />, color: 'blue', label: 'Hiver' };
            default:
                return { icon: null, color: 'gray', label: '' };
        }
    };

    const { icon, color, label } = getIconConfig(season);

    if (!icon) return null;

    return (
        <Tooltip label={label} withArrow>
            <ThemeIcon
                variant={isActive ? 'filled' : 'light'}
                color={color}
                style={{ cursor: isInteractive ? 'pointer' : 'default' }}
                onClick={(e) => {
                    if (isInteractive && onClick) {
                        e.stopPropagation();
                        onClick(season);
                    }
                }}
                className={isInteractive ? "hover:scale-110 transition-transform" : ""}
                size={size + 10}
                radius="sm"
            >
                {icon}
            </ThemeIcon>
        </Tooltip>
    );
};
