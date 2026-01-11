import { ThemeIcon, Tooltip } from '@mantine/core';
import { IconSeedling, IconEgg, IconMeat } from '@tabler/icons-react';
import { IngredientType } from '../data/ingredients';

interface ProteinIconBadgeProps {
    type: IngredientType;
    activeType: IngredientType;
    onClick: (type: IngredientType) => void;
}

export const ProteinIconBadge = ({ type, activeType, onClick }: ProteinIconBadgeProps) => {
    const isActive = activeType === type;
    const size = 20;

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
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(type);
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
