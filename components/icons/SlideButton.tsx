import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from '@expo/vector-icons'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    Extrapolation,
} from "react-native-reanimated";

import apptheme from "@/themes/apptheme";

interface SlidingButtonProps {
    onSwipeComplete: () => void
}

const BUTTON_HEIGHT = 150;
const BUTTON_WIDTH = 75;
const BUTTON_PADDING = 5; 
const SWIPEABLE_AREA = BUTTON_WIDTH - 2 * BUTTON_PADDING;

export default function SlidingButton({ onSwipeComplete} : SlidingButtonProps) {

    const translateY = useSharedValue(0);

    const slideButtonGesture = Gesture.Pan()
    .onUpdate((event) => {
        translateY.value = Math.max(-(BUTTON_HEIGHT - SWIPEABLE_AREA), Math.min(0, event.translationY));
    })
    .onEnd(() => {
        if(translateY.value > -(BUTTON_WIDTH/2 - BUTTON_PADDING/2)) {
            translateY.value = withSpring(0);
        } else {
            translateY.value = withSpring(-BUTTON_HEIGHT/2);
            // onSwipeComplete();
        }
    });

    const animatedStyles = {
        swipeable: useAnimatedStyle(() => {
            return {
                transform: [{
                    translateY: translateY.value,
                }],
            };
        }),
        clearText: useAnimatedStyle(() => {
            const opacity = interpolate(
                translateY.value, [-(BUTTON_HEIGHT - SWIPEABLE_AREA), 0], [-1, 1],
                Extrapolation.CLAMP
            );
            return {
                opacity,
            };
        }),
    };

    return(
        <GestureDetector gesture={ slideButtonGesture }>
            <LinearGradient 
            colors={[ 'rgba(255, 255, 255, 0.00) 0%', 'rgba(255, 255, 255, 0.70) 100%)' ]}
            style={styles.gradientButton}>
                <View style={styles.arrows}>
                    <FontAwesome name="chevron-up" size={24} color={'rgba(255, 255, 255, 0.3)'}></FontAwesome>
                    <FontAwesome name="chevron-up" size={24} color={'rgba(255, 255, 255, 1)'}></FontAwesome>
                </View>
                <Animated.View style={[ styles.button, animatedStyles.swipeable ]}>
                    <Animated.Text style={[styles.textButton, animatedStyles.clearText]}>Go</Animated.Text>
                </Animated.View>
            </LinearGradient>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    gradientButton: {
        height: 150,
        width: BUTTON_WIDTH,
        padding: BUTTON_PADDING,
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
        width: SWIPEABLE_AREA,
        height: SWIPEABLE_AREA,
        borderRadius: 50,
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