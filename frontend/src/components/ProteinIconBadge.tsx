import { ThemeIcon, Tooltip } from '@mantine/core';
import { IconSeedling, IconEgg, IconMeat } from '@tabler/icons-react';
import { IngredientType } from '../data/types';

interface ProteinIconBadgeProps {
    type: IngredientType;
    activeType?: IngredientType;
    onClick?: (type: IngredientType) => void;
    size?: number;
}

export const ProteinIconBadge = ({
    type,
    activeType,
    onClick,
    size = 18
}: ProteinIconBadgeProps) => {
    const isActive = activeType === type;
    const isInteractive = !!onClick;

    const getIconConfig = (t: IngredientType) => {
        switch (t) {
            case IngredientType.VEGAN:
                return { icon: <IconSeedling size={size} />, color: 'green', label: 'Végan' };
            case IngredientType.VEGE:
                return { icon: <IconEgg size={size} />, color: 'lime', label: 'Végétarien' };
            case IngredientType.FLEXI:
                return { icon: <IconMeat size={size} />, color: 'blue', label: 'Flexitarien' };
            default:
                return { icon: null, color: 'gray', label: '' };
        }
    };

    const { icon, color, label } = getIconConfig(type);

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
                        onClick(type);
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
