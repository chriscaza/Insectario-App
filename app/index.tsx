import React from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

import Logo from '@/components/appIcon';
import apptheme from '@/themes/apptheme';
import SlidingButton from '@/components/slideButton';

const { height } = Dimensions.get('window');

export default function HomeScreen() {

  const [ fontsLoaded ] = useFonts({
    'Roboto-Regular': require('@/assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Thin': require('@/assets/fonts/Roboto-Thin.ttf'),
  });

  return (
    <LinearGradient style={ StyleSheet.absoluteFill } colors={[apptheme.secondary, apptheme.black]}>
      <View style={styles.container}>
        <Logo />
        <Text style={styles.text}>INSECTARIO</Text>
        <View style={styles.footer}>
          <SlidingButton />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  text: {
    fontFamily: Platform.OS === 'ios' ? 'Roboto-Thin' : 'Roboto-Regular',
    fontSize: 25,
    letterSpacing: 5,
    color: apptheme.white,
  },
  footer: {
    flex: 0,
    position: 'absolute',
    alignItems: 'center',
    bottom: height * 0.1,
  },
});