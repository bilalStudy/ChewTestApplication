import {Image, StyleSheet, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import MainContainer from "../App";
import {recipeApi} from "../api/recipeApi";



interface Recipe {
    id: string;
    dishname: string;
    picture: string;
    guide: string;
    description: string;
    nutrition: string;
    allergens: string;
    ingredients: string[];
    kitchentools: string[];
    category: string;
    culture: string;
}


const RecipeScreen: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedRecipes = await recipeApi.listAll();
                setRecipes(fetchedRecipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchData().catch(error => {
            console.error('Error fetching recipes:', error);
        });
    }, []);


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Recipe Screen</Text>
            <View>
                {recipes.map(recipe => (
                    <View key={recipe.id}>
                        <Image
                            style={{
                                resizeMode: 'contain',
                                width: '50%',
                                height: '50%',
                            }}
                            source={{
                                uri: recipe.picture,
                            }}
                        />
                        <Text>Dish Name: {recipe.dishname}</Text>
                        <Text>Guide: {recipe.guide}</Text>
                        <Text>Description: {recipe.description}</Text>
                        <Text>Nutrition: {recipe.nutrition}</Text>
                        <Text>Allergens: {recipe.allergens}</Text>
                        <Text>Category: {recipe.category}</Text>
                        <Text>Culture: {recipe.culture}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};


export default RecipeScreen

const styles = StyleSheet.create({})