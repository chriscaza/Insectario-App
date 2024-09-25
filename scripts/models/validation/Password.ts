import CryptoJS from 'crypto-js';

export default class Password {
    static isPasswordCorrect(password: string): boolean {
        // Al menos una letra myus y un numero y con una longitud de 8 caracteres minimo
        const regex: RegExp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
        return regex.test(password)
    }

    static encryptPassword(password: string): string {
        const encryptedPassword = CryptoJS.SHA256(password).toString()
        return encryptedPassword
    }

    static isPasswordEmpty(password: string): boolean {
        return password === null || password === ''
    }

    static areTheSamePassword(password: string, secondPassword: string): boolean {
        return password.toLowerCase() === secondPassword.toLowerCase()
    }
}