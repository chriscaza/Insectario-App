import apptheme from '@/themes/apptheme';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View, StyleSheet, ActivityIndicator, Platform } from 'react-native';



export default function LogIn() {

    const [ fontsLoaded ] = useFonts({
        'Roboto-Regular': require('@/assets/fonts/Roboto-Regular.ttf'),
      });
    
      if(!fontsLoaded) {
        return <ActivityIndicator />
      }

    return (
        <LinearGradient style={styles.container} colors={['rgb(152, 215, 152) 0%', 'rgb(80, 113, 80) 100%']}>
            <View style={styles.inputContainer}>
                <Text style={styles.header}>Iniciar sesión</Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: apptheme.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        ...StyleSheet.absoluteFillObject
    },
    inputContainer: {
    },
    header: {
        fontFamily: 'Roboto-Regular',
        fontWeight: 400,
        color: apptheme.white,
        fontSize: 26,
        
    },
});