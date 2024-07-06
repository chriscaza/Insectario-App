import React from 'react';
import { StyleSheet, Text, View, Dimensions, Platform, ActivityIndicator, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const { height } = Dimensions.get('window');

import apptheme from '@/themes/apptheme';
import Logo from '../../components/icons/AppIcon';
import SlidingButton from '../../components/icons/SlideButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';


export default function inddex() {

  const router = useRouter();

  const [ fontsLoaded ] = useFonts({
    'Roboto-Regular': require('@/assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Thin': require('@/assets/fonts/Roboto-Thin.ttf'),
  });

  if(!fontsLoaded) {
    return <ActivityIndicator />
  }

  const handleSwipeComplete = () => {
    router.replace('(home)/LogIn')
  };

  return (
    <LinearGradient style={ StyleSheet.absoluteFillObject } colors={[apptheme.secondary, apptheme.black]}>
      <SafeAreaView style={{flex: 1}}>
        <GestureHandlerRootView>
          <View style={styles.container}>
            <Logo />
            <Text style={styles.text}>INSECTARIO</Text>
            <View style={styles.footer}>
              {/* <SlidingButton onSwipeComplete={handleSwipeComplete}/> */}
              <Text onPress={handleSwipeComplete} style={styles.text}>Iniciar</Text>
            </View>
          </View>
        </GestureHandlerRootView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
  },
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