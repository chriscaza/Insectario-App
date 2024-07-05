import apptheme from '@/themes/apptheme'
import { CameraView, FlashMode, CameraType, Camera} from 'expo-camera'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import Flash from '@/components/icons/Flash'
import PhotoPreview from './PhotoPreview'
const { width } = Dimensions.get('window');

export default function PhotoDetection() {

  const [ hasPermission, setHasPermission ] = useState<boolean>(false);
  const [ image, setImage ] = useState<string | undefined>();
  const [ type, setType ] = useState<CameraType>('back');
  const [ flash, setFlash ] = useState<FlashMode>('off');
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    (async ()=> {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission( status === 'granted');
    })();
  }, []);

  if (!hasPermission) {
    return (
      <View style={style.permission}>
        <Text>Necesitamos permiso para usar la cámara</Text>
      </View>
    );
  }

  const takePicture = async () => {
    if(cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({quality: 1});
        setImage(photo?.uri)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const flipCamera = () => {
    setType((type) => type === 'back' ? 'front' : 'back')
  }

  const turnOnOffFlash = () => {
    setFlash((flash) =>
      flash === 'off' ? 'on' : 'off'
    );
  }

  const closePreview = () => {
    setImage(undefined)
  }

  return (
    <LinearGradient 
        colors={[apptheme.secondary, apptheme.background]}
        style={style.container}
        locations={[1, 0]}>
          <SafeAreaView style={{flex: 1}}>
            { !image ?
              <View style={[style.mainContainer, {top: 20}]}>
                <View style={[style.cameraContainer]}>
                  <CameraView 
                  style={{
                    flex: 1, justifyContent: 'center'
                    }} 
                    facing={type} 
                    flash={flash}
                    ref={cameraRef}>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      { flash === 'off' ? <Flash icon='flash-off' onPress={turnOnOffFlash}/> : <Flash icon='flash' onPress={turnOnOffFlash}/>}
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
                      onPress={takePicture}>
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
                  <Pressable 
                  style={{
                    width: 40, 
                    height: 40, 
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    borderRadius: 50,
                    justifyContent: 'center', 
                    alignItems: 'center',
                  }}
                  onPress={flipCamera}>
                    <FontAwesome6 name="arrows-rotate" size={25} color='white'/>
                  </Pressable>
                </View>
             </View>
             :
             <PhotoPreview uri={image} onPress={closePreview}/>
            }
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
