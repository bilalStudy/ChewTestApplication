import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, Platform, FlatList, TouchableOpacity} from 'react-native';
import {announcementApi} from "../api/announcementApi";
import {AuthContext} from "../context/AuthContext";
import {recipeApi} from "../api/recipeApi";
import {useIsFocused, useNavigation} from '@react-navigation/native';
//import {recipiesName} from "../MainContainer";



const AnnouncementScreen = () => {
    const {currentUser} = useContext(AuthContext);
    const [announcements, setAnnouncements] = useState([])
    //const [recipes, setRecipes] = useState([])
    const [classAnnouncements, setClassAnnouncements] = useState([])
    const [schoolAnnouncements, setSchoolAnnouncements] = useState([])

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused)(async () => {
            //setAnnouncements(await announcementApi.listAll())
            setSchoolAnnouncements(await announcementApi.findSchoolBased(currentUser.school));
            setClassAnnouncements(await announcementApi.findSchoolClassBased(currentUser.school, currentUser.gradeclass))


        })();
    }, [isFocused]);

    const handleItemPress = (item) => {
        import('../MainContainer').then((module) => {
            const MainContainer = module.default;
            navigation.navigate('Recipies', { selectedData: item.recipeName });
        });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemPress(item)}>
            <Text>{item.title}</Text>
        </TouchableOpacity>
    );


    function SchoolAnnouncements(props) {
        return <FlatList data={schoolAnnouncements} renderItem={renderItem} keyExtractor={item => item._id}/>;
    }

    function ClassAnnouncements(props) {
        return <FlatList data={classAnnouncements} renderItem={renderItem} keyExtractor={item => item._id}/>;
    }

    function AnnouncementsBasedOnRole(props) {
        const userRole = currentUser.role;
        if (userRole === 'teacher') {
            return <SchoolAnnouncements />;
        } else if (userRole === 'pupil') {
            return <ClassAnnouncements/>;
        } else {
            return <Text>You either dont have access to this, or we havent had the time to implement this for you. sorry!</Text>
        }
    }

    /*
    render() {
        const userRole = currentUser.role;
        if (userRole === 'teacher') {
            <FlatList data={schoolAnnouncements} renderItem={renderItem} keyExtractor={item => item._id}/>;
        } else if (userRole === 'pupil') {
            <FlatList data={classAnnouncements} renderItem={renderItem} keyExtractor={item => item._id}/>;
        }

            return (
        <View>
            {currentUser.role}
            <FlatList data={schoolAnnouncements} renderItem={renderItem} keyExtractor={item => item._id}/>

        </View>
    );

     */

        return (
            <View>
                <AnnouncementsBasedOnRole />
            </View>
        );
}

export default AnnouncementScreen;