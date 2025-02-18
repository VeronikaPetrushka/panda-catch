import React, { useState, useEffect } from "react"
import { View, Text, Image, StyleSheet, Dimensions, Animated } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import tips from "../constants/tips";
import Menu from "./Menu";

const { height } = Dimensions.get('window');

const Home = () => {
    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState('0000');
    const [start, setStart] = useState(false);
    const [currentTipIndex, setCurrentTipIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [fadeAnim] = useState(new Animated.Value(1));
    const navigation = useNavigation();

    useEffect(() => {
        loadScore();
    }, []);

    const loadScore = async () => {
        const storedScore = await AsyncStorage.getItem("score");
        if (storedScore !== null) {
            setScore(parseInt(storedScore));
        }
    
        const storedScores = await AsyncStorage.getItem("scoreRecords");
        if (storedScores !== null) {
            const scores = JSON.parse(storedScores);
            const maxScore = Math.max(...scores, 0);
            setMaxScore(maxScore);
        } else {
            setMaxScore('0000');
        }
    };
    
    const startToggle = () => {
        if (start) {
            setStart(false);
            setCurrentTipIndex(0);
            setProgress(0);
        } else {
            setStart(true);
            startDisplayingTips();
        }
    };

    const startDisplayingTips = () => {
        fadeInNextTip();

        const tipInterval = setInterval(() => {
            if (currentTipIndex < tips.length - 1) {
                setCurrentTipIndex((prev) => prev + 1);
                fadeInNextTip();
            } else {
                clearInterval(tipInterval);
            }
        }, 5000);

        const totalDuration = 20000;
        const intervalDuration = 200;
        let progressIncrement = totalDuration / intervalDuration;
        let currentProgress = 0;

        const progressInterval = setInterval(() => {
            currentProgress += 1;
            setProgress((currentProgress / progressIncrement) * 100);

            if (currentProgress >= progressIncrement) {
                clearInterval(progressInterval);
                navigation.navigate('PandaScreen');
            }
        }, intervalDuration);

        return () => {
            clearInterval(tipInterval);
            clearInterval(progressInterval);
        };
    };

    const fadeInNextTip = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/back/2.png')} style={{width: '100%', height: '100%', position: 'absolute'}} />

            <View style={styles.scoreContainer}>
                <Image source={require("../assets/game/bamboo.png")} style={styles.bambooIcon} />
                <Text style={styles.score}>{score}</Text>
            </View>

            <View style={{height: 200}} />

            {
                start ? (
                    <View style={{width: '100%', alignItems: 'center', paddingBottom: 100}}>
                        <View style={{height: 87}} />
                        <Text style={styles.title}>Loading, please wait ...</Text>
                        <View style={styles.progressContainer}>
                            <View style={styles.progressBackground}>
                                <View style={[styles.progressFill, { width: `${progress}%` }]} />
                            </View>
                        </View>
                        {start && currentTipIndex < tips.length && (
                            <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
                                <Text style={[styles.title, {color: '#db151a'}]}>Tip #{currentTipIndex + 1}</Text>
                                <Text style={styles.tip}>{tips[currentTipIndex]}</Text>
                            </Animated.View>
                        )}
                    </View>
                ) : (
                    <View style={{width: '100%', alignItems: 'center', paddingBottom: 100}}>
                        <Image source={require('../assets/game/crown.png')} style={{width: 60, height: 60, resizeMode: 'contain', marginBottom: 5}} />
                        <Text style={styles.maxScoreText}>Max score:</Text>
                        <View style={[styles.maxScoreContainer, {marginBottom: 10}]}>
                            <LinearGradient
                                colors={['#ffbd60', '#ec9925']}
                                style={styles.maxScoreContainer} 
                                start={{ x: 1, y: 0 }}
                                end={{ x: 0, y: 0 }}
                            >
                                <Text style={styles.score}>{maxScore}</Text>
                            </LinearGradient>
                        </View>
                        {!start && currentTipIndex === 0 && (
                            <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
                                <Text style={[styles.title, {color: '#db151a'}]}>Tip #1</Text>
                                <Text style={styles.tip}>{tips[0]}</Text>
                            </Animated.View>
                        )}
                    </View>
                )
            }

            <View style={styles.menu}>
                <Menu start={startToggle} />
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ff00ff',
        justifyContent: 'space-between',
    },

    scoreContainer: {
        paddingVertical: 5,
        paddingHorizontal: 19,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#db151a",
        backgroundColor: "#f0a031",
        flexDirection: "row",
        alignItems: "center",
        position: 'absolute', 
        top: height * 0.07,
        right: 30,
        borderTopRightRadius: 0,
    },

    bambooIcon: {
        width: 36,
        height: 36,
        marginRight: 6,
    },

    score: {
        fontSize: 26,
        fontWeight: "900",
        color: "#db151a",
    },

    maxScoreText: {
        fontSize: 26,
        fontWeight: "600",
        color: "#fff",
        lineHeight: 35.5,
        textAlign: 'center',
        marginBottom: 15
    },

    maxScoreContainer: {
        width: 277,
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22,
        borderWidth: 0.5,
        borderColor: '#b56a00',
    },

    card: {
        width: '85%',
        borderRadius: 24,
        borderWidth: 2,
        borderColor: "#0d430a",
        backgroundColor: "#9eca64",
        marginBottom: 12,
        paddingVertical: 25,
        paddingHorizontal: 8,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0
    },

    title: {
        fontSize: 22,
        fontWeight: "500",
        color: "#ec9925",
        marginBottom: 25,
        textAlign: 'center'
    },

    tip: {
        fontSize: 14,
        fontWeight: "400",
        color: "#000",
        lineHeight: 17.07,
        textAlign: 'center'
    },

    progressContainer: {
        width: '75%',
        height: 32,
        marginBottom: 20,
        borderRadius: 100,
        overflow: 'hidden'
    },

    progressBackground: {
        width: '100%',
        height: '100%',
        backgroundColor: '#9eca64',
        borderRadius: 100,
    },

    progressFill: {
        height: '100%',
        backgroundColor: '#ffac37',
        borderRadius: 5,
    },

    menu: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0
    }
    
});

export default Home;