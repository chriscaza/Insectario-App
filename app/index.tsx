import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '@/components/icon/appIcon';

import apptheme from '@/themes/apptheme';

export default function HomeScreen() {
  return (
    <LinearGradient style={styles.gradient} colors={[apptheme.secondary, apptheme.black]}>
      <View style={styles.container}>
        <Logo/>
        <Text style={styles.text}>INSECTARIO</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30
  },
  text: {
    fontSize: 25,
    fontWeight: '300',
    letterSpacing: 7,
    color: '#FFF',
  },
});