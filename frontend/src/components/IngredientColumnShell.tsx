import { Paper, Stack, Title, ScrollArea, Group, Box } from '@mantine/core';
import type { ReactNode } from 'react';

interface IngredientColumnShellProps {
    title: string;
    icon: ReactNode;
    children: ReactNode;
    color?: string;
}

export const IngredientColumnShell = ({
    title,
    icon,
    children,
    color = 'blue'
}: IngredientColumnShellProps) => {
    return (
        <Paper
            withBorder
            p="md"
            radius="xl"
            shadow="sm"
            className="h-[650px] flex flex-col transition-all duration-300 hover:shadow-md"
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                borderColor: `var(--mantine-color-${color}-2)`,
            }}
        >
            <Stack gap="md" className="h-full">
                <Group gap="sm" mb="xs">
                    <Box
                        className={`p-2.5 rounded-2xl flex items-center justify-center`}
                        style={{
                            backgroundColor: `var(--mantine-color-${color}-1)`,
                            color: `var(--mantine-color-${color}-7)`,
                            boxShadow: `0 4px 12px rgba(0,0,0,0.05)`
                        }}
                    >
                        {icon}
                    </Box>
                    <Title
                        order={3}
                        size="h4"
                        fw={800}
                        className="text-slate-800 tracking-tight"
                    >
                        {title}
                    </Title>
                </Group>

                <ScrollArea
                    scrollbarSize={4}
                    className="flex-1 -mr-2 pr-2"
                    type="hover"
                >
                    <Stack gap="sm" pb="md">
                        {children}
                    </Stack>
                </ScrollArea>
            </Stack>
        </Paper>
    );
};
