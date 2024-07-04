import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, FlatList, TouchableOpacity, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface ImageItem {
  id: string;
  uri: string;
}

export default function ChooseImage() {
  const [images, setImages] = useState<ImageItem[]>([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newImages = result.assets.map((asset) => ({
        id: asset.uri,
        uri: asset.uri,
      }));
      setImages(newImages);
    } else {
      Alert.alert('Selection was canceled');
    }
  };

  const renderItem = ({ item }: { item: ImageItem }) => (
    <Image source={{ uri: item.uri }} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an image from camera roll</Text>
      </TouchableOpacity>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        style={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  grid: {
    flex: 1,
    width: '100%',
  },
  image: {
    width: '32%',
    height: 120,
    margin: '1%',
    borderRadius: 10,
  },
});
