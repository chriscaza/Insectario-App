import BDay from "../validation/BDay"
import Email from '../validation/Email';
import Password from '../validation/Password';

export class UserValidator {
    static validateRegister(email: string, password: string, bDay: string) {
        if (!Password.isPasswordCorrect(password) || Password.isPasswordEmpty(password)) {
            return { message: 'Contraseña incorrecta', success: false }
        }
        if (!Email.isEmailCorrect(email) || Email.isEmailEmpty(email)) {
            return { message: 'Correo incorrecto', success: false}
        }
        if (BDay.isBDayEmpty(bDay)) {
            return { message: 'Fecha vacía', success: false }
        }

        return { message: '', success: true}
    }

    static validateLogin(email: string, password: string) {
        if (Email.isEmailEmpty(email) || Password.isPasswordEmpty(password)) {
            return {message: 'Favor de llenar los campos', success: false }
        }

        return { message: '', success: true }
    }
}