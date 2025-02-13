import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, Animated, PanResponder, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get('window');

const bamboo = require('../assets/game/bamboo.png');
const rock = require('../assets/game/rock.png');
const panda = require('../assets/game/panda.png');

const Game = () => {
    const navigation = useNavigation();
    const [gameScore, setGameScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [fallingItems, setFallingItems] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [showRedOverlay, setShowRedOverlay] = useState(false);

    const pandaWidth = 80;
    const pandaX = useRef(new Animated.Value(width / 2 - pandaWidth / 2)).current;
    const pandaXRef = useRef(pandaX._value);

    useEffect(() => {
        if (!gameOver) {
            startItemFall();
        }
    }, [gameOver]);

    const startItemFall = () => {
        if (fallingItems.length >= 40) return;
    
        const numberOfItems = Math.floor(Math.random() * 3) + 2;
        const newItems = Array.from({ length: numberOfItems }, () => ({
            id: Math.random(),
            x: Math.random() * (width - 50),
            y: new Animated.Value(-50),
            type: Math.random() > 0.2 ? "bamboo" : "rock",
            speed: Math.random() * 2000 + 2000,
        }));
    
        setFallingItems(prevItems => {
            const updatedItems = [...prevItems, ...newItems];
            return updatedItems.length > 40 ? updatedItems.slice(updatedItems.length - 40) : updatedItems;
        });
    
        newItems.forEach(item => {
            Animated.timing(item.y, {
                toValue: height - 120,
                duration: item.speed,
                useNativeDriver: true,
            }).start(({ finished }) => {
                if (finished) handleItemReachPanda(item);
            });
        });
    };
        
    const handleItemReachPanda = (item) => {
        const pandaLeft = pandaXRef.current;
        const pandaRight = pandaLeft + pandaWidth;
        const withinRange = item.x >= pandaLeft && item.x <= pandaRight;

        if (withinRange) {
            if (item.type === "bamboo") {
                setGameScore(prev => prev + 1);
            } else if (item.type === "rock") {
                setLives(prev => Math.max(prev - 1, 0)); 
                setShowRedOverlay(true);
                setTimeout(() => setShowRedOverlay(false), 2000);
            }
        }

        setFallingItems(prevItems => prevItems.filter(i => i.id !== item.id));

        if (lives <= 1) {
            finishGame();
        } else {
            startItemFall();
        }

    };

    useEffect(() => {
        if (lives === 0) {
            finishGame();
        }
    }, [lives]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gestureState) => {
                let newX = gestureState.moveX - pandaWidth / 2;
                if (newX >= 0 && newX <= width - pandaWidth) {
                    pandaX.setValue(newX);
                    pandaXRef.current = newX;
                }
            }
        })
    ).current;

    const finishGame = async () => {
        setGameOver(true);
        setShowRedOverlay(true);
        setFallingItems([]);

        const storedScore = await AsyncStorage.getItem("score");
        const newScore = (storedScore ? parseInt(storedScore) : 0) + gameScore;
        await AsyncStorage.setItem("score", newScore.toString());

        const storedRecords = await AsyncStorage.getItem("scoreRecords");
        const scoreRecords = storedRecords ? JSON.parse(storedRecords) : [];
        scoreRecords.push(gameScore);
        await AsyncStorage.setItem("scoreRecords", JSON.stringify(scoreRecords));
    };

    const restartGame = () => {
        setGameScore(0);
        setLives(3);
        setFallingItems([]);
        setGameOver(false);
        setShowRedOverlay(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.scoreContainer}>
                    <Text style={styles.score}>{lives}/3</Text>
                </View>
                <View style={styles.scoreContainer}>
                    <Image source={bamboo} style={styles.bambooIcon} />
                    <Text style={styles.score}>{gameScore}</Text>
                </View>
            </View>

            <View style={styles.range}>
                <Animated.View {...panResponder.panHandlers} style={{ width: 80, height: 115, position: 'absolute', left: pandaX, bottom: -50 }}>
                    <Image source={panda} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                </Animated.View>
            </View>

            {fallingItems.map(item => (
                <Animated.Image
                    key={item.id}
                    source={item.type === "bamboo" ? bamboo : rock}
                    style={{
                        position: 'absolute',
                        left: item.x,
                        transform: [{ translateY: item.y }],
                        width: 40,
                        height: 40,
                        resizeMode: 'contain',
                    }}
                />
            ))}

            {gameOver && (
                <View style={[styles.redOverlay, {backgroundColor: 'rgba(255, 0, 0, 0.2)'}]}>
                    <View style={{width: '100%', alignItems: 'center', zIndex: 20}}>
                        <Text style={[styles.gameOverText, {marginTop: 150}]}>Game Over</Text>
                        <Text style={styles.gameOverText}>You earned:</Text>
                        <View style={[styles.scoreContainer, {paddingVertical: 12, paddingHorizontal: 70, borderRadius: 26, marginBottom: 30}]}>
                            <Text style={styles.score}>{gameScore}</Text>
                        </View>
                        <TouchableOpacity style={{width: 277, height: 72, borderRadius: 26, alignItems: 'center', justifyContent: 'center', marginBottom: 15}} onPress={restartGame}>
                            <LinearGradient
                                colors={['#ffbd60', '#ec9925']}
                                style={{width: 277, height: 72, borderRadius: 26, alignItems: 'center', justifyContent: 'center'}} onPress={restartGame} 
                                start={{ x: 1, y: 0 }}
                                end={{ x: 0, y: 0 }}
                            >
                                <Text style={[styles.score, {fontWeight: '700', fontSize: 17}]}>Try Again</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: 277, height: 72, borderRadius: 26, alignItems: 'center', justifyContent: 'center', marginBottom: 15}} onPress={() => navigation.navigate('HomeScreen')}>
                            <LinearGradient
                                colors={['#ffbd60', '#ec9925']}
                                style={{width: 277, height: 72, borderRadius: 26, alignItems: 'center', justifyContent: 'center'}} 
                                start={{ x: 1, y: 0 }}
                                end={{ x: 0, y: 0 }}
                            >
                                <Text style={[styles.score, {fontWeight: '700', fontSize: 17}]}>Go Home</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {showRedOverlay && <View style={styles.redOverlay} />}
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: height * 0.07,
        justifyContent: 'space-between',
        paddingBottom: 70,
        backgroundColor: '#558c0c'
    },

    header: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 38,
        paddingHorizontal: 30
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

    range: {
        width: 335,
        height: 12,
        backgroundColor: '#9eca64',
        borderRadius: 10,
        marginTop: height * 0.1,
    },

    gameOverContainer: {
        position: 'absolute',
        top: height / 2 - 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    gameOverText: {
        fontSize: 26,
        fontWeight: "900",
        color: "#fff",
        lineHeight: 35.5,
        marginBottom: 20
    },

    redOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '150%',
        backgroundColor: 'rgba(255, 0, 0, 0.4)',
        alignItems: 'center',
    },

});

export default Game;

