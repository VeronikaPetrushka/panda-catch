import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

const Personal = () => {
    const navigation = useNavigation();
    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState('0000');
    const [unlockedStories, setUnlockedStories] = useState([]);

    useEffect(() => {
        loadScore();
        loadUnlockedStories();
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

    const loadUnlockedStories = async () => {
        try {
            const storedStories = await AsyncStorage.getItem("unlockedStories");
            if (storedStories) {
                const parsedStories = JSON.parse(storedStories);
                if (Array.isArray(parsedStories)) {
                    setUnlockedStories(parsedStories);
                } else {
                    setUnlockedStories([]);
                }
            } else {
                setUnlockedStories([]);
            }
        } catch (error) {
            console.error("Error loading unlocked stories:", error);
            setUnlockedStories([]);
        }
    };
        
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.upperText}>My inventory</Text>
                <View style={styles.scoreContainer}>
                    <Image source={require("../assets/game/bamboo.png")} style={styles.bambooIcon} />
                    <Text style={styles.score}>{score}</Text>
                </View>
            </View>

            <Image source={require('../assets/game/crown.png')} style={{width: 60, height: 60, resizeMode: 'contain', marginBottom: 10}} />
            <Text style={styles.maxScoreText}>Max score:</Text>
            <View style={[styles.maxScoreContainer, {marginBottom: 21}]}>
                <LinearGradient
                    colors={['#ffbd60', '#ec9925']}
                    style={styles.maxScoreContainer} 
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                >
                    <Text style={styles.score}>{maxScore}</Text>
                </LinearGradient>
            </View>

            {
                unlockedStories.length > 0 ? (
                    <ScrollView style={{ width: "100%" }}>
                        {unlockedStories.map((story, index) => (
                                <View key={index} style={styles.card}>
                                    <Image source={story.image} style={styles.cardImg} />
                                    <View style={styles.cardContent}>
                                        <Text style={styles.cardName}>{story.name}</Text>
                                        <View style={styles.cardFooter}>
                                            <TouchableOpacity 
                                                style={styles.btn} 
                                                onPress={() => navigation.navigate('StoryScreen', { story })}
                                                >
                                                    <Text style={styles.btnTextUnlocked}>Read Now</Text>
                                            </TouchableOpacity>
                                            <Text style={[styles.btnText, {marginLeft: 16}]}>Unlocked</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        )}
                        <View style={{ height: 150 }} />
                    </ScrollView>    
                ) : (
                    <Text style={[styles.btnText, {marginVertical: 'auto'}]}>You haven`t collected any stories yet...</Text>
                )
            }
            
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#015f03",
        paddingTop: height * 0.07,
        padding: 30,
    },

    header: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },

    upperText: {
        fontSize: 18,
        fontWeight: "900",
        color: "#fff",
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
        marginBottom: 20
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
        borderRadius: 24,
        borderWidth: 2,
        borderColor: "#0d430a",
        backgroundColor: "#9eca64",
        marginBottom: 12,
        overflow: "hidden",
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0
    },

    cardImg: {
        width: "100%",
        height: 152,
        resizeMode: "cover",
    },

    cardContent: {
        width: "100%",
        padding: 11,
        paddingBottom: 16,
    },

    cardName: {
        fontSize: 22,
        fontWeight: "500",
        color: "#db151a",
        marginBottom: 22,
    },

    cardFooter: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
    },

    btn: {
        paddingVertical: 5,
        paddingHorizontal: 26,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#db151a",
        backgroundColor: "#f0a031",
        flexDirection: "row",
        alignItems: "center",
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0
    },

    btnText: {
        fontSize: 16,
        fontWeight: "800",
        color: "#fff",
        lineHeight: 21.82
    },

    btnTextUnlocked: {
        fontSize: 18,
        fontWeight: "800",
        color: "#db151a",
        lineHeight: 24.55
    },
    
});

export default Personal;
