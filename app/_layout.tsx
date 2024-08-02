import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name='(home)'/>
            <Stack.Screen name='(camera)'/>
            <Stack.Screen name='(folder)'/>
        </Stack>
    );
}