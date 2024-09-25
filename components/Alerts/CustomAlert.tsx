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
                        <Pressable style={styles.modalButton} onPress={onClose}>
                            <Text style={styles.modalButtonText}>OK</Text>
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
        width: width*0.75,
        height: width*0.38,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        alignItems: 'center',
        overflow: 'hidden'
    },
    modalButtonTextContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    modalMessage: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    modalButton: {
        alignItems: 'center',
        width: '45%',
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#314F33'
    },
    modalButtonText: {
        color: '#FFF',
        fontSize: 16,
    }
})