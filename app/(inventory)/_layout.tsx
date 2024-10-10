import React from 'react';
import { Stack } from 'expo-router';

export default function InventoryLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='DataShowScreen' />
            <Stack.Screen name='FoldersScreen' />
            <Stack.Screen name='ImageFeedScreen' />
            <Stack.Screen name='InventoryScreen' />
        </Stack>
    );
}