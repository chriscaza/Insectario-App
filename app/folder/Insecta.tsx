import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import {
    Dimensions,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View 
} from "react-native";
import Animated, { 
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { insectaOrders } from "@/global/classes";
import apptheme from "@/themes/apptheme";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


interface InsectaProps {
    visible: boolean,
    onClose: ()=> void,
}

const { width, height } = Dimensions.get('screen')

const renderItem = ({ item }: { item: string }) => (
    <View 
        style={{
            width: width/3,
        }}
    >
        <View style={{width: 'auto'}}>
            <TouchableOpacity style={{alignItems: 'center'}}>
                <MaterialIcons name="folder" size={115} color={apptheme.primary} />
                <View 
                    style={{
                        alignSelf: 'center',
                        position: 'absolute',
                        width: 96,
                        height: 60,
                        bottom: 19,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: 'rgba(255, 255, 255, 0.4)',
                        overflow: 'hidden',
                        backgroundColor: apptheme.secondary
                    }}/>
                <Text 
                    numberOfLines={1}
                    style={{
                        color: '#FFF',
                        fontSize: 14,
                        position: 'absolute',
                        bottom: 25,
                        width: 85,
                        textAlign: 'left',
                    }}
                >
                    {item}
                </Text>
            </TouchableOpacity>
        </View>
    </View>
)

export default function Insecta({ visible, onClose }: InsectaProps) {

    const translateX = useSharedValue(visible ? 0 : width)
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: -translateX.value }]
        }
    })

    useEffect(() => {
        translateX.value = withSpring(visible ? 0 : width, {damping: 20})
    }, [visible])

    return (
        <Animated.View style={[ styles.modal, animatedStyle]}>
            <LinearGradient
                colors={["#98D798", "#507150"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{flex: 1}}
            >
                <SafeAreaView style={{flex: 1}}>
                    <View style={styles.topContainer}>
                        <TouchableOpacity style={styles.icons} onPress={onClose}>
                            <Ionicons name="camera-outline" size={28} color='white' />
                        </TouchableOpacity>
                        <View style={styles.classes}>
                            <Pressable>
                                <Text style={[styles.title, {fontWeight: '700'}]}>INSECTA</Text>
                            </Pressable>
                            <Pressable>
                                <Text style={styles.title}>ARACHNIDA</Text>
                            </Pressable>
                        </View>
                        <TouchableOpacity style={styles.icons}>
                            <MaterialIcons name="exit-to-app" size={28} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.folderContainer}>
                        <FlatList 
                            data={insectaOrders}
                            renderItem={renderItem}
                            keyExtractor={(order) => order}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.flatList}
                        />
                    </View>
                </SafeAreaView>
            </LinearGradient>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        width: width,
        height: height,
        transform: [{ translateX: width}]
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 30,
        height: 'auto',
    },
    classes: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    icons: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    folderContainer: {
        flex: 1,
        paddingTop: 30,
        marginBottom: 25,
    },
    flatList: {
        gap: 20,        
    },
    title: {
        color: '#FFF',
        fontSize: 20,
    }
})