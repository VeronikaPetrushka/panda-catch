import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OnBoardingScreen from './src/screens/OnBoardingScreen';
import HomeScreen from './src/screens/HomeScreen';

enableScreens();

const Stack = createStackNavigator();

const App = () => {

  return (
      <NavigationContainer>
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
            </Stack.Navigator>
      </NavigationContainer>
    );
};

export default App;
