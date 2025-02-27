import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const OnBoarding = () => {
    const navigation = useNavigation();
    const [step, setStep] = useState(0);

    const handleNext = () => {
        if (step < 3) {
            setStep(prevStep => prevStep + 1);
        } else {
            navigation.navigate("HomeScreeen");
        }
    };

    const images = [
        require("../assets/onboarding/1.png"),
        require("../assets/onboarding/2.png"),
        require("../assets/onboarding/3.png"),
        require("../assets/onboarding/4.png")
    ];

    const titles = [
        "Welcome to Panda Catch!",
        "Catch bamboo to earn points!",
        "Your panda has three lives",
        "Ready to play?"
    ];

    const descriptions = [
        "Help the cute panda collect as much bamboo as possible, avoid the falling rocks, and unlock exciting new stories!",
        "Avoid the rocks as they reduce your health. The more bamboo you catch, the higher your score!",
        "Use your points to purchase fun stories about pandas and bamboo!",
        "Let’s start collecting bamboo! Play, catch, and unlock new adventures!"
    ];

    return (
        <View style={styles.container}>
            <Image source={images[step]} style={styles.image} />
            <View style={{width: '100%', paddingHorizontal: 20}}>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{titles[step]}</Text>
                    <Text style={styles.text}>{descriptions[step]}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <LinearGradient
                        colors={["#ffbd60", "#ec9925"]}
                        style={styles.buttonGradient}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 0 }}
                    >
                        <Text style={styles.buttonText}>{step < 3 ? "Next" : "Let’s Play!"}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#ff00ff",
        paddingBottom: 30
    },

    image: {
        width: width,
        height: height * 0.5,
        resizeMode: "cover",
    },

    infoContainer: {
        width: "100%",
        alignItems: "center",
        padding: 20,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#0d430a",
        backgroundColor: "#9eca64",
        marginBottom: 20,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0
    },

    title: {
        fontWeight: "600",
        fontSize: 24,
        color: "#db151a",
        textAlign: "center",
        marginBottom: 10,
    },

    text: {
        fontWeight: "400",
        fontSize: 16,
        color: "#000",
        textAlign: "center",
        marginBottom: 20,
    },

    button: {
        width: "100%",
        height: 55,
        borderRadius: 20,
        overflow: "hidden",
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 0,
    },

    buttonGradient: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        fontWeight: "700",
        fontSize: 18,
        color: "#db151a",
    },
    
});

export default OnBoarding;
