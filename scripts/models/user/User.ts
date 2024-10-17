import Password from "../validation/Password"
import BDay from "../validation/BDay"
import { UserValidator } from "./UserValidator"

<<<<<<< HEAD
const ip = 'http://192.168.137.31:3001'
=======
const ip = 'http://143.110.231.124:5000/'
>>>>>>> 0f26474e0566bfb1b4c0442147aff4d40c96a57f

export default class User {
    static async register(username: string, email: string, password: string, bDay: string) {

        const validation = UserValidator.validateRegister(email, password, bDay)
        if(!validation.success) return validation

        bDay = BDay.formatDate(bDay)
        password = Password.encryptPassword(password)

        try {
<<<<<<< HEAD
            const response = await fetch(`${ip}/register`, {
=======
            const response = await fetch(`${ip}register`, {
>>>>>>> 0f26474e0566bfb1b4c0442147aff4d40c96a57f
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    values: {
                        username: username,
                        password: password,
                        email: email,
                        bDay: bDay,
                    },
                }),
            });
            const data = await response.json();
            if (response.ok) {
                return { message: data.msg, success: true };
            } else {
                return { message: data.msg, success: false };
            }
        } catch {
            return { message: 'Error en la solicitud, por favor intente de nuevo', success: false };
        }
    }

    static async login(email: string, password: string) {
        
        const validation = UserValidator.validateLogin(email, password)
        if(!validation.success) return validation

        password = Password.encryptPassword(password)
        
        try { 
<<<<<<< HEAD
            const response = await fetch(`${ip}/`, {
=======
            const response = await fetch(ip, {
>>>>>>> 0f26474e0566bfb1b4c0442147aff4d40c96a57f
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    values: {
                        email: email,
                        password: password
                    },
                }),
            });
            const data = await response.json()
            if (response.ok) {
                // Manejar informacion del usuario cuando se loguee
                console.log(data.user.username)
                console.log(data.user.email)
                console.log(data.user.bDay)
                return { message: data.msg, success: true }
            } else {
                return { message: data.msg, success: false }
            }
        } catch {
            return { message: 'Error en la solicitud, por favor intente de nuevo', success: false }
        }
    }

    static async changePassword(account: string | string[], password: string, newPassword: string) {
        const validate = UserValidator.validatePassword(password, newPassword)
        if (!validate.success) return validate

        password = Password.encryptPassword(password)
        newPassword = Password.encryptPassword(newPassword)
 
        try {
<<<<<<< HEAD
            const response = await fetch(`${ip}/password`, {
=======
            const response = await fetch(`${ip}password`, {
>>>>>>> 0f26474e0566bfb1b4c0442147aff4d40c96a57f
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    values: {
                        account: account,
                        password: password,
                        newPassword: newPassword,
                    },
                })
            })
            const data = await response.json()
            if (response.ok) {
                return { message: data.msg, success: true }
            } else {
                return { message: data.msg, success: false }
            }
        } catch {
            return { message: 'Error en la solicitud, por favor intente de nuevo', success: false };
        }
    }
}