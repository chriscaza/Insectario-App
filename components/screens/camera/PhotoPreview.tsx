import CloseButton from "@/components/icons/CloseButton";
import apptheme from "@/themes/apptheme";
import React from "react";
import { View, StyleSheet, Text, Image, Dimensions, Pressable } from "react-native";

import { Ionicons } from '@expo/vector-icons';

interface PhotoPreviewProps {
    uri: string,
    onPress: () => void,
}

const {width} = Dimensions.get("window")

export default function PhotoPreview({ uri, onPress } : PhotoPreviewProps) {
    return(
        <View style={styles.mainContainer}>
            <Image 
            source={{uri: uri}}
            style={styles.photo}/>
            <View style={{position: 'absolute', left: '13%'}}><CloseButton icon="close" onPress={onPress}/></View>
            <View style={styles.detect}>
                <Pressable style={styles.pressable}>
                    <Text style={styles.text}>Detectar</Text>
                    <Ionicons name="arrow-forward" size={24} color="white" />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: width-10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        top: 20,
        gap: 10,
    },
    photo: {
        flex: 1,
        borderRadius: 20,
    },
    detect: {
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        width: width-10,
        bottom: 5,
    },
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderColor: apptheme.white,
        borderWidth: 1,
        borderRadius: 50,
        width: 150,
        height: 50,
    },
    text: {
        fontSize: 20,
        color: apptheme.white,
        fontWeight: '400',
    },
})