import React from "react";
import { Stack } from "expo-router";

export default function AuthFlowLayout() {
    return(
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AccountNotFoundScreen" />
            <Stack.Screen name="ForgotPassScreen" />
            <Stack.Screen name="LoginScreen" />
            <Stack.Screen name="NewPassScreen" />
            <Stack.Screen name="SignUpScreen" />
        </Stack>
    );
}