import apptheme from "@/themes/apptheme";
import React from "react";
import { 
    Modal,
    StyleSheet,
    View,
    Text,
    Pressable,
    Dimensions,
} from "react-native";

const { width } = Dimensions.get('window')

interface customAlertProps {
    visible: boolean,
    message: string,
    onClose: () => void,
}

export default function customAlert({ visible, message, onClose }: customAlertProps) {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="none"
            onRequestClose={onClose}
        >
        <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalButtonTextContainer}>
                        <Text style={styles.modalMessage}>{message}</Text>
                        <View style={styles.separator} />
                        <Pressable style={styles.modalButton} onPress={onClose}>
                            <Text style={styles.modalButtonText}>Listo</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )

}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    modalContainer: {
        width: width*0.65,
        height: width*0.30,
        backgroundColor: '#333',
        borderRadius: 20,
        alignItems: 'center',
        overflow: 'hidden'
    },
    modalButtonTextContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    modalMessage: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'medium',
        color: 'white',
        marginVertical: 10
    },
    modalButton: {
        alignItems: 'center'
    },
    modalButtonText: {
        color: '#3478F6',
        fontSize: 16
    },
    separator: {
        width: '100%',
        height: 0.5,
        backgroundColor: 'rgba(179, 179, 179, 0.5)'
    }
})