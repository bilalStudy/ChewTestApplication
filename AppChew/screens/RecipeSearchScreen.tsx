import {Image, StyleSheet, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import MainContainer from "../App";
import {recipeApi} from "../api/recipeApi";



const RecipeSearchScreen = () => {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        (async () => {
            setRecipes(await recipeApi.listAll());
        })();
    }, []);

    // gi styleName for individuell style

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Recipe Screen</Text>
            <View>
                {recipes.map((x) =>(
                    <View key={x.id}>
                        <Image style={{
                            resizeMode: 'contain',
                            width: '50%',
                            height: '50%',
                        }} source={{
                            uri: `${x.picture}`,
                        }}></Image>
                        <Text>dishname : {x.dishname}</Text>
                    </View>
                )) }
            </View>

        </View>
    )
}

export default RecipeSearchScreen

const styles = StyleSheet.create({})