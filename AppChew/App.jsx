
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import React from "react";
import MainContainer from "./MainContainer";
import {AuthProvider} from "./context/AuthContext";


const Stack = createNativeStackNavigator();
export default function App() {
  return (
      <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
          <Stack.Screen options={{headerBackTitle: "Log Out"}} name="Home" component={MainContainer} />
        </Stack.Navigator>
      </NavigationContainer>
      </AuthProvider>



  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
