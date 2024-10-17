import React, { useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { useCameraStore } from '@/global/cameraStore';
import FastImage from 'react-native-fast-image';

export default function MapScreen() {

  const photos = [
    {
      id: 1,
      uri: 'ph://904DBA2B-3494-4260-BC1B-2C5B3E52CBCA/L0/001',
      coordinates: {latitude: 19.4326, longitude: -99.1332},
    },
    {
      id: 2,
      uri: 'ph://B558F2BB-8683-4C34-9BF2-2A70EF36548E/L0/001',
      coordinates: {latitude: 20.6597, longitude: -103.3496},
    },
    {
      id: 3,
      uri: 'ph://CCBE1BF5-6F9E-4CDE-9F6F-0EA61CF222CC/L0/001',
      coordinates: {latitude: 21.1619, longitude: -86.8515},
    },
    {
      id: 4,
      uri: 'ph://95074C30-607A-4F45-BB66-E9099F1CDBA5/L0/001',
      coordinates: {latitude: 55.7558, longitude: 37.6173},
    },
    {
      id: 5,
      uri: 'ph://52172648-7E59-407D-B3DA-2ADBD6C767AB/L0/001',
      coordinates: {latitude:40.7128, longitude: -74.0060},
    }
  ]

  const { picture } = useCameraStore()
  
  useEffect(() => {console.log(picture)}, [])

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {photos.map(photo => (
          <Marker
            key={photo.id}
            coordinate={photo.coordinates}
          >
            <FastImage 
              source={{ uri: photo.uri }}
              style={styles.photoMarker}
              resizeMode={FastImage.resizeMode.cover}
            />
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    width: '100%',
    height: '80%',
  },
  photoMarker: {
    width: 50,
    height: 50,
    borderRadius: 25, // Para que las fotos se vean redondeadas
    borderWidth: 2,
    borderColor: '#FFF',
  },
});