import apptheme from "@/themes/apptheme";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { 
    Dimensions,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard, 
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { width, height } = Dimensions.get('window');
const MAX_TRANSLATE_Y = -height*0.9

export default function BottomSheet() {
    const [clas, setClas] = useState<string>('');
    const [order, setOrder] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [habitat, setHabitat] = useState<string>('');
    const [date, setDate] = useState<Date>();
    const [hour, setHour] = useState<string>('');
    const [details, setDetails] = useState<string>('');
    const [observations, setObservations] = useState<string>('');

    const translateY = useSharedValue<number>(0)
    const context = useSharedValue({y: 0})
    const MIN_TRANSLATE_Y = -height*0.1

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
        
        useEffect(() => {
            translateY.value = withSpring(MIN_TRANSLATE_Y)
        }, [])

    const rBottomSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateY: translateY.value}]
        }
    })

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
                    <View style={styles.lineTextContainer}>
                        <View style={styles.line}/>
                        <Text style={styles.text}>Registrar Datos</Text>
                    </View>
                    <View 
                        style={{width: '100%', height: height*0.73}}
                    >
                        <KeyboardAwareScrollView 
                            showsVerticalScrollIndicator={false} 
                            style={styles.form}
                            contentContainerStyle={{ 
                                flexGrow: 1,
                                alignItems: 'center',
                                gap: 10,
                                paddingBottom: 30
                            }}
                            enableOnAndroid={true}
                            enableAutomaticScroll={true}
                        >
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Nombre de usuario</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="chris.caza25"
                                    placeholderTextColor="rgba(255, 255, 255, 1)"
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Nombre de usuario</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="chris.caza25"
                                    placeholderTextColor="rgba(255, 255, 255, 1)"
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Nombre de usuario</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="chris.caza25"
                                    placeholderTextColor="rgba(255, 255, 255, 1)"
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Nombre de usuario</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="chris.caza25"
                                    placeholderTextColor="rgba(255, 255, 255, 1)"
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Nombre de usuario</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="chris.caza25"
                                    placeholderTextColor="rgba(255, 255, 255, 1)"
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Fecha de nacimiento</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="dd/mm/aaaa"
                                    placeholderTextColor="rgba(255, 255, 255, 1)"
                                />
                                <TouchableOpacity
                                    style={styles.calendarButton}
                                >
                                    <Ionicons
                                        name="calendar"
                                        size={24}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Nombre de usuario</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="chris.caza25"
                                    placeholderTextColor="rgba(255, 255, 255, 1)"
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Nombre de usuario</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="chris.caza25"
                                    placeholderTextColor="rgba(255, 255, 255, 1)"
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Nombre de usuario</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="chris.caza25"
                                    placeholderTextColor="rgba(255, 255, 255, 1)"
                                />
                            </View>
                            <TouchableOpacity style={styles.registerButton}>
                                <Text style={styles.textButton}>Registrar</Text>
                            </TouchableOpacity>
                        </KeyboardAwareScrollView>
                    </View>
                </Animated.View>
            </GestureDetector>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    bottomSheetContainer: {
        width: width,
        backgroundColor: apptheme.secondary,
        position: 'absolute',
        top: height,
        borderRadius: 20,
        alignItems: 'center',
        height: '100%'
    },
    lineTextContainer: {
        alignItems: 'center',
        gap: 20,
        marginBottom: 20,
        paddingVertical: 10,
        marginTop: 10,
    },
    line: {
        backgroundColor: apptheme.white,
        height: 4,
        width: 75,
        borderRadius: 100,
    },
    text: {
        color: apptheme.white,
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 20,
    },
    form: {
        flex: 1,
        backgroundColor: apptheme.secondary,
        width: '100%',
    },
    input: {
        fontSize: 16,
        color: '#fff',
    },
    inputContainer: {
        width: "80%",
        backgroundColor: "#314F33",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 15,
        marginBottom: 24,  
      },
      label: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 3,
    },
    calendarButton: {
        position: "absolute",
        right: 15,
        top: 15,
      },
    registerButton: {
        backgroundColor: apptheme.background,
        padding: 15,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
        borderRadius: 100,
        width: '70%'
    },
    textButton: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500',
        color: apptheme.white,
        letterSpacing: 1
    }
});
