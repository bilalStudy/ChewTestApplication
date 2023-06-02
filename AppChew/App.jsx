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
import SettingsScreen from "./screens/SettingsScreen";
import React from "react";

/*
const Stack = createNativeStackNavigator();
export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>



  );
}
*/

const homeName= 'Announcements';
const quizName = 'Quizes';
const recipiesName = 'Recipies';
const settingName = 'Settings';

const Tab = createBottomTabNavigator()

export default function MainContainer(){
    return(
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({route}) =>({
                    tabBarIcon: ({ focused, color, size}) =>{
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline';

                        } else if (rn === quizName) {
                            iconName = focused ? 'ribbon' : 'ribbon-outline';


                        }else if (rn === recipiesName) {
                            iconName = focused ? 'restaurant' : 'restaurant-outline';
                        }

                        else if (rn === settingName) {
                            iconName = focused ? 'settings' : 'settings-outline';
                        }


                        return <Ionicons name={iconName} size={size} color={color}/>;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'grey',
                    labelStyle: { paddingBottom: 10, fontSize: 10 },
                    style: { padding: 10, height: 70}
                }}>

                <Tab.Screen name={homeName} component={HomeScreen} />
                <Tab.Screen name={quizName} component={QuizScreen} />
                <Tab.Screen name={recipiesName} component={RecipiesScreen} />
                <Tab.Screen name={settingName} component={SettingsScreen} />

            </Tab.Navigator>
        </NavigationContainer>
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
