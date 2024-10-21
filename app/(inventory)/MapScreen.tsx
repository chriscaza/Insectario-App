import React, { useState } from 'react';
import MapView, { Marker, Region } from 'react-native-maps';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import apptheme from '@/themes/apptheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function MapScreen() {

  const [showText, setShowText] = useState(true);

  const photos = [
    {
      id: 1,
      order: 'Lepidoptera',
      uri: 'ph://CC95F08C-88C3-4012-9D6D-64A413D254B3/L0/001',
      coordinates: {latitude: 19.4326, longitude: -99.1332},
    },
    {
      id: 2,
      order: 'Hymenoptera',
      uri: 'ph://ED7AC36B-A150-4C38-BB8C-B6D696F4F2ED/L0/001',
      coordinates: {latitude: 20.6597, longitude: -103.3496},
    },
    {
      id: 3,
      order: 'Lepidoptera',
      uri: 'ph://99D53A1F-FEEF-40E1-8BB3-7DD55A43C8B7/L0/001',
      coordinates: {latitude: 21.1619, longitude: -86.8515},
    },
    {
      id: 4,
      order: 'Mantodea',
      uri: 'ph://9F983DBA-EC35-42B8-8773-B597CF782EDD/L0/001',
      coordinates: {latitude: 55.7558, longitude: 37.6173},
    },
    {
      id: 5,
      order: 'Coleoptera',
      uri: 'ph://106E99A1-4F6A-45A2-B320-B0AD4A8E8473/L0/001',
      coordinates: {latitude:40.7128, longitude: -74.0060},
    },
    {
      id: 6,
      order: 'Lepidoptera',
      uri: 'ph://B84E8479-475C-4727-A4A4-B77AA9980897/L0/001',
      coordinates: {latitude: 24.4326, longitude: -99.1332},
    },
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
        <Pressable style={styles.loactionButton}>
          <FontAwesome name="location-arrow" size={24} color="white" />
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
  loactionButton: {
    position: 'absolute', 
    bottom: 25,
    right: 20,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
});