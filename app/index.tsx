import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Welcome from "@/components/screens/Welcome";
import apptheme from '@/themes/apptheme';
import Login from '@/components/screens/Login';
import Register from '@/components/screens/Register'
import Forgot from '@/components/screens/ForgotPass'
import NewPass from '@/components/screens/NewPass'
import NotFound from '@/components/screens/AccountNotFound'

const Stack = createStackNavigator();

export default function index() {
  return (
    // <Stack.Navigator screenOptions={{ headerShown: false }}>
    //   {/* <Stack.Screen name="Welcome" component={Welcome} /> */}
    //   <Stack.Screen name='LogIn' component={LogIn} />
    // </Stack.Navigator>
    //<Login />
    //<Register/>
    //<Forgot/>
    //<NewPass/>
    <NotFound/>
  );
}
