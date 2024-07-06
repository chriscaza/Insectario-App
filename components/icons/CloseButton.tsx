import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CloseButtonProps {
    icon: keyof typeof Ionicons.glyphMap,
    onPress?: () => void,
}

export default function CloseButton({icon, onPress}: CloseButtonProps) {
    return (
        <Pressable 
        style={styles.button}
        onPress={onPress}>
          <Ionicons 
          name={icon}
          size={35} 
          color="white"/>
      </Pressable> 
    );
}

const styles = StyleSheet.create({
    button: {
        width: 40, 
        height: 40, 
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 50,
        justifyContent: 'center', 
        alignItems: 'center', 
        right: 30, 
        top: 30
    }
})