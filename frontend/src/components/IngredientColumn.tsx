import { Stack, Title, Box, ScrollArea } from '@mantine/core';
import type { ReactNode } from 'react';

interface IngredientColumnProps {
    title: string;
    filterComponent?: ReactNode;
    children: ReactNode;
}

export const IngredientColumn = ({ title, filterComponent, children }: IngredientColumnProps) => {
    return (
        <Stack h="100%">
            <Box>
                <Title order={3} mb="xs" size="h4">{title}</Title>
                {filterComponent ? (
                    <Box mb="md">{filterComponent}</Box>
                ) : (
                    <Box pb={48} /> /* Placeholder to align with columns that have filters */
                )}
            </Box>
            <ScrollArea h={500} offsetScrollbars>
                <Stack gap="xs">
                    {children}
                </Stack>
            </ScrollArea>
        </Stack>
    );
};
