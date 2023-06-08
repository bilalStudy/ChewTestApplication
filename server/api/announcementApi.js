import express, {request} from "express";
import {ObjectId} from "mongodb";

export function RecipeApi(db){
    const api = express.Router();

    api.get("/", async (req, res) => {


        const listAllRecipe = await db.collection("announcement")
            .find()
            .map(({ _id, dishname, picture, guide, description, nutrition, allergens, ingredients, kitchentools, category, culture }) => ({
                id: _id,
                dishname,
                picture,
                guide,
                description,
                nutrition,
                allergens,
                ingredients,
                kitchentools,
                category,
                culture
            }))
            .toArray();

        res.json(listAllRecipe)
    })

    return api;
}