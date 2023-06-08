import HomeScreen from "./screens/HomeScreen";
import Profile from "./screens/Profile";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import QuizScreen from "./screens/QuizScreen";
import { NavigationContainer } from '@react-navigation/native';
import RecipeSearchScreen from "./screens/RecipeSearchScreen";
import RecipiesScreen from "./screens/RecipiesScreen";
import AlternativeRecipeScreen from "./screens/AlternativeRecipeScreen";
import AnnouncementScreen from "./screens/AnnouncementScreen";
import ScheduleScreen from "./screens/AlternativeAnnouncementScreen";

const homeName= 'Announcements';
const quizName = 'Quizes';
const recipiesName = 'Recipies';
const profileName = 'Profile';

const Tab = createBottomTabNavigator()

export default function MainContainer() {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline';

                        } else if (rn === quizName) {
                            iconName = focused ? 'ribbon' : 'ribbon-outline';


                        } else if (rn === recipiesName) {
                            iconName = focused ? 'restaurant' : 'restaurant-outline';
                        } else if (rn === profileName) {
                            iconName = focused ? 'happy' : 'happy-outline';
                        }


                        return <Ionicons name={iconName} size={size} color={color}/>;
                    },


                    "tabBarActiveTintColor": "tomato",
                    "tabBarInactiveTintColor": "grey",
                    "tabBarLabelStyle": {
                    "paddingBottom": 10,
                    "fontSize": 10
                },
                    "tabBarStyle": [
                {
                    "padding": 10,
                    "height":70,
                    "display": "flex"
                },
                    null
                    ]


                })}
                /*
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'grey',
                    labelStyle: {paddingBottom: 10, fontSize: 10},
                    style: {padding: 10, height: 70}
                }}*/>



                <Tab.Screen name={homeName} component={HomeScreen}/>
                <Tab.Screen name={quizName} component={ScheduleScreen}/>
                <Tab.Screen name={recipiesName} component={AlternativeRecipeScreen}/>
                <Tab.Screen name={profileName} component={Profile}/>

            </Tab.Navigator>

        </NavigationContainer>
    );
}
