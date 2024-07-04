import apptheme from '@/themes/apptheme'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Button, Dimensions, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
const { width } = Dimensions.get('window');

export default function PhotoDetection() {

  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={style.permission}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <LinearGradient 
        colors={[apptheme.secondary, apptheme.background]}
        style={style.container}
        locations={[1, 0]}>
          <SafeAreaView style={{flex: 1}}>
            <View style={[style.mainContainer, {top: 20}]}>
              
              <View style={[style.cameraContainer]}>
                <CameraView style={{flex: 1, justifyContent: 'center'}} facing='back'>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <View 
                    style={{
                      width: 40, 
                      height: 40, 
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      borderRadius: 50,
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      right: 30, 
                      top: 30}}>
                        <Ionicons name="flash-off" size={30} color="white"/>
                    </View>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Pressable 
                    style={{
                      width: 90, 
                      height: 90, 
                      borderRadius: 50, 
                      backgroundColor: 'rgba(255, 255, 255, 0.5)', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      bottom: 20
                    }} 
                    onPress={() => {
                      // Tomar fotografia
                    }}>
                      <View style={{width: 85, height: 85, borderRadius: 50, borderColor: apptheme.white, borderWidth: 4, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{width: 72, height: 72, borderRadius: 50, backgroundColor: apptheme.white}}></View>
                      </View>
                    </Pressable>
                  </View>
                </CameraView>
              </View>
              
              <View style={[style.footer]}>
                <View 
                style={{
                  width: 40, 
                  height: 40, 
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  borderRadius: 50,
                  justifyContent: 'center', 
                  alignItems: 'center', 
                }}>
                  <Ionicons name="folder-open-outline" size={25} color="white" />
                </View>
                <Text style={[style.text, {fontWeight: '700'}]}>CÁMARA</Text>
                <Text style={[style.text, {fontWeight: '200'}]}>GALERÍA</Text>
                <View 
                style={{
                  width: 40, 
                  height: 40, 
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  borderRadius: 50,
                  justifyContent: 'center', 
                  alignItems: 'center',
                }}>
                  <FontAwesome6 name="arrows-rotate" size={25} color='white'/>
                </View>
              </View>
            </View>
          </SafeAreaView>
    </LinearGradient>
  )
}

const style = StyleSheet.create({
  permission: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject
  },
  mainContainer: {
    flex: 1,
    width: width-10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cameraContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  footer: {
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    bottom: 5
  },
  text: {
    color: apptheme.white,
    fontSize: 20,
  }
})
