import { Stack } from "expo-router";
import React from "react";

export default function FolderLayout() {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="Insecta"/>
            <Stack.Screen name="Arachnida"/>
        </Stack>
    )
}