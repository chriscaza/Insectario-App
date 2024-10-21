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
        >
        <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalTextContainer}>
                        <Text style={styles.modalMessage}>{message}</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.modalButton}>
                        <Pressable onPress={onClose} style={styles.modalButton}>
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
    modalTextContainer: {
        flex: 2,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalMessage: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'medium',
        color: 'white',
        marginVertical: 10,
    },
    modalButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
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