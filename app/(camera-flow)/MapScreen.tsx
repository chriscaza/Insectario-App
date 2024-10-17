import React, { useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { useCameraStore } from '@/global/cameraStore';
import { Image } from 'expo-image';
import apptheme from '@/themes/apptheme';

export default function MapScreen() {

  const photos = [
    {
      id: 1,
      uri: 'ph://CCBE1BF5-6F9E-4CDE-9F6F-0EA61CF222CC/L0/001',
      coordinates: {latitude: 19.4326, longitude: -99.1332},
    },
    {
      id: 2,
      uri: 'ph://5AE08AA4-B09B-4F60-A0BE-228E3D549D65/L0/001',
      coordinates: {latitude: 20.6597, longitude: -103.3496},
    },
    {
      id: 3,
      uri: 'ph://8A3ACAFD-1F45-4739-8919-45F04D6B6827/L0/001',
      coordinates: {latitude: 21.1619, longitude: -86.8515},
    },
    {
      id: 4,
      uri: 'ph://A6060C11-AA1E-498E-A69F-2E1C695CC70B/L0/001',
      coordinates: {latitude: 55.7558, longitude: 37.6173},
    },
    {
      id: 5,
      uri: 'ph://662089EE-9438-4350-919A-8DD382F7A98F/L0/001',
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
            <Image 
              source={{ uri: photo.uri }}
              style={styles.photoMarker}
              transition={1000}
              contentFit='cover'
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
    width: 40,
    height: 50,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: apptheme.white,
  },
});