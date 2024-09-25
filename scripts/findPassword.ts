export const seekUser = async(account: string) => {
    if(account === '') return { message: 'Usuario o correo vacío', success: false }

    try {
        const response = await fetch('http://192.168.0.129:3001/checkAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                values: {
                    account: account
                },
            }),
        })
    if (response.ok) {
        return { success: true, message: null };
    } else {
        return { success: false, message: null };
    }
    } catch (error) {
        return { message: 'Error en la solicitud, por favor intente de nuevo', success: false }
    }

}