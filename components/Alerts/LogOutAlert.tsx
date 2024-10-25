import { UserContext } from "@/global/user/UserContent";
import apptheme from "@/themes/apptheme";
import { router } from "expo-router";
import React, { useContext } from "react";
import { 
    Modal,
    StyleSheet,
    View,
    Text,
    Pressable,
    InteractionManager,
    Dimensions
} from "react-native";

interface LogOutAlertProps {
    visible: boolean,
    onClose: () => void,
}

const { width } = Dimensions.get('window')

export default function LogOutAlert({ visible, onClose }: LogOutAlertProps) {
    const userContext = useContext(UserContext)

    const handleLogOut = () => {
        if(userContext) {
            userContext.logOut()
            onClose()
            InteractionManager.runAfterInteractions(() => {
                router.replace('/(auth-flow)/LoginScreen')
            })
        } else {
            console.log('No usuario loggueado')
        }
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
                        <Text style={styles.message}>¿Salir de tu cuenta?</Text>
                    </View>
                    <Pressable onPress={onClose} style={styles.optionsContainer}>
                        <Text style={styles.options}>Cancelar</Text>
                    </Pressable>
                    <Pressable onPress={handleLogOut} style={styles.optionsContainer}>
                        <Text style={[styles.options, {color: '#fff'}]}>Salir</Text>
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
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    alertContainer: {
        width: width*0.65,
        height: width*0.42,
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#333'
    },
    messageContainer: {
        flex: 2,
        width: '100%',
        justifyContent: 'center',
        marginVertical: 10
    },
    message: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'medium',
    },
    optionsContainer: {
        flex: 1,
        borderTopColor: 'rgba(179, 179, 179, 0.5)',
        borderTopWidth: 0.5,
        width: '100%',
        justifyContent: 'center',
        paddingVertical: 10
    },
    options: {
        fontSize: 16,
        textAlign: 'center',
        color: '#3478F6'
    }
})