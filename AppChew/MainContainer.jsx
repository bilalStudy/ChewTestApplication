import Profile from './screens/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import QuizScreen from './screens/QuizScreen';
import { NavigationContainer } from '@react-navigation/native';
import AlternativeRecipeScreen from './screens/AlternativeRecipeScreen';
import EventScreen from './screens/EventScreen';
import AnnouncementScreen from './screens/AnnouncementScreen';
import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import StudentOverviewScreen from "./screens/StudentOverviewScreen";

export const homeName = 'Announcements';
export const quizName = 'Quizes';
export const recipiesName = 'Recipies';
export const profileName = 'Profile';
export const eventName = 'Event';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  const { currentUser } = useContext(AuthContext);

  let teacher = currentUser.role === 'teacher';

  let pupil = currentUser.role === 'pupil';

  /*
    function EventScreenForTeacher(props) {
        if (teacher) {
            return (<Tab.Screen name={eventName} component={EventScreen} />);
        } else if (pupil) {
            return null;
        }
    }

     */

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
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
            } else if (rn === eventName) {
              iconName = focused ? 'add' : 'add-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },

          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: {
            paddingBottom: 10,
            fontSize: 10,
          },
          tabBarStyle: [
            {
              padding: 10,
              height: '11%',
              display: 'flex',
            },
            null,
          ],
        })}
        /*
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'grey',
                    labelStyle: {paddingBottom: 10, fontSize: 10},
                    style: {padding: 10, height: 70}
                }}*/
      >
        <Tab.Screen name={homeName} component={AnnouncementScreen} />
        {teacher ? (
          <Tab.Screen name={eventName} component={EventScreen} />
        ) : null}
        <Tab.Screen name={quizName} component={QuizScreen} />
        <Tab.Screen name={recipiesName} component={AlternativeRecipeScreen} />
        <Tab.Screen name={profileName} component={StudentOverviewScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
