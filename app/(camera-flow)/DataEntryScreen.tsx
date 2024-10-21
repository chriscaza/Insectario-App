import React, {useEffect, useState} from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Asset } from "expo-asset";

import { useCameraStore } from "../../global/cameraStore";
import { Classes } from "../../global/classes";
import apptheme from "../../themes/apptheme";
import BottomSheet from "../../components/DataEntryList";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LoadingScreen from "../../components/LoadingScreen";
import * as Location from 'expo-location';

    const { width, height } = Dimensions.get('window')

export default function Detection() {

    const { picture } = useCameraStore();
    const isSmallScreen = width > 400;

    const [classification, setClassification] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [clase, setClase] = useState('');
    const [order, setOrder] = useState('');
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);

    useEffect(() => {
        const [randomClass, randomOrder] = getRandomClassAndOrder();
        setClase(randomClass);
        setOrder(randomOrder);
    }, []);

    function getRandomClassAndOrder(): [string, string] {
        const classNames = Object.keys(Classes)
        const randomClass = classNames[Math.floor(Math.random() * classNames.length)]

        const orders = Classes[randomClass]
        const randomOrder = orders[Math.floor(Math.random() * orders.length)]

        return [randomClass, randomOrder]
    }

        //Simular la carga
        useEffect(() => {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 900);
    
            return () => clearTimeout(timer);
            (async() => {
                let location = await Location.getCurrentPositionAsync({})
                setLatitude(location.coords.latitude)
                setLongitude(location.coords.longitude);
            })
        }, []);
    
        if(isLoading) return  <LoadingScreen />
    
    return(
        <GestureHandlerRootView>
            <LinearGradient
                colors={["#98D798", "#507150"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.container}
            >
                <View style={styles.dummyView}/>
                <View style={styles.imageWraper}>
                    <Image source={picture} style={styles.pictureContainer}/>
                    <View style={styles.titleContainer}>
                        <Text style={styles.classText}>{clase.toUpperCase()}</Text>
                        <Text style={isSmallScreen ? styles.orderLargeText : styles.orderSmallText}>{order}</Text>
                    </View>
                </View>
                <View style={styles.dummyView} />
                <BottomSheet className={clase} orderName={order} latitude={latitude} longitude={longitude}/>
            </LinearGradient>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageWraper: {
        flex: 10,
        width: width-15,
        borderRadius: 20,
    },
    pictureContainer: {
        flex: 1,
        borderRadius: 20,
    },
    titleContainer: {
        position: 'absolute',
        width: '100%',
        height: 'auto',
        marginTop: 20,
        paddingHorizontal: 20,
        // backgroundColor: apptheme.text
    },
    classText: {
        color: apptheme.white,
        letterSpacing: 8,
        fontSize: 16,
        fontWeight: '800',
        textAlign: 'right'
    },
    orderLargeText: {
        color: apptheme.white,
        letterSpacing: 3,
        fontSize: 36,
        fontWeight: '800',
        textAlign: 'right'
    },
    orderSmallText: {
        color: apptheme.white,
        letterSpacing: 2,
        fontSize: 30,
        fontWeight: '800',
        textAlign: 'right',
    },
    dummyView: {
        flex: 1
    }
})