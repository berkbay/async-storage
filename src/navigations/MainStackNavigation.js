import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";

const Stack = createNativeStackNavigator();

function MainStackNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} screenOptions={{headerShown:false}}/>
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Home" component={Home}  />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainStackNavigation;
