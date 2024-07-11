import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";

import Welcome from "@/components/screens/Welcome";
import apptheme from '@/themes/apptheme';
//import Login from '@/components/screens/Login';
import Register from '@/components/screens/Register'


export default function index() {

  const Stack = createStackNavigator();

  return (
    // <Stack.Navigator screenOptions={{ headerShown: false }}>
    //   {/* <Stack.Screen name="Welcome" component={Welcome} /> */}
    //   <Stack.Screen name='LogIn' component={LogIn} />
    // </Stack.Navigator>
    //<Login />
    <Register/>
  );
}
