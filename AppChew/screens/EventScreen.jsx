import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, Platform} from 'react-native';
import 'moment-timezone'
import {recipeApi} from "../api/recipeApi";


const EventScreen = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        (async () => {
            setRecipes(await recipeApi.listAll());
        })();
    }, []);

    return (
        <View>

        </View>
    );
}

export default EventScreen;