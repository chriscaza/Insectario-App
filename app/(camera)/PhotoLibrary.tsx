import React, { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
FlatList, 
StyleSheet,
View,
Text, 
TouchableOpacity,
Dimensions,
Pressable} from "react-native";
import { Asset, getAlbumsAsync, getAssetsAsync } from "expo-media-library";
import { Image } from "expo-image";
import apptheme from "@/themes/apptheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useCameraStore } from "@/global/cameraStore";

interface MemoizedImageProps {
    uri: string
}

const {width} = Dimensions.get('window')

const MemoizedImage = React.memo(({ uri }: MemoizedImageProps) => {
    
    const { setPicture } = useCameraStore();

    function imagePressed() {
        setPicture(uri);
        router.navigate('/PhotoPreview')
    }        

    return (
        <Pressable 
            style={{
                width: width/3.3,
                height: 170,
                margin: '1.5%'
            }}
            onPress={imagePressed}
        >
            <Image
                source={uri}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 15,
                }}
            />
        </Pressable> 
    )
  });
  

export default function PhotoLibrary() {


    const [ assets, setAssets ] = useState<Asset[]>([]);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('Recientes')

    const flatListRef = useRef<FlatList<Asset>>(null)

    useEffect(() => {
       getAlbums() 
    }, [])

    async function getAlbums() {
        if(isLoading && !hasNextPage) return;
        setIsLoading(true);
        try {
            const albumAssets = await getAssetsAsync({
                first: 10,
                mediaType: 'photo',
                sortBy: 'creationTime',
                after: assets.length ? assets[assets.length -1].id : undefined
            });
            setAssets((prevAssets) => {
                const newAssets = albumAssets.assets.filter(asset => 
                  !prevAssets.some(prevAsset => prevAsset.id === asset.id)
                );
                return [...prevAssets, ...newAssets];
              });
            setHasNextPage(albumAssets.hasNextPage);
        } catch (error) {
            console.error('Error', error);
        } finally {
            setIsLoading(false);
        }
    }

    function scrollToTop() {
        if(flatListRef.current) {
            flatListRef.current.scrollToIndex({animated: true, index: 0})
        }
    }

    return (
        <LinearGradient
            colors={["#98D798", "#507150"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.topContainer}>
                    <Text 
                        style={{
                            color: apptheme.white,
                            fontWeight: '500',
                            fontSize: 20,
                            lineHeight: 20,
                            textAlign: 'center',
                        }}
                    >
                        Elegir imagen
                    </Text>
                    <TouchableOpacity 
                        style={{
                            left: '2%',
                            padding: '3%',
                        }}
                    >
                        <Text style={styles.text}>{title}</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={assets}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    renderItem={({item}) => (
                        <MemoizedImage uri={item.uri}/>
                    )}
                    ref={flatListRef}
                    numColumns={3}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    onEndReached={getAlbums}
                    onEndReachedThreshold={0.5}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: 10, width: width}}
                />
                <View style={[styles.footer]}>
                    <TouchableOpacity onPress={() => {router.back()}}>
                        <Text style={styles.text}>CÁMARA</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={scrollToTop}>
                        <Text style={[styles.text, {fontWeight: '700'}]}>GALERÍA</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topContainer: {
        marginTop: 50,
        width: '100%',
        gap: 10,
    },
    footer: {
        paddingTop: 30,
        padding: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 30,
        alignItems: 'center',
      },
    text: {
        color: apptheme.white,
        fontSize: 20
      }
})