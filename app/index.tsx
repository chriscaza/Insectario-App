import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { StyleSheet, Text, View, Dimensions, Alert, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location'
import { Camera } from 'expo-camera';

const { height } = Dimensions.get('window');

import apptheme from '../themes/apptheme';
import Logo from '../components/icons/AppIcon';
import Web from '../components/icons/Web'
import SlidingButton from '../components/icons/SlideButton';
import { UserProvider } from '@/global/user/UserContent';


const router = useRouter()

export default function StartScreen() {

  const [permissionsGranted, setPermissionsGranted] = useState(false);

  const requestPermissions = async () => {
    const [cameraStatus, locationStatus, mediaLibraryStatus] = await Promise.all([
      Camera.requestCameraPermissionsAsync(),
      Location.requestForegroundPermissionsAsync(),
      MediaLibrary.requestPermissionsAsync(),
    ]);

    if (
      cameraStatus.status === 'granted' &&
      locationStatus.status === 'granted' &&
      mediaLibraryStatus.status === 'granted'
    ) {
      return true
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const handleSwipeComplete = () => {
    router.replace('/LoginScreen')
  };

  // if (!permissionsGranted) {
  //   return (
  //     <View>
  //       <Text>"Por favor es necesario dar permisos"</Text>
  //     </View>
  //   )
  // }

  return (
    <SafeAreaView style={styles.safeArea}>
      <GestureHandlerRootView>
        <View style={styles.container}>
          <Web style={styles.web}/>
          <Logo />
          <View style={styles.footer}>
            <SlidingButton onSwipeComplete={handleSwipeComplete}/>
          </View>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    backgroundColor: apptheme.secondary,
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  text: {
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
  web: {
    position: 'absolute',
    left: '-45%',
    top: '-50%'
  }
});