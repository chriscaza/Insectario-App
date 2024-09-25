import React from "react";
import { Stack } from "expo-router";

export default function HomeLayout() {
    return(
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index"/>
            <Stack.Screen name="LogIn"/>
            <Stack.Screen name="Register"/>
            <Stack.Screen name="ForgotPass" />
            <Stack.Screen name="NewPass" />
            <Stack.Screen name="AccountNotFound"/>
        </Stack>
    );
}