import Password from "../validation/Password"
import BDay from "../validation/BDay"
import { UserValidator } from "./UserValidator"
import { UserContext } from "../../../global/user/UserContent"
import axios from 'axios'
import { useContext } from "react"

// const ip = 'http://143.110.231.124:5000/'
const ip = 'http://192.168.0.129:5000/'

const userContext = useContext(UserContext)

export default class User {
    static async register(username: string, email: string, password: string, bDay: string) {

        const validation = UserValidator.validateRegister(email, password, bDay)
        if(!validation.success) return validation

        bDay = BDay.formatDate(bDay)
        password = Password.encryptPassword(password)

        try {
            const response = await axios.post(`${ip}register`, {
                values: {
                    username: username,
                    password: password,
                    email: email,
                    bDay: bDay,
                },
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
        
            if (response.status === 200) {
                return { message: response.data.msg, success: true };
            } else {
                return { message: response.data.msg, success: false };
            }
        } catch (error) {
            return { message: 'Error en la solicitud, por favor intente de nuevo', success: false };
        }        
    }

    static async login(email: string, password: string, setUser: (user: any) => void) {
        const validation = UserValidator.validateLogin(email, password)
        if(!validation.success) return validation

        password = Password.encryptPassword(password)
        
        try {
            const response = await axios.post(`${ip}`, {
                values: {
                    email: email,
                    password: password,
                },
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            if (response.status === 200) {
                setUser({
                    id: response.data.user.id,
                    username: response.data.user.username,
                    email: response.data.user.email,
                    bDay: response.data.user.bDay
                })
                console.log(response.data.user.id, response.data.user.username, response.data.user.email)
                return { message: response.data.msg, success: true }
            } else {
                return { message: response.data.msg, success: false }
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
            const response = await axios.post(`${ip}password`, {
                values: {
                    account: account,
                    password: password,
                    newPassword: newPassword,
                },
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
        
            if (response.status === 200) {
                return { message: response.data.msg, success: true };
            } else {
                return { message: response.data.msg, success: false };
            }
        } catch (error) {
            return { message: 'Error en la solicitud, por favor intente de nuevo', success: false };
        }        
    }
}