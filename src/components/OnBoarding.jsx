import React, { useState } from "react"
import { View, Text,TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native"
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get('window');

const OnBoarding = () => {
    const navigation = useNavigation();
    const [componentIndex, setComponentIndex] = useState(0);


    const handleButtonPress = () => {
        setComponentIndex((prevIndex) => (prevIndex + 1) % 4);

        if(componentIndex === 2) {
            navigation.navigate('HomeScreen')
        }
    };

    return (
        <View style={styles.container}>

            {
                componentIndex === 0 ? (
                    <Image source={require('../assets/onboarding/1.png')} style={styles.image} />
                )
                : componentIndex === 1 ? (
                    <Image source={require('../assets/onboarding/2.png')} style={styles.image} />
                )
                : componentIndex === 2 ? (
                    <Image source={require('../assets/onboarding/3.png')} style={styles.image} />
                )
                : (
                    <Image source={require('../assets/onboarding/4.png')} style={styles.image} />
                )
            }

            <View style={{width: '100%', alignItems: 'center', paddingHorizontal: 15, paddingBottom: 40}}>
                <View style={styles.infoContainer}>
                    
                    {
                    componentIndex === 0 && (
                        <Text style={styles.title}>
                            {
                                componentIndex === 0 ? 'Welcome to Panda Catch!'
                                : componentIndex === 1 ? 'Catch bamboo to earn points!' 
                                : componentIndex === 2 ? 'Your panda has three lives.'
                                : 'Ready?'
                            }
                        </Text>
                    ) 
                    }

                    <Text style={styles.text}>
                            {
                                componentIndex === 0 ? 'Help the cute panda collect as much bamboo as possible, avoid the falling rocks, and unlock exciting new stories!'
                                : componentIndex === 1 ? 'Avoid the rocks as they reduce your health. The more bamboo you catch, the higher your score!' 
                                : componentIndex === 2 ? 'Use your points to purchase fun stories about pandas and bamboo!'
                                : 'Let’s start collecting bamboo! Play, catch, and unlock new adventures!'
                            }
                    </Text>

                </View>

                <TouchableOpacity style={styles.btn} onPress={handleButtonPress}>
                    <LinearGradient
                        colors={['#ffbd60', '#ec9925']}
                        style={styles.btn} 
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 0 }}
                    >
                        <Text style={styles.btnText}>{
                            componentIndex === 0 ? 'Start' : 
                            componentIndex === 3 ? 'Let`s go!' :
                            'Next'
                        }</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#558c0c',
    },

    image: {
        width: width,
        height: width,
        resizeMode: 'cover',
    },

    infoContainer: {
        width: '100%',
        paddingHorizontal: 27,
        paddingVertical: 20,
        alignItems: 'center',
        marginBottom: 11,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#0d430a',
        backgroundColor: '#9eca64'
    },

    title: {
        fontWeight: '500',
        fontSize: 22,
        color: '#db151a',
        marginBottom: 10,
        lineHeight: 50,
    },

    text: {
        fontWeight: '400',
        fontSize: 17,
        color: '#000',
        marginBottom: 10,
        lineHeight: 20.72,
    },

    btn: {
        width: '100%',
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22,
        borderWidth: 0.5,
        borderColor: '#b56a00'
    },

    btnText: {
        fontWeight: '700',
        fontSize: 17,
        color: '#db151a',
        lineHeight: 20.72
    },

})

export default OnBoarding;