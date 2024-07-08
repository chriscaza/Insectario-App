import { Stack } from "expo-router";
import React from "react";

export default function CameraLayout() {
    return(
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="PhotoLibrary" options={{presentation: 'fullScreenModal'}}/>
            <Stack.Screen name="PhotoPreview" options={{presentation: 'fullScreenModal'}}/>
        </Stack>
    )
}