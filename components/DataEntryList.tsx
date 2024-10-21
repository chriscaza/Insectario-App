import apptheme from "../themes/apptheme";
import React, { useEffect } from "react";
import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { router } from "expo-router";

const { width, height } = Dimensions.get('screen');
const MAX_TRANSLATE_Y = -height*0.92
const MIN_TRANSLATE_Y = -height*0.12

interface BottomSheetProps {
    className: string,
    orderName: string,
    latitude: string,
    longitude: string,
}

export default function BottomSheet({ className, orderName, latitude, longitude }: BottomSheetProps) {
    const translateY = useSharedValue<number>(0)
    const context = useSharedValue({y: 0})

    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value }
        })
        .onUpdate((event) => {
            translateY.value = event.translationY + context.value.y,
            translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
        })
        .onEnd(() => {
            if (translateY.value >= -height/2) {
                translateY.value = withSpring(MIN_TRANSLATE_Y, { damping: 50 });
            } else if (translateY.value <= -height / 1.9) {
                translateY.value = withSpring(MAX_TRANSLATE_Y, { damping: 50 });
            } 
            });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    useEffect(() => {
        translateY.value = withSpring(MIN_TRANSLATE_Y)
    }, [])

    function getCurrentDateAndTime(): [ formattedDate: string, formattedTime: string ] {
        const now = new Date();
    
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
    
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}:${seconds}`;
    
        return [ formattedDate, formattedTime ];
    }

    const [ date, hour ] = getCurrentDateAndTime()

    const formFields = [
        { label: 'Clase', placeholder: className },
        { label: 'Orden', placeholder: orderName },
        { label: 'Nombre', placeholder: 'Nombre común' },
        { label: 'Coordenadas', placeholder: `${latitude}, ${longitude}` },
        { label: 'Hábitat', placeholder: 'Ingresa el hábitat' },
        { label: 'Fecha', placeholder: date },
        { label: 'Hora', placeholder: hour },
        { label: 'Detalles', placeholder: 'Ingresa los detalles' },
        { label: 'Observaciones', placeholder: 'Ingresa las observaciones' }
    ];

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <GestureDetector gesture={gesture}>
                <View style={styles.topContainer}>
                    <View style={styles.lineContainer}>
                        <View style={styles.line} />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Registrar Datos:</Text>
                    </View>
                </View>
            </GestureDetector>
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={70}
            >
                <ScrollView 
                    contentContainerStyle={styles.scrollViewContent}
                    style={{flex: 1}}
                    keyboardShouldPersistTaps='handled'
                >
                    <View style={styles.bodyContainer}>
                        <View style={styles.form}>
                            {formFields.map((field, index) => (
                                <View key={index} style={styles.input}>
                                    <Text style={styles.label}>{field.label}</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={field.placeholder}
                                        placeholderTextColor="rgba(255, 255, 255, 1)"
                                    />
                                </View>
                            ))}
                            <TouchableOpacity style={styles.button} onPress={() => {router.navigate('/(camera-flow)/CameraScreen')}}>
                                <Text style={styles.textButton}>Registrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Animated.View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        width,
        height,
        top: height,
        borderRadius: 20,
        overflow: 'hidden',
        borderTopWidth: 2,
        borderColor: '#FFF',
        backgroundColor: apptheme.secondary
    },
    topContainer: {
        height: 90,
    },
    lineContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        width: 85,
        height: 6,
        borderRadius: 20,
        backgroundColor: '#FFF',
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '400',
        letterSpacing: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: height < 850 ? height*0.1 : height*0.15
    },
    bodyContainer: {
        flex: 1,
        marginTop: 30,
        paddingHorizontal: 35,
    },
    form: {
        flex: 1,
        gap: 24,
        width: '100%',
    },
    input: {
        width: '100%',
        height: 60,
        paddingHorizontal: 16,
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#314F33',
    },
    textInput: {
        color: apptheme.white,
        fontSize: 18,
    },
    label: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        fontWeight: '400',
    },
    button: {
        borderRadius: 50,
        width: '100%',
        height: 45,
        paddingVertical: 10,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7C967D',
    },
    textButton: {
        color: apptheme.white,
        fontSize: 18,
        fontWeight: '500',
        letterSpacing: 1,
    },
});
