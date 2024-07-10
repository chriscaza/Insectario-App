import apptheme from "@/themes/apptheme";
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
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

const { width, height } = Dimensions.get('window');

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
    const MAX_TRANSLATE_Y = -height+70
    const MIN_TRANSLATE_Y = -height/8.5

    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value }
        })
        .onUpdate((event) => {
            translateY.value = event.translationY + context.value.y,
            translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
        })
        .onEnd(() => {
            if (translateY.value > -height / 3) {
                translateY.value = withSpring(MIN_TRANSLATE_Y, { damping: 50 });
            } else if (translateY.value < -height / 1.5) {
                translateY.value = withSpring(MAX_TRANSLATE_Y, { damping: 50 });
            } 
            });
        
        useEffect(() => {
            translateY.value = withSpring(MIN_TRANSLATE_Y, {damping: 50})
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
                    <ScrollView 
                        showsVerticalScrollIndicator={false} 
                        style={styles.form}
                        contentContainerStyle={{ 
                            flexGrow: 1,
                            alignItems: 'center',
                            gap: 20,
                            height: height
                        }}
                    >
                        <TextInput
                            style={styles.input}
                            placeholder="Arachnida"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            value={clas}
                            onChangeText={setClas}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Araneae"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            value={order}
                            onChangeText={setOrder}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Spider"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="20.698808997601578, -103.33158..."
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            value={location}
                            onChangeText={setLocation}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Forest"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            value={habitat}
                            onChangeText={setHabitat}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="12:30"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            value={hour}
                            onChangeText={setHour}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Black with red dot"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            value={details}
                            onChangeText={setDetails}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Under a rock"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            value={observations}
                            onChangeText={setObservations}
                        />
                        <TouchableOpacity style={styles.registerButton}>
                            <Text style={styles.textButton}>Registrar</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </Animated.View>
            </GestureDetector>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    bottomSheetContainer: {
        height: height,
        width: '100%',
        backgroundColor: apptheme.secondary,
        position: 'absolute',
        top: height,
        borderRadius: 20,
        alignItems: 'center',
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
        width: '80%',
        textAlign: 'left',
        paddingLeft: 10,
        backgroundColor: '#314F33',
        height: 60,
        borderRadius: 10,
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
