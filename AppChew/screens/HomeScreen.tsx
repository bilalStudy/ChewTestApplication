import {StyleSheet, Text, View} from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/AuthContext";
import {recipeApi} from "../api/recipeApi";
import Recipe from "../interfaces/IRecipe";
import {announcementApi} from "../api/announcementApi";


const HomeScreen = () => {

    const {currentUser} = useContext(AuthContext);
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        (async () => {
            setRecipes(await recipeApi.listAll());
        })();
    }, []);

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>{currentUser.username} and his role is {currentUser.role}</Text>
        </View>


    )
}

export default HomeScreen

const styles = StyleSheet.create({})