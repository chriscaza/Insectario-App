import Password from "../validation/Password"
import BDay from "../validation/BDay"
import { UserValidator } from "./UserValidator"

export default class User {
    static async register(username: string, email: string, password: string, bDay: string) {

        const validation = UserValidator.validateRegister(email, password, bDay)
        if(!validation.success) return validation

        bDay = BDay.formatDate(bDay)
        password = Password.encryptPassword(password)

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
            const response = await fetch('http://192.168.0.129:3001/', {
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
            const response = await fetch('http://192.168.0.129:3001/password', {
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