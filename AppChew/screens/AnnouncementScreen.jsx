import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, Platform, FlatList, TouchableOpacity} from 'react-native';
import {announcementApi} from "../api/announcementApi";
import {AuthContext} from "../context/AuthContext";
import {recipeApi} from "../api/recipeApi";
import { useNavigation } from '@react-navigation/native';
//import {recipiesName} from "../MainContainer";



const AnnouncementScreen = () => {
    const {currentUser} = useContext(AuthContext);
    const [announcements, setAnnouncements] = useState([])
    //const [recipes, setRecipes] = useState([])
    const [classAnnouncements, setClassAnnouncements] = useState([])
    const [schoolAnnouncements, setSchoolAnnouncements] = useState([])

    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            //setAnnouncements(await announcementApi.listAll())
            setSchoolAnnouncements(await announcementApi.findSchoolBased(currentUser.school));
            setClassAnnouncements(await announcementApi.findSchoolClassBased(currentUser.school, currentUser.gradeclass))


        })();
    }, []);

    const handleItemPress = (item) => {
        import('../MainContainer').then((module) => {
            const MainContainer = module.default;4
            navigation.navigate('Recipies', { selectedData: item.recipeId });
        });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemPress(item)}>
            <Text>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View>
            <Text>skolen sin announcement starter her</Text>
            <Text></Text>
            {classAnnouncements.map((a) => (
                <View key={a._id}>
                    <Text>{a.title} ewohnioenwfweon {a.description} </Text>
                </View>
            ))}
            <Text></Text>
            <Text>klasse sin announcement starter her</Text>
            <Text></Text>
            {schoolAnnouncements.map((b) => (
                <View key={b._id}>
                    <Text>{b.title} ewohnioenwfweon {b.description} </Text>
                </View>
            ))}
            <Text></Text>
            <FlatList data={schoolAnnouncements} renderItem={renderItem} keyExtractor={item => item._id}/>

        </View>
    );
}

export default AnnouncementScreen;