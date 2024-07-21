import apptheme from "@/themes/apptheme";
import React from "react";
import { Dimensions, Modal, StyleSheet, View, Text } from "react-native";

const { width } = Dimensions.get('screen')

interface CustomAlertProps {
    title?: string,
    message: string,
    textFirstAction: string,
    textSecondAction: string,
    firstAction?: () => void,
    secondAction?: () => void,
    visible?: boolean,
}

export default function CustomAlert({ title, message, textFirstAction, textSecondAction }: CustomAlertProps) {
    return (
        <Modal
            transparent={true}
            visible={true}
            animationType='none'
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{title}</Text>
                    </View>
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageText}>{message}</Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <View style={styles.firstButtonContainer}>
                            <Text style={styles.buttonText}>{textFirstAction}</Text>
                        </View>
                        <View style={styles.secondButtonContainer}>
                            <Text style={[styles.buttonText, {color: '#FF0000'}]}>{textSecondAction}</Text>
                        </View>
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
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    modalContainer: {
        width: width*0.7,
        height: width*0.65,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#F5F5F5',
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
        // backgroundColor: '#000'
    },
    messageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        // backgroundColor: '#C1C1C1'
    },
    buttonsContainer: {
        flex: 1,
    },
    firstButtonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: apptheme.black
    },
    secondButtonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: apptheme.black

    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    messageText: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 20,
        width: '60%'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})