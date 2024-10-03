import React, { Dispatch } from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity} from "react-native";
import { Image } from 'expo-image';
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from '@expo/vector-icons';
import CloseButton from "@/components/icons/CloseButton";
import apptheme from "@/themes/apptheme";
import { useCameraStore } from "@/global/cameraStore";
import { router } from "expo-router";

const {width} = Dimensions.get("window")

export default function DetectionScreen() {
    const { picture } = useCameraStore();
    function closeImage() {
        router.back()
    }

    return(
        <LinearGradient 
            colors={["#98D798", "#507150"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        > 

        <SafeAreaView style={styles.mainContainer}>
            <Image 
                source={{uri: picture}}
                style={styles.photo}
            />
            <View 
                style={{
                    position: 'absolute',
                    left: '12%',
                    top: '6%',
                }}
            >
                <CloseButton icon="close" onPress={closeImage}/>   
            </View>
            <View style={styles.detect}>
                <TouchableOpacity style={styles.pressable} onPress={() => {router.navigate('/DataEntryScreen')}}>
                    <Text style={styles.text}>Detectar</Text>
                    <Ionicons name="arrow-forward" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainContainer: {
        top: 20,
        flex: 1,
        width: width-10,
    },
    photo: {
        flex: 1,
        borderRadius: 20,
    },
    detect: {
        height: 90,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderColor: apptheme.white,
        borderWidth: 1,
        borderRadius: 50,
        width: 130,
        height: 50,
    },
    text: {
        fontSize: 20,
        color: apptheme.white,
        fontWeight: '400',
    },
})