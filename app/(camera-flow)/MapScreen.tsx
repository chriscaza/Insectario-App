import React, { useState } from 'react';
import MapView, { Marker, Region } from 'react-native-maps';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import apptheme from '@/themes/apptheme';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MapScreen() {

  const [showText, setShowText] = useState(true);

  const photos = [
    {
      id: 1,
      order: 'Lepidoptera',
      uri: 'ph://CCBE1BF5-6F9E-4CDE-9F6F-0EA61CF222CC/L0/001',
      coordinates: {latitude: 19.4326, longitude: -99.1332},
    },
    {
      id: 2,
      order: 'Hymenoptera',
      uri: 'ph://5AE08AA4-B09B-4F60-A0BE-228E3D549D65/L0/001',
      coordinates: {latitude: 20.6597, longitude: -103.3496},
    },
    {
      id: 3,
      order: 'Lepidoptera',
      uri: 'ph://8A3ACAFD-1F45-4739-8919-45F04D6B6827/L0/001',
      coordinates: {latitude: 21.1619, longitude: -86.8515},
    },
    {
      id: 4,
      order: 'Mantodea',
      uri: 'ph://A6060C11-AA1E-498E-A69F-2E1C695CC70B/L0/001',
      coordinates: {latitude: 55.7558, longitude: 37.6173},
    },
    {
      id: 5,
      order: 'Coleoptera',
      uri: 'ph://662089EE-9438-4350-919A-8DD382F7A98F/L0/001',
      coordinates: {latitude:40.7128, longitude: -74.0060},
    },
    {
      id: 6,
      order: 'Lepidoptera',
      uri: 'ph://CCBE1BF5-6F9E-4CDE-9F6F-0EA61CF222CC/L0/001',
      coordinates: {latitude: 24.4326, longitude: -99.1332},
    },
    {
      id: 7,
      order: 'Hymenoptera',
      uri: 'ph://5AE08AA4-B09B-4F60-A0BE-228E3D549D65/L0/001',
      coordinates: {latitude: 23.6597, longitude: -103.3496},
    },
    {
      id: 8,
      order: 'Lepidoptera',
      uri: 'ph://8A3ACAFD-1F45-4739-8919-45F04D6B6827/L0/001',
      coordinates: {latitude: 15.1619, longitude: -86.8515},
    },
    {
      id: 9,
      order: 'Coleoptera',
      uri: 'ph://662089EE-9438-4350-919A-8DD382F7A98F/L0/001',
      coordinates: {latitude: 52.7558, longitude: 40.6173},
    },
    {
      id: 10,
      order: 'Mantodea',
      uri: 'ph://A6060C11-AA1E-498E-A69F-2E1C695CC70B/L0/001',
      coordinates: {latitude:43.7128, longitude: -74.0060},
    }
  ]

  const showOrderText = (region: Region) => {
    const zoomThreshold = 70
    if (region.latitudeDelta < zoomThreshold && region.latitudeDelta > zoomThreshold * 0.01) {
      setShowText(true);
    } else {
      setShowText(false);
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <MapView style={styles.map} onRegionChange={showOrderText}>
          {photos.map(photo => (
            <Marker
              key={photo.id}
              coordinate={photo.coordinates}
              style={{alignItems: 'center'}}
            >
              <Image 
                source={{ uri: photo.uri }}
                style={styles.photo}
                contentFit='cover'
              />
              {showText && (<Text style={styles.text}>{photo.order}</Text>)}
            </Marker>
          ))}
        </MapView>
        <Pressable style={styles.filterButton}>
          <Ionicons 
            name="filter"
            size={25}
            color="white"
          />
        </Pressable>
      </View>
    </SafeAreaView>
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
    height: '100%',
  },
  photo: {
    width: 45,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: apptheme.white,
  },
  text: {
    color: apptheme.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  filterButton: {
    position: 'absolute', 
    top: 30,
    left: 15,
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
});