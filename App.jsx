import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SignUp } from './screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent"
  }
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Signup'>
        <Stack.Screen name='Signup' component={SignUp}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
