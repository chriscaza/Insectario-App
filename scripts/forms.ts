import CryptoJS from 'crypto-js';
import { router } from 'expo-router';
import { Alert } from 'react-native';

export const register = async (
    username: string,
    password: string,
    email: string,
    b_Day: string
) => {
    if(!isUserCorrect(username)) {
        Alert.alert('Usuario incorrecto')
        return
    }
    if(!isPasswordCorrect(password)) {
        Alert.alert('Contraseña incorrecta')
        return
    }
    if(!isEmailCorrect(email)) {
        Alert.alert('Correo incorrecto')
        return
    }
    if(isDateEmpty(b_Day)) {
        Alert.alert('Fecha vacía')
        return
    }
    
    b_Day = formatDate(b_Day)
    const encryptedPassword = encryptPassword(password)

    try {
        const response = await fetch('http://192.168.0.129:3001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                values: {
                    username: username,
                    password: encryptedPassword,
                    email: email,
                    bDay: b_Day
                },
            })
        })
        const data = await response.json()
        if(response.status === 201) {
            Alert.alert(data.msg)
        } else {
            Alert.alert(data.msg)
        }
    } catch (error) {
        console.log(error)
    }

}

export const login = async (email: string, password: string) => {
    if (!isEmailCorrect(email) || isPasswordEmtpy(password)) {
        Alert.alert('Favor de llenar los campos correctamente')
        return
    }

    const encryptedPassword = encryptPassword(password)
    try {
        const respone = await fetch('http://192.168.0.129:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                values: {
                    password: encryptedPassword,
                    email: email,
                },
            })
        })
        const data = await respone.json()
        if(respone.status === 200) {
            router.replace('/(camera)/TakePhoto')
        } else {
            Alert.alert(data.msg)
        }
    } catch (error) {
        console.log(error)
    }
}

function isPasswordCorrect(password: string): boolean {
    // Al menos una letra myus y un numero y con una longitud de 8 caracteres minimo
    const regex: RegExp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
    return regex.test(password)
}

function isPasswordEmtpy(password: string): boolean {
    return password === ''
}

function encryptPassword(password: string): string {
    const encryptedPassword = CryptoJS.SHA256(password).toString()
    return encryptedPassword
}

function isEmailCorrect(email: string): boolean {
    const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email)
}

function isUserCorrect(username: string): boolean {
    const regex: RegExp = /^[a-zA-Z0-9]{3,}$/
    return regex.test(username)
}

function isDateEmpty(bDay: string): boolean{
    return bDay === ''
}

function formatDate(bDay: string) : string {
    const [d, m, a] = bDay.split('/');

    // Asegurar que el día y el mes siempre tengan dos dígitos
    const day = d.padStart(2, '0');
    const month = m.padStart(2, '0');
    
    // Crear la fecha correctamente y formatearla
    return new Date(`${a}-${month}-${day}`).toISOString().split('T')[0];
}