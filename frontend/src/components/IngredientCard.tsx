import { Card, Stack, Text } from '@mantine/core';
import type { ReactNode } from 'react';
import type { Ingredient } from '../data/ingredients';

interface IngredientCardProps {
    ingredient: Ingredient;
    isSelected?: boolean;
    onClick?: () => void;
    children?: ReactNode;
}

export const IngredientCard = ({ ingredient, isSelected, onClick, children }: IngredientCardProps) => {
    return (
        <Card
            shadow="sm"
            padding="sm"
            radius="md"
            withBorder
            onClick={onClick}
            style={{
                transition: 'all 0.2s ease',
                transform: isSelected ? 'scale(1)' : 'scale(0.9)',
                borderColor: isSelected ? 'var(--mantine-color-blue-filled)' : 'transparent',
                backgroundColor: isSelected ? 'var(--mantine-color-blue-light)' : 'var(--mantine-color-white-0)',
                position: 'relative',
                zIndex: isSelected ? 10 : 1,
                cursor: onClick ? 'pointer' : 'default',
            }}
            className={isSelected ? 'shadow-md' : 'hover:shadow-sm hover:border-gray-300'}
        >
            <Stack gap="xs" align="center" justify="center" h="100%">
                <Text fw={600} size="sm" ta="center" truncate="end" w="100%">
                    {ingredient.name}
                </Text>
                {children && (
                    <Stack gap={4} align="center">
                        {children}
                    </Stack>
                )}
            </Stack>
        </Card>
    );
};
