import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth-flow)" />
      <Stack.Screen name="(camera-flow)" />
      <Stack.Screen name="(inventory)" />
    </Stack>
  );
}