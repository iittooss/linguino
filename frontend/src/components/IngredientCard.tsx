import { Card, Stack, Text } from '@mantine/core';
import type { ReactNode } from 'react';
import type { Ingredient } from '../data/types';

interface IngredientCardProps {
    ingredient: Ingredient;
    isSelected?: boolean;
    onClick?: () => void;
    children?: ReactNode;
}

export const IngredientCard = ({ ingredient, isSelected, onClick, children }: IngredientCardProps) => {
    return (
        <Card
            shadow={isSelected ? "md" : "xs"}
            padding="sm"
            radius="lg"
            withBorder
            onClick={onClick}
            className={`transition-all duration-300 ${isSelected ? '' : 'hover:scale-[0.98] opacity-90 hover:opacity-100'}`}
            style={{
                cursor: onClick ? 'pointer' : 'default',
                borderColor: isSelected ? 'var(--mantine-color-blue-5)' : 'var(--mantine-color-gray-2)',
                backgroundColor: isSelected ? 'var(--mantine-color-blue-0)' : 'white',
                borderWidth: isSelected ? '2px' : '1px',
            }}
        >
            <Stack gap="xs" align="center" justify="center" h="100%">
                <Text
                    fw={isSelected ? 800 : 600}
                    size="sm"
                    ta="center"
                    className={`transition-colors duration-300 ${isSelected ? 'text-blue-900' : 'text-slate-700'}`}
                >
                    {ingredient.name}
                </Text>

                {children && (
                    <Group gap={6} justify="center" wrap="wrap">
                        {children}
                    </Group>
                )}
            </Stack>
        </Card>
    );
};

import { Group } from '@mantine/core';
