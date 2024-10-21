import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
    Dimensions,
    FlatList,
    InteractionManager,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View 
} from "react-native";
import Animated, { 
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Classes} from "../../global/classes";
import apptheme from "../../themes/apptheme";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import LogOutAlert from "../../components/Alerts/LogOutAlert";
import { router } from "expo-router";
import MapScreen from "./MapScreen";

interface InsectaProps {
    visible: boolean,
    onClose: ()=> void,
}

const { width, height } = Dimensions.get('screen')

const renderItem = ({ item }: { item: string }) => (
    <View 
        style={{
            width: width/3,
        }}
    >
        <View style={{width: 'auto'}}>
            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => {router.navigate('/InventoryScreen')}}>
                <MaterialIcons name="folder" size={115} color={apptheme.primary} />
                <View 
                    style={{
                        alignSelf: 'center',
                        position: 'absolute',
                        width: 96,
                        height: 60,
                        bottom: 19,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: 'rgba(255, 255, 255, 0.4)',
                        backgroundColor: apptheme.secondary
                    }}/>
                <Text 
                    numberOfLines={1}
                    style={{
                        color: '#FFF',
                        fontSize: 14,
                        position: 'absolute',
                        bottom: 25,
                        width: 85,
                        textAlign: 'left',
                    }}
                >
                    {item}
                </Text>
            </TouchableOpacity>
        </View>
    </View>
)

export default function Insecta({ visible, onClose }: InsectaProps) {

    const [ modalLogOutVisible, setModalLogOutVisible ] = useState<boolean>(false)
    const [ modalClassSelectorVisible, setModalClassSelectorVisible ] = useState<boolean>(false)
    const [ mapVisible, setMapVisible ] = useState<boolean>(false)
    const [ insectaVisible, setInsectaVisible ] = useState<boolean>(true)

    const translateX = useSharedValue(visible ? 0 : width)
    
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: -translateX.value }]
        }
    })

    useEffect(() => {
        translateX.value = withSpring(visible ? 0 : width, {damping: 20})
    }, [visible])

    const changeMode = (classType: boolean) => {
        if (classType !== mapVisible) {
            setMapVisible(classType);
        }
    }

    return (
        <Animated.View style={[ styles.modal, animatedStyle]}>
            <LinearGradient
                colors={["#98D798", "#507150"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{flex: 1}}
            >
                <SafeAreaView style={{flex: 1}}>
                    <View style={styles.topContainer}>
                        <TouchableOpacity style={styles.icons} onPress={onClose}>
                            <Ionicons name="camera-outline" size={28} color='white' />
                        </TouchableOpacity>
                        <View style={styles.topColumns}>
                            <Pressable onPress={() => changeMode(false)}>
                                <Text style={[styles.title, !mapVisible ? styles.bold : {}]}>CARPETAS</Text>
                            </Pressable>
                            <Pressable onPress={() => changeMode(true)}>
                                <Text style={[styles.title, mapVisible ? styles.bold : {}]}>MAPA</Text>
                            </Pressable>
                        </View>
                        <TouchableOpacity style={styles.icons} onPress={() => {setModalLogOutVisible(true)}}>
                            <MaterialIcons name="exit-to-app" size={28} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.classSelectorContainer}>
                        <Pressable style={styles.classSelectorTextContainer}>
                            <Text style={styles.classSelectorText}>{mapVisible ? 'Seleccionar' : 'Insecta'}</Text>
                            <Ionicons name="chevron-down-outline" size={24} color="white" />
                        </Pressable>
                    </View>
                    <View style={styles.bodyContainer}>
                        {
                            mapVisible
                            ?
                            <MapScreen />
                            :
                            <FlatList 
                                data={insectaVisible ? Classes['Insecta'] : Classes['Arachnida']}
                                renderItem={renderItem}
                                numColumns={3}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.flatList}
                            />
                        }
                    </View>
                    {visible && <LogOutAlert visible={modalLogOutVisible} onClose={()=> setModalLogOutVisible(false)} />}
                </SafeAreaView>
            </LinearGradient>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        width: width,
        height: height,
        transform: [{ translateX: width}]
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    topColumns: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    icons: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    classSelectorContainer: {
        padding: 20,
    },
    classSelectorTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },
    classSelectorText: {
        color: apptheme.white,
        fontSize: 20,
        fontWeight: 400,
        lineHeight: 20,
    },
    bodyContainer: {
        flex: 1,
        marginBottom: 25,
    },
    flatList: {
        gap: 20,        
    },
    title: {
        color: '#FFF',
        fontSize: 20,
    },
    bold: {
        fontWeight: '700'
    }
})