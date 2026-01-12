import { AppShell, Group, Button, Text, Container } from '@mantine/core';
import { NavLink, useLocation } from 'react-router-dom';
import { IconChefHat, IconListNumbers, IconToolsKitchen2 } from '@tabler/icons-react';

export const Navbar = () => {
    const location = useLocation();

    return (
        <AppShell.Header
            px="md"
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid var(--mantine-color-gray-2)'
            }}
        >
            <Container size="xl" h="100%" fluid>
                <Group h="100%" justify="space-between">
                    <Group gap="xs">
                        <IconChefHat size={28} color="var(--mantine-color-blue-6)" />
                        <Text fw={800} size="xl" className="tracking-tight bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                            Linguino
                        </Text>
                    </Group>

                    <Group justify="center" gap="md">
                        <Button
                            component={NavLink}
                            to="/single"
                            variant={location.pathname === '/single' || location.pathname === '/' ? 'filled' : 'subtle'}
                            leftSection={<IconToolsKitchen2 size={20} />}
                            radius="md"
                        >
                            Générer une recette
                        </Button>
                        <Button
                            component={NavLink}
                            to="/batch"
                            variant={location.pathname === '/batch' ? 'filled' : 'subtle'}
                            leftSection={<IconListNumbers size={20} />}
                            radius="md"
                            color="teal"
                        >
                            Plusieurs recettes
                        </Button>
                    </Group>

                    <div style={{ width: 100 }} /> {/* Spacer for balance */}
                </Group>
            </Container>
        </AppShell.Header>
    );
};
