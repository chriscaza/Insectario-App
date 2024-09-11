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
            const response = await fetch('http://192.168.0.239:5000/register', {
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
            console.log(error)
        }
    } else {
        Alert.alert('Contrasena incorrecta')
    }
}

export const login = async () => {

}

function isPasswordCorrect(password: string): boolean {
    // Al menos una letra myus y un numero y con una longitud de 8 caracteres minimo
    const regex: RegExp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
    return regex.test(password)
}

function isEmailCorrect(email: string): boolean {
    const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email)
}

function isUserCorrect(username: string): boolean {
    // Al menos una letra (mayus o minus) un numero (opcional) y con una longitud de tres caracteres minimo
    const regex: RegExp = /^(?=.*[A-Za-z])[A-Za-z0-9]{3,}$/
    return regex.test(username)
}

function encryptPassword(password: string): string {
    const encryptedPassword = CryptoJS.SHA256(password).toString()
    return encryptedPassword
}