import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/AuthContext";
import {recipeApi} from "../api/recipeApi";
import Recipe from "../interfaces/IRecipe";
import {announcementApi} from "../api/announcementApi";
import {userApi} from "../api/userApi";
import {Card} from "react-native-paper";


const StudentOverviewScreen = () => {

    const {currentUser} = useContext(AuthContext);
    const [students, setStudents] = useState([])

    useEffect(() => {
        (async () => {
            setStudents(await userApi.findPupils(currentUser.school, "pupil"));
        })();
    }, []);

    const renderItem = ({item}) => (
        <View>
            <Text>{item.fullname}</Text>
            <Text>{item.gradeclass}</Text>
            <Text>{item.school}</Text>
        </View>
    );


    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <FlatList data={students} renderItem={renderItem} keyExtractor={item => item._id}/>
        </View>


    )
}

export default StudentOverviewScreen

const styles = StyleSheet.create({})