import apptheme from "@/themes/apptheme";
import { router } from "expo-router";
import React from "react";
import { 
    Modal,
    StyleSheet,
    View,
    Text,
    Pressable,
    InteractionManager,
} from "react-native";

interface LogOutAlertProps {
    visible: boolean,
    onClose: () => void,
}

export default function LogOutAlert({ visible, onClose }: LogOutAlertProps) {

    const handleLogOut = () => {
        onClose()
        InteractionManager.runAfterInteractions(() => {
            router.replace('/(home)/LogIn')
        })
    }


    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="none"
        >
            <View style={styles.moadlContainer}>
                <View style={styles.alertContainer}>
                    <View style={styles.messageContainer}>
                        <Text style={styles.message}>¿Quieres cerrar sesión?</Text>
                    </View>
                    <Pressable onPress={onClose} style={styles.optionsContainer}>
                        <Text style={styles.options}>Cancelar</Text>
                    </Pressable>
                    <Pressable onPress={handleLogOut} style={styles.optionsContainer}>
                        <Text style={[styles.options, {color: '#FF0000'}]}>Salir</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    moadlContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    alertContainer: {
        width: 250,
        height: 150,
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#FFF'
    },
    messageContainer: {
        flex: 2,
        width: '100%',
        justifyContent: 'center',
    },
    message: {
        color: '#000',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '600',
    },
    optionsContainer: {
        flex: 1,
        borderTopColor: '#000',
        borderTopWidth: 1,
        width: '100%',
        justifyContent: 'center',
    },
    options: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
    }
})