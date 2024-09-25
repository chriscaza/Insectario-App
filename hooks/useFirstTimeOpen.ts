import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'

export function useFirstTimeOpen() {
    const [ isFirstTime, setIsFirstTime ] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    useEffect(() => {
        async function checkFirstTimeOpen() {
            try {
                const hasOpened = await AsyncStorage.getItem('hasOpened');

                if(hasOpened === null) {
                    setIsFirstTime(true);
                } else {
                    setIsFirstTime(false);
                }
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        checkFirstTimeOpen();
    }, [])

    return { isFirstTime, isLoading };
}