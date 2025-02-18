import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, ImageBackground, StyleSheet } from 'react-native';

import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OnBoardingScreen from './src/screens/OnBoardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import PersonalScreen from './src/screens/PersonalScreen';
import ShopScreen from './src/screens/ShopScreen';
import PandaScreen from './src/screens/PandaScreen';
import StoryScreen from './src/screens/StoryScreen';

enableScreens();

const Stack = createStackNavigator();

const App = () => {
      const [loaderIsEnded, setLoaderIsEnded] = useState(false);
      const [textVisible, setTextVisible] = useState(false);

      const loaderAnim = useRef(new Animated.Value(0)).current;
      const opacityAnim = useRef(new Animated.Value(0)).current;
  
      const loader = require('./src/assets/onboarding/2.png');
  
      const [currentLoader, setCurrentLoader] = useState(loader);
  
      useEffect(() => {
          Animated.timing(loaderAnim, {
              toValue: 0.4,
              duration: 1500,
              useNativeDriver: false,
          }).start(() => {
              setCurrentLoader(loader);
              loaderAnim.setValue(0.4);
  
              Animated.timing(loaderAnim, {
                  toValue: 1,
                  duration: 1500,
                  useNativeDriver: false,
              }).start(() => {
                  loaderAnim.setValue(1);
                  setTextVisible(true);
  
                  Animated.timing(opacityAnim, {
                      toValue: 1,
                      duration: 1500,
                      useNativeDriver: true,
                  }).start(() => {
                      setLoaderIsEnded(true);
                  });
              });
          });
      }, []);

  return (
      <NavigationContainer>
             {
                !loaderIsEnded ? (
                    <View style={{ flex: 1 }}>
                        <ImageBackground style={{ flex: 1 }} source={currentLoader}>
                            <View style={styles.container}>
                                <Animated.View style={[styles.imageContainer, { transform: [{ scale: loaderAnim }] }]}>
                                    <ImageBackground source={currentLoader} style={styles.image} />
                                </Animated.View>
                                {textVisible && (
                                    <Animated.Text style={[styles.text, { opacity: opacityAnim }]}>
                                        Panda Catch
                                    </Animated.Text>
                                )}
                            </View>
                        </ImageBackground>
                    </View>
                ) : (
                        <Stack.Navigator initialRouteName={"OnBoardingScreen" }>
                              <Stack.Screen 
                                    name="OnBoardingScreen" 
                                    component={OnBoardingScreen} 
                                    options={{ headerShown: false }} 
                              />
                              <Stack.Screen 
                                    name="HomeScreen" 
                                    component={HomeScreen} 
                                    options={{ headerShown: false }} 
                              />
                              <Stack.Screen 
                                    name="PersonalScreen" 
                                    component={PersonalScreen} 
                                    options={{ headerShown: false }} 
                              />
                              <Stack.Screen 
                                    name="ShopScreen" 
                                    component={ShopScreen} 
                                    options={{ headerShown: false }} 
                              />
                              <Stack.Screen 
                                    name="PandaScreen" 
                                    component={PandaScreen} 
                                    options={{ headerShown: false }} 
                              />
                              <Stack.Screen 
                                    name="StoryScreen" 
                                    component={StoryScreen} 
                                    options={{ headerShown: false }} 
                              />
                        </Stack.Navigator>
             )
            }
      </NavigationContainer>
    );
};

const styles = StyleSheet.create({
      container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ff00ff',
      },
      imageContainer: {
          width: '100%',
          height: 400,
          position: 'absolute',
      },
      image: {
          width: '100%',
          height: '100%',
          resizeMode: 'contain',
      },
      text: {
          position: 'absolute',
          bottom: '24%',
          fontSize: 32,
          fontWeight: "900",
          color: "#ec9925",
          marginBottom: 25,
          textAlign: 'center',
          zIndex: 10
  
      },
  });


export default App;
