import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { usePermissions } from 'expo-media-library' 
import { useCameraPermissions } from 'expo-camera';

const { height } = Dimensions.get('window');

import apptheme from '../themes/apptheme';
import Logo from '../components/icons/AppIcon';
import SlidingButton from '../components/icons/SlideButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as tf from '@tensorflow/tfjs'

export default function StartScreen() {


  const router = useRouter();
  const [ cameraPermissions, requestCameraPermission ] = useCameraPermissions();
  const [ mediaLibraryPermissions, requestMediaLibraryPermission ] = usePermissions();

  async function loadModel() {
    await tf.ready()
    try {
      const modelJSON = require('../assets/models/model.json')
      const loadedModel = await tf.loadLayersModel(modelJSON)
      console.log('Modelo cargado')
    } catch(e) {
      console.log(e)
    }
    // console.log('Modelo cargado', model)
  }

  useEffect(() => {
    loadModel()
  }, [])
  

  async function handleContinue() {
    const allPermissions = await requestAllPermissions();
    if(allPermissions) {
      handleSwipeComplete()
    } else {
      Alert.alert("Para continuar es necesario dar permisos a la aplicación desde ajustes")
    }
  }

  async function requestAllPermissions() {
    
    const cameraStatus = await requestCameraPermission();
    if(!cameraStatus.granted) {
      Alert.alert("Error", 'Se necesita acceso a la cámara');
      return false;
    }

    const mediaLibraryStatus = await requestMediaLibraryPermission();
    if(!mediaLibraryStatus.granted) {
      Alert.alert("Error", 'Se necesita acceso al contenido multimedia');
      return false;
    }

    await AsyncStorage.setItem('hasOpened', 'true');
    return true;
  }


  const handleSwipeComplete = () => {
    router.replace('/LoginScreen')
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
              <Text onPress={handleContinue} style={styles.text}>Iniciar</Text>
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