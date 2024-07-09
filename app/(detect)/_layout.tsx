import React from 'react';
import { Stack } from 'expo-router';

export default function DetectLayout() {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name='Data'/>
        </Stack>
    );
}