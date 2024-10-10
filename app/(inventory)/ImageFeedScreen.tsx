import React from 'react';
import { View, FlatList, Dimensions, StyleSheet, ListRenderItem, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { height } = Dimensions.get('window');

interface ImageData {
  id: string;
  uri: string;
  title: string;
  date: string;
}

const imageData: ImageData[] = [
  { id: '1', uri: 'https://dam.ngenespanol.com/wp-content/uploads/2021/05/GettyImages-1271816240.jpg', title: 'Hormiga', date: '19-Abril-2024'  },
  { id: '2', uri: 'https://unamglobal.unam.mx/wp-content/uploads/2024/06/arana_joro-1024x605.jpg', title: 'Aranae', date: '20-Mayo-2024' },
  { id: '3', uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Gluvia1.jpg/1200px-Gluvia1.jpg', title: 'Solifugae', date: '15-Julio-2024' },
];

const TikTokStyleGallery: React.FC = () => {
  const renderItem: ListRenderItem<ImageData> = ({ item, index }) => {
    const isFirstItem = index === 0;
    const isLastItem = index === imageData.length - 1;

    return (
      <View
        style={[
          styles.imageContainer,
          isFirstItem && { marginTop: 60 },  
          isLastItem && { marginBottom: 60 },
        ]}
      >
        <TouchableOpacity style={styles.icon} onPress={() => {router.navigate('/(inventory)/InventoryScreen')}}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Image
          source={item.uri}
          style={styles.image}
          contentFit="cover"
        />
        <LinearGradient 
          colors={["rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 0)"]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={styles.overlay}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{item.date}</Text>
          <TouchableOpacity style={styles.button} onPress={() => {router.navigate('/DataShowScreen')}}>
            <Text style={styles.buttonText}>Ver más</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={["#98D798", "#507150"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <FlatList
        data={imageData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        pagingEnabled={false} 
        snapToInterval={height * 0.85 + 55}
        decelerationRate="fast"  
        snapToAlignment="center"  
        showsVerticalScrollIndicator={false}
      /> 
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: '88%',
    alignSelf: 'center',
    height: height * 0.85,
    marginBottom: 20,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 25,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 64,
    fontWeight: 'bold',
  },
  date: {
    color: '#FFFFFF',
    fontSize: 20
  },
  button: {
    backgroundColor: '#314F33',
    paddingVertical: 10,
    width: '100%',
    height: 40,
    borderRadius: 100,
    marginTop: 15,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'medium',
    textAlign: 'center',
  },
  icon: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 10
  },
});

export default TikTokStyleGallery;
