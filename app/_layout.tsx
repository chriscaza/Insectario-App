import { UserProvider } from '@/global/user/UserContent';
import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth-flow)" />
        <Stack.Screen name="(camera-flow)" />
        <Stack.Screen name="(inventory)" />
      </Stack>
    </UserProvider>
  );
}