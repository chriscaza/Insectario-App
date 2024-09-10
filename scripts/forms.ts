import CryptoJS from 'crypto'

interface registerProps {
    username: string,
    password: string,
    email: string,
    b_Day: string,
}

export const register = async ({
    username, password, email, b_Day
}: registerProps) => {
    const encryptedPassword = encryptPassword(password)
    const response = await fetch('', {
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
}

export const login = async () => {

}

function encryptPassword(password: string): string {
    const secretKey = 'ee7284e11d38d59a3b03010c1654c0becaa69f29a413774603f56b8e1a85639f'
    const encryptedPassword = CryptoJS.createHmac('sha256', secretKey).toString()
    return encryptedPassword
}