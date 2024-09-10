import CryptoJS from 'crypto-js';

export const register = async (
    username: string,
    password: string,
    email: string,
    b_Day: string
) => {
    const encryptedPassword = encryptPassword(password)
    console.log('Contrasena CLIENTE:', {encryptedPassword})
    try {
        const response = await fetch('http://127.0.0.1:5000/register', {
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
        if(response.status === 200) {
            
        } else {

        }
    } catch (error) {
        
    }
}

export const login = async () => {

}

function encryptPassword(password: string): string {
    const encryptedPassword = CryptoJS.SHA256(password).toString()
    return encryptedPassword
}