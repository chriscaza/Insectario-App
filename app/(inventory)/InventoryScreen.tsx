import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Insecta from './FoldersScreen'
import Animated, { 
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface InsectaProps {
  visible: boolean,
  onClose: ()=> void,
}

const { width, height } = Dimensions.get('screen')

const imageData = [
  { id: '1', name: 'Violinista', uri: 'url_de_la_imagen' },
  { id: '2', name: 'Violinista', uri: 'url_de_la_imagen' },
  { id: '3', name: 'Violinista', uri: 'url_de_la_imagen' },
  { id: '4', name: 'Violinista', uri: 'url_de_la_imagen' },
  { id: '5', name: 'Violinista', uri: 'url_de_la_imagen' },
  { id: '6', name: 'Violinista', uri: 'url_de_la_imagen' },
  { id: '7', name: 'Violinista', uri: 'url_de_la_imagen' },
  { id: '8', name: 'Violinista', uri: 'url_de_la_imagen' },
  { id: '9', name: 'Violinista', uri: 'url_de_la_imagen' },
  { id: '10', name: 'Violinista', uri: 'url_de_la_imagen' },
  { id: '11', name: 'Violinista', uri: 'url_de_la_imagen' },
  { id: '12', name: 'Violinista', uri: 'url_de_la_imagen' },
  { id: '13', name: 'Violinista', uri: 'url_de_la_imagen' },
  { id: '14', name: 'Violinista', uri: 'url_de_la_imagen' },
  { id: '15', name: 'Violinista', uri: 'url_de_la_imagen' },
  { id: '16', name: 'Violinista', uri: 'url_de_la_imagen' },
  { id: '17', name: 'Violinista', uri: 'url_de_la_imagen' },
  { id: '18', name: 'Violinista', uri: 'url_de_la_imagen' },
];

const InventoryScreen = ({ visible }: InsectaProps) => {

  const renderImageItem = ({ item }: any) => (
    <TouchableOpacity style={styles.imageContainer} onPress={() => {router.navigate('/ImageFeedScreen')}}>
      <Image source={{ uri: item.uri }}/>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={["#98D798", "#507150"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.spiderCircleContainer}>
        <Image
          source={{ uri: 'url_de_la_imagen_araña' }} // Coloca aquí la URL de la imagen de la araña
          style={styles.spiderCircle}
        />
      </View>
      <View style={styles.header}>
        <View style={styles.botons}>
          <TouchableOpacity style={styles.icons} onPress={() => {router.navigate('/(camera-flow)/CameraScreen')}}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>ARANAE</Text>
          <TouchableOpacity style={styles.icons}>
            <Ionicons name="trash" size={24} color="white"/>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Las arañas van desde las diminutas saltarinas hasta las imponentes tarántulas</Text>
      </View>

      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <View style={styles.body}>
            <FlatList
              data={imageData}
              renderItem={renderImageItem}
              keyExtractor={(item) => item.id}
              numColumns={3}
              contentContainerStyle={styles.grid}
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    width: width,
    height: height,
    transform: [{ translateX: width}]
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    height: '33%'
  },
  botons:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 65,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'light',
    textAlign: 'center',
    marginHorizontal: 60,
    marginTop: 30
  },
  body: {
    height: 440,
    marginTop: 80
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  circleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  circle: {
    width: 1010, 
    height: 1010,
    backgroundColor: 'white',
    borderRadius: 505,
    overflow: 'hidden'
  },
  grid: {
    alignSelf: 'center'
  },
  imageContainer: {
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    borderRadius: 10,
    width: 100,
    height: 100,
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  icons: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  spiderCircleContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    position: 'absolute',
    top: 220, // Ajusta según sea necesario
    alignSelf: 'center',
    zIndex: 1,
    backgroundColor: 'white', // Para dar el efecto de fondo negro si la imagen no lo tiene
  },
  spiderCircle: {
    width: 120,
    height: 120,
    top: 5,
    borderRadius: 60,
    alignSelf: 'center',
    zIndex: 1,
    backgroundColor: '#e8e8e8', // Para dar el efecto de fondo negro si la imagen no lo tiene
  },
});

export default InventoryScreen;