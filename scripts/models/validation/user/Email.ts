export default class Email {
    static isEmailCorrect(email: string): boolean {
        const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return regex.test(email)
    }

    static isEmailEmpty(email: string): boolean {
        return email === null || email === ''
    }
}