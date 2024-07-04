import React from 'react';
import { StyleSheet, Text, View, Dimensions, Platform, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const { height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';

import apptheme from '@/themes/apptheme';
import Logo from '../icons/AppIcon';
import SlidingButton from '../icons/SlideButton';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';


export default function Welcome() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [ fontsLoaded ] = useFonts({
    'Roboto-Regular': require('@/assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Thin': require('@/assets/fonts/Roboto-Thin.ttf'),
  });

  if(!fontsLoaded) {
    return <ActivityIndicator />
  }

  const handleSwipeComplete = () => {
    // navigation.navigate('LogIn');
  };

  return (
    <LinearGradient style={ StyleSheet.absoluteFillObject } colors={[apptheme.secondary, apptheme.black]}>
      <SafeAreaView style={{flex: 1}}>
        <GestureHandlerRootView>
          <View style={styles.container}>
            <Logo />
            <Text style={styles.text}>INSECTARIO</Text>
            <View style={styles.footer}>
              <SlidingButton onSwipeComplete={handleSwipeComplete}/>
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