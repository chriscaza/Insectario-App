import React, {useEffect, useState} from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Asset } from "expo-asset";

import { Ionicons } from '@expo/vector-icons';
import { useCameraStore } from "@/global/cameraStore";
import { Classes } from "@/global/classes";
import apptheme from "@/themes/apptheme";
import BottomSheet from "@/components/DataShowList";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";

const { width, height } = Dimensions.get('window')

export default function Detection() {

    const { picture } = useCameraStore();
    const isSmallScreen = width > 400;

    const [classification, setClassification] = useState('');
    const [loading, setLoading] = useState(true);

    const [clase, order] = Classes[4].split('/');
    
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
                        <TouchableOpacity style={styles.icons}>
                            <Ionicons name="arrow-back" size={24} color="white" onPress={() => {router.navigate('/ImageFeedScreen')}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icons}>
                            <Ionicons name="cloud-download" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.dummyView} />
                <BottomSheet />
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
        top: 0,
        left: 0,
        right: 0,
        height: 60, // Ajusta según sea necesario
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
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
    },
    icons: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
})