import { Stack } from "expo-router";
import React from "react";

export default function CameraFlowLayout() {
    return(
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CameraScreen" />
            <Stack.Screen name="DataEntryScreen" />
            <Stack.Screen name="DetectionScreen" />
            <Stack.Screen name="GalleryScreen" />
        </Stack>
    )
}