import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import tales from "../constants/tales";
import skins from "../constants/skins";

const { height } = Dimensions.get("window");

const Shp = () => {
    const navigation = useNavigation();
    const [score, setScore] = useState(0);
    const [unlockedStories, setUnlockedStories] = useState([]);
    const [unlockedSkins, setUnlockedSkins] = useState([]);
    const [currentSkin, setCurrentSkin] = useState(skins[0])
    const [category, setCategory] = useState('Tales');

    useEffect(() => {
        loadScore();
        loadUnlockedStories();
        loadUnlockedSkins();
        loadCurrentSkin();
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

    const loadUnlockedSkins = async () => {
        const storedSkins = await AsyncStorage.getItem("unlockedSkins");
        if (storedSkins !== null) {
            const parsedSkins = JSON.parse(storedSkins);
            if (!parsedSkins.find(skin => skin.name === skins[0].name)) {
                parsedSkins.push({ ...skins[0], unlocked: true });
                await AsyncStorage.setItem("unlockedSkins", JSON.stringify(parsedSkins));
            }
            setUnlockedSkins(parsedSkins);
        } else {
            const initialSkins = [{ ...skins[0], unlocked: true }];
            setUnlockedSkins(initialSkins);
            await AsyncStorage.setItem("unlockedSkins", JSON.stringify(initialSkins));
        }
    };

    const loadCurrentSkin = async () => {
        const storedSkin = await AsyncStorage.getItem("currentSkin");
        if (storedSkin !== null) {
            setCurrentSkin(JSON.parse(storedSkin));
        } else {
            setCurrentSkin(skins[0]);
            await AsyncStorage.setItem("currentSkin", JSON.stringify(skins[0]));
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

    const unlockSkin = async (skin) => {
        if (score >= 300 && !unlockedSkins.some(s => s.name === skin.name)) {
            const newScore = score - 300;
            const updatedSkins = [...unlockedSkins, { ...skin, unlocked: true }];

            setScore(newScore);
            setUnlockedSkins(updatedSkins);
            await AsyncStorage.setItem("score", newScore.toString());
            await AsyncStorage.setItem("unlockedSkins", JSON.stringify(updatedSkins));
        }
    };

    const equipSkin = async (skin) => {
        if (unlockedSkins.some(s => s.name === skin.name && s.unlocked)) {
            setCurrentSkin(skin);
            await AsyncStorage.setItem("currentSkin", JSON.stringify(skin));
        }
    };
        
    console.log(unlockedStories);
    console.log(unlockedSkins)
    
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.upperText}>Bamboo Shop</Text>
                <View style={styles.scoreContainer}>
                    <Image source={require("../assets/game/bamboo.png")} style={styles.bambooIcon} />
                    <Text style={styles.score}>{score}</Text>
                </View>
            </View>

            <View style={{width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: height * 0.03}}>
                <TouchableOpacity style={[styles.categoryBtn, category === 'Tales' && {backgroundColor: '#f0a031', borderColor: '#db151a'}]} onPress={() => setCategory('Tales')}>
                    <Text style={[styles.categoryBtnText, category === 'Tales' && {color: '#db151a'}]}>Tales</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.categoryBtn, category === 'Skins' && {backgroundColor: '#f0a031', borderColor: '#db151a'}]} onPress={() => setCategory('Skins')}>
                    <Text style={[styles.categoryBtnText, category === 'Skins' && {color: '#db151a'}]}>Skins</Text>
                </TouchableOpacity>
            </View>
            
            <ScrollView style={{ width: "100%" }}>
                {
                    category === 'Tales' ? (
                        <>
                            {tales.map((story, index) => {
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
                        </>
                    ) : (
                        <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap'}}>
                            {skins.map((skin, index) => {
                                const isUnlockedSkin = unlockedSkins.some(s => s.name === skin.name && s.unlocked);
                                const isEquipped = currentSkin?.name === skin.name;
                                const canBuySkin = score >= 300;

                                return (
                                    <View key={index} style={[styles.card, {padding: 12, alignItems: 'center', width: '47%', height: 272, justifyContent: 'space-between'}]}>
                                        <Image source={skin.image} style={{width: 87, height: 87, resizeMode: 'contain', marginBottom: 12}} />
                                        <Text style={[styles.cardName, {width: '80%', textAlign: 'center'}]}>{skin.name}</Text>
                                        <View style={styles.cardFooter}>
                                            <TouchableOpacity 
                                                style={[styles.btn, !canBuySkin && !isUnlockedSkin && { opacity: 0.5 }, {paddingHorizontal: 15, alignItems: 'center', justifyContent: 'center', height: 65, width: '100%', flexDirection: 'column'}]} 
                                                onPress={isUnlockedSkin ? () => equipSkin(skin) : () => unlockSkin(skin)}
                                                disabled={!canBuySkin && !isUnlockedSkin}
                                                >
                                                {!isUnlockedSkin ? (
                                                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap'}}>
                                                        <Text style={[styles.btnText, {fontSize: 15}]}>Unlock for</Text>
                                                        <Image source={require("../assets/game/bamboo.png")} style={{width: 30, height: 30, resizeMode: 'contain'}} />
                                                        <Text style={[styles.score, {fontSize: 22}]}>300</Text>
                                                    </View>
                                                ) : (
                                                    <>
                                                        <Text style={[styles.btnText, {fontSize: 15}]}>Unlocked</Text>
                                                        {isEquipped && <Text style={[styles.btnText, {fontSize: 15}]}>Equipped</Text>}
                                                    </>
                                                )}
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                    )
                }
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
        backgroundColor: "#e41ade",
        paddingTop: height * 0.07,
        padding: 30,
        paddingBottom: 0
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

    categoryBtn: {
        width: '42%',
        padding: 7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#444',
        borderRadius: 20
    },

    categoryBtnText: {
        color: '#444',
        fontSize: 26,
        fontWeight: '900',
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
