import React, { useState } from "react"
import { View, Text,TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native"
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const Home = () => {
    return (
        <View style={styles.container}></View>
    )
};

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#558c0c',
        paddingTop: height * 0.07
    },
    
});

export default Home;