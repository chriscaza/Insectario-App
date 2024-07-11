import React, {useEffect, useState} from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Asset } from "expo-asset";

import { useCameraStore } from "@/global/cameraStore";
import { Classes } from "@/global/classes";
import apptheme from "@/themes/apptheme";
import BottomSheet from "@/components/BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

    const { width, height } = Dimensions.get('window')

export default function Detection() {

    const { picture } = useCameraStore();
    const isSmallScreen = width > 400;

    const [classification, setClassification] = useState('');
    const [loading, setLoading] = useState(true);

    const [clase, order] = Classes[6].split('/');
    
    return(
        <GestureHandlerRootView style={{flex: 1}}>
            <LinearGradient
                colors={["#98D798", "#507150"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.container}
            >
                <SafeAreaView 
                    style={{
                        flex: 1,
                        width: width-10,
                        marginTop: 20,
                        marginHorizontal: 5,
                    }}
                >
                    <View style={styles.imageWrapper}>
                        <Image source={{uri: picture}} style={styles.containerImage} />
                        <View style={{position: 'absolute', right: '4%', top: '5%'}}>
                            <Text style={styles.classText}>{clase.toUpperCase()}</Text>
                            <Text style={isSmallScreen ? styles.orderLargeText : styles.orderSmallText}>{order}</Text>       
                        </View>
                    </View>
                </SafeAreaView>
                <BottomSheet />
            </LinearGradient>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerImage: {
        flex: 1,
        borderRadius: 20,
        alignItems: 'flex-end',
    },
    imageWrapper: {
        flex: 1,
        borderRadius: 20,
        overflow: "hidden",
      },
    classText: {
        color: apptheme.white,
        letterSpacing: 8,
        fontSize: 16,
        fontWeight: '800',
        lineHeight: 20,
        textAlign: 'right',
    },
    orderLargeText: {
        color: apptheme.white,
        letterSpacing: 3,
        fontSize: 38,
        fontWeight: '800',
        textAlign: 'right',
    },
    orderSmallText: {
        color: apptheme.white,
        letterSpacing: 2,
        fontSize: 32,
        fontWeight: '800',
        textAlign: 'right',
    }
})