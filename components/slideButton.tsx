import React from "react";
import { Text, StyleSheet, View, Platform } from "react-native";
import apptheme from "@/themes/apptheme";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from '@expo/vector-icons'

export default function SlidingButton() {
    return(
        <LinearGradient 
        colors={[ 'rgba(255, 255, 255, 0.00) 0%', 'rgba(255, 255, 255, 0.70) 100%)' ]}
        style={styles.gradientButton}>
            <View style={styles.arrows}>
                <FontAwesome name="chevron-up" size={24} color={'rgba(255, 255, 255, 0.3)'}></FontAwesome>
                <FontAwesome name="chevron-up" size={24} color={'rgba(255, 255, 255, 1)'}></FontAwesome>
            </View>
            <View style={styles.button}>
                <Text style={styles.textButton}>Go</Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradientButton: {
        height: 150,
        width: 75,
        borderRadius: 50,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    arrows: {
        position: 'absolute',
        alignItems: 'center',
        top: 20,
    },
    button: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: apptheme.white,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: apptheme.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    textButton: {
        color: apptheme.text,
        letterSpacing: 1.25,
        fontSize: 25,
        fontFamily: Platform.OS === 'ios' ? 'Roboto-Thin' : 'Roboto-Regular',
    },
})