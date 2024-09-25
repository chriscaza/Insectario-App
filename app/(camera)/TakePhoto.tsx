import React, { useEffect, useRef, useState } from 'react'
import apptheme from '@/themes/apptheme'
import { CameraView, FlashMode, CameraType } from 'expo-camera'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions, Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome6 } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useCameraStore } from '@/global/cameraStore'

import Flash from '@/components/icons/Flash'
import Insecta from '../screens/FoldersView'

const { width } = Dimensions.get('window')

export default function TakePhoto() {
  const [type, setType] = useState<CameraType>('back')
  const [flash, setFlash] = useState<FlashMode>('off')
  const [cameraReady, setCameraReady] = useState<boolean>(false)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const cameraRef = useRef<CameraView>(null)

  const { setPicture } = useCameraStore();

  const onCameraReady = async () => {
    setCameraReady(true)
  }

  useEffect(() => {
    return () => {
      if(cameraRef.current) {
        cameraRef.current?.stopRecording()
      }
    }
  }, [])

  async function takePicture() {
    if (cameraReady) {
      const response = await cameraRef.current?.takePictureAsync({})
      if(response) {
        setPicture(response!.uri);
        router.navigate('/PhotoPreview');
      }
    } 
  }

  const flipCamera = () => {
    setType((type) => (type === 'back' ? 'front' : 'back'))
  }

  const turnOnOffFlash = () => {
    setFlash((flash) => (flash === 'off' ? 'on' : 'off'))
  }

  return (
    <LinearGradient
      colors={['#98D798', '#507150']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={style.container}
    >
      <SafeAreaView>
        <View style={[style.mainContainer, { top: 20 }]}>
          <View style={[style.cameraContainer]}>
            <CameraView
              style={{
                flex: 1,
                justifyContent: 'center'
              }}
              facing={type}
              flash={flash}
              ref={cameraRef}
              onCameraReady={onCameraReady}
            >
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                {flash === 'off' ? (
                  <Flash icon='flash-off' onPress={turnOnOffFlash} />
                ) : (
                  <Flash icon='flash' onPress={turnOnOffFlash} />
                )}
              </View>
              <View style={{ alignItems: 'center' }}>
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
                  onPress={takePicture}
                >
                  <View
                    style={{
                      width: 85,
                      height: 85,
                      borderRadius: 50,
                      borderColor: apptheme.white,
                      borderWidth: 4,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <View
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: 50,
                        backgroundColor: apptheme.white
                      }}
                    ></View>
                  </View>
                </Pressable>
              </View>
            </CameraView>
          </View>

          <View style={[style.footer]}>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'rgba(0,0,0,0.4)',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => {setModalVisible(true)}}
            >
              <Ionicons name='folder-open-outline' size={25} color='white' />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[style.text, {fontWeight: '700'}]}>CÁMARA</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={
                () => {
                  router.navigate('/(camera)/PhotoLibrary');
                }}
              >
                <Text style={style.text}>GALERÍA</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'rgba(0,0,0,0.4)',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={flipCamera}
            >
              <FontAwesome6 name='arrows-rotate' size={25} color='white' />
            </TouchableOpacity>
          </View>
          
        </View>
      </SafeAreaView>
      <Insecta visible={modalVisible} onClose={() => setModalVisible(false)}/>
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
  },
  mainContainer: {
    flex: 1,
    width: width - 10,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cameraContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden'
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
    fontSize: 20
  }
})
