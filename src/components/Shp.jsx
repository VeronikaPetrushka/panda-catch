import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import stories from "../constants/stories";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

const Shp = () => {
    const navigation = useNavigation();
    const [score, setScore] = useState(0);
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
    };

    const loadUnlockedStories = async () => {
        const storedStories = await AsyncStorage.getItem("unlockedStories");
        if (storedStories !== null) {
            setUnlockedStories(JSON.parse(storedStories));
        }
    };

    const unlockStory = async (story) => {
        if (score >= 188) {
            const newScore = score - 188;
    
            const updatedStories = [...unlockedStories, { ...story, unlocked: true }];
    
            setScore(newScore);
            setUnlockedStories(updatedStories);
    
            await AsyncStorage.setItem("score", newScore.toString());
            await AsyncStorage.setItem("unlockedStories", JSON.stringify(updatedStories));
        }
    };

    console.log(unlockedStories)
    
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.upperText}>Bamboo Shop</Text>
                <View style={styles.scoreContainer}>
                    <Image source={require("../assets/game/bamboo.png")} style={styles.bambooIcon} />
                    <Text style={styles.score}>{score}</Text>
                </View>
            </View>
            
            <ScrollView style={{ width: "100%" }}>
                {stories.map((story, index) => {
                    const isUnlocked = unlockedStories.some(unlockedStory => unlockedStory.name === story.name && unlockedStory.unlocked);
                    const canBuy = score >= 188;

                    return (
                        <View key={index} style={styles.card}>
                            <Image source={story.image} style={styles.cardImg} />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardName}>{story.name}</Text>
                                <View style={styles.cardFooter}>
                                    <TouchableOpacity 
                                        style={[styles.btn, !canBuy && !isUnlocked && { opacity: 0.5 }]} 
                                        onPress={isUnlocked ? () => navigation.navigate('StoryScreen', { story }) : () => unlockStory(story)}
                                        disabled={!canBuy && !isUnlocked}
                                        >
                                        {isUnlocked ? (
                                            <Text style={styles.btnTextUnlocked}>Read Now</Text>
                                        ) : (
                                            <>
                                                <Text style={styles.btnText}>Unlock for</Text>
                                                <Image source={require("../assets/game/bamboo.png")} style={styles.bambooIcon} />
                                                <Text style={styles.score}>188</Text>
                                            </>
                                        )}
                                    </TouchableOpacity>
                                    {isUnlocked && <Text style={[styles.btnText, {marginLeft: 16}]}>Unlocked</Text>}
                                </View>
                            </View>
                        </View>
                    );
                })}
                <View style={{ height: 150 }} />
            </ScrollView>
            
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
        marginBottom: 38,
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

export default Shp;
