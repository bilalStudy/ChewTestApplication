import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import QuizScreen from "./screens/QuizScreen";
import RecipiesScreen from "./screens/RecipiesScreen";
import Profile from "./screens/Profile";
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
          <Stack.Screen name="Home" component={MainContainer} />
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
