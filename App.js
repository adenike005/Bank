import React from 'react';
// import { StatusBar } from 'expo-status-bar';
import { StatusBar } from 'react-native';
import { Text, View, StyleSheet,  PermissionsAndroid, } from 'react-native';
import { useFonts } from 'expo-font';
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer, DefaultTheme} from "@react-navigation/native"
import SignUp from './Screen/Signup';
import { COLORS } from './Constraint/themes';
import Tabs from './Navigation/tabs';



const theme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    border: "transparent"
  }
}



const Stack = createStackNavigator();
const App = () =>{

  const [loaded] = useFonts({
        // Montserrat: require('./assets/fonts/Yatra-One.ttf'),
        Regular: require('./assets/fonts/Roboto-Regular.ttf'),
        Bold: require('./assets/fonts/Roboto-Bold.ttf'),
        Black: require('./assets/fonts/Roboto-Black.ttf'),
    
      });
      if (!loaded) {
        return null;
      }
      return (
    <NavigationContainer theme={theme}>
    <StatusBar barStyle="light-content"    />
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
    initialRouteName={SignUp}>

      <Stack.Screen name='SignUp' component={SignUp}/>
      <Stack.Screen name='HomeTabs' component={Tabs}/>

    </Stack.Navigator>

   </NavigationContainer>
      );
}

export default App;