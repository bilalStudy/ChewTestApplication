import { StyleSheet, Text, View } from 'react-native'
import React, {useContext} from 'react'
import MainContainer from "../App";
import {AuthContext} from "../context/AuthContext";


const Profile = () => {

    const {currentUser} = useContext(AuthContext);
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>{currentUser.username} and his role is {currentUser.role}</Text>

        </View>
    )
}

export default Profile

