import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, ReactNode, useEffect, Children } from "react";

interface User {
    id: number,
    username: string,
    email: string,
    bDay: string
}

interface UserContextType {
    user: User | null,
    setUser: ( user: User ) => void,
    logOut: () => void,
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode}) {

    const [ user, setUserState ] = useState<User | null>(null)

    const setUser = async( user: User ) => {
        setUserState(user)
        try {
            await AsyncStorage.setItem('@user', JSON.stringify(user))
        } catch (error) {
            console.log('Error al guarar el usuario en AsyncStorage', error)            
        }
    }

    const logOut = async() => {
        setUserState(null)
        try {
            await AsyncStorage.removeItem('@user')
        } catch (error) {
            console.log('Error al remover el usuario en AsyncStorage', error)
        }
    }

    useEffect(() => {
        const loadUser = async() => {
            try {
                const storedUser = await AsyncStorage.getItem('@user')
                if (storedUser) {
                    setUserState(JSON.parse(storedUser))
                }
            } catch (error) {
                console.log('Error al cargar el usuario desde AsyncStorage', error)
            }
        }
        loadUser()
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, logOut }}>
            {children}
        </UserContext.Provider>
    )
}