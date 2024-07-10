import React, {useEffect, useState} from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Asset } from "expo-asset";

import { useCameraStore } from "@/global/cameraStore";
import { Classes } from "@/global/classes";
import apptheme from "@/themes/apptheme";
import BottomSheet from "@/components/BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Detection() {

    const { picture } = useCameraStore();
    const { width, height } = Dimensions.get('window')

    const [classification, setClassification] = useState('');
    const [loading, setLoading] = useState(true);

    const [clase, order] = Classes[2].split('/')
    
    return(
        <LinearGradient
            colors={["#98D798", "#507150"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <GestureHandlerRootView>
                <SafeAreaView 
                    style={{
                        flex: 1,
                        width: width-10,
                        top: 20,
                        left: 5,
                    }}
                >
                    <Image source={{uri: picture}} style={styles.containerImage}>
                        <View style={{right: 20, top: 30}}>
                            <Text style={styles.classText}>{clase.toUpperCase()}</Text>
                            <Text style={styles.orderText}>{order}</Text>       
                        </View>
                    </Image>
                    <BottomSheet />
                </SafeAreaView>
            </GestureHandlerRootView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerImage: {
        flex: 1, 
        borderRadius: 20,
        alignItems: 'flex-end',
    },
    classText: {
        color: apptheme.white,
        letterSpacing: 8,
        fontSize: 16,
        fontWeight: '800',
        lineHeight: 20,
        textAlign: 'right',
    },
    orderText: {
        color: apptheme.white,
        letterSpacing: 5,
        fontSize: 48,
        fontWeight: '800',
        textAlign: 'center',
    }
})