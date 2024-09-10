import CryptoJS from 'crypto-js';
import { Alert } from 'react-native';

export const register = async (
    username: string,
    password: string,
    email: string,
    b_Day: string
) => {
    // Android emulator http://10.0.2.2:5000/register
    // iOS emulator http://127.0.0.1:5000/register
    if(isPasswordCorrect(password)) {
        const encryptedPassword = encryptPassword(password)
        try {
            const response = await fetch('http://10.0.2.2:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(({
                    values: {
                        username: username,
                        password: encryptedPassword,
                        email: email,
                        bDay: b_Day
                    },
                }))
            })
            const data = await response.json()
            if(response.status === 200) {
                Alert.alert(data.msg)
            } else {

            }
        } catch (error) {
            console.log('Error')
        }
    } else {
        Alert.alert('Contrasena incorrecta')
    }
}

export const login = async () => {

}

function isPasswordCorrect(password: string): boolean {
    const regex: RegExp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
    return regex.test(password)
}

function isFormEmpty(user: string, mail: string, bDay: string): boolean {
    return false
}

function encryptPassword(password: string): string {
    const encryptedPassword = CryptoJS.SHA256(password).toString()
    return encryptedPassword
}