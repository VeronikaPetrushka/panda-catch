import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const Menu = ({ start }) => {
    const navigation = useNavigation();
    const [activeButton, setActiveButton] = useState('HomeScreen');

    const handleNavigate = (screen) => {
        setActiveButton(screen);
        navigation.navigate(screen)
    };    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const currentRoute = navigation.getState().routes[navigation.getState().index].name;
            setActiveButton(currentRoute);
        });

        return unsubscribe;
    }, [navigation]);

    const handleHomeStart = () => {
        if(activeButton === 'HomeScreen') {
            start();
        } else {
            navigation.navigate('HomeScreen')
        }
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity 
                style={[styles.button, {padding: 8.5}]} 
                onPress={() => handleNavigate('ShopScreen')}>
                    <Icons type={'1'} active={activeButton === 'ShopScreen'}/>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.homeBtn} 
                onPress={handleHomeStart}>
                    <Icons type={'2'} active={activeButton === 'HomeScreen'}/>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleNavigate('PersonalScreen')}>
                    <Icons type={'3'} active={activeButton === 'PersonalScreen'}/>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 260,
        justifyContent: "space-evenly",
        alignItems: "center",
        alignSelf: 'center',
        borderRadius: 50,
        height: 60,
        flexDirection: 'row',
        backgroundColor: '#9cd84d',
    },
    
    button: {
        width: 40,
        height: 40,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    homeBtn: {
        width: 82,
        height: 82,
        borderRadius: 100,
        backgroundColor: '#ffac37',
        borderWidth: 1,
        borderColor: '#b56a00',
        padding: 19
    }
});

export default Menu;
