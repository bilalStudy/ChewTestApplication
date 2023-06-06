import express, {request} from "express";
import {ObjectId} from "mongodb";

export function RecipeApi(db){
    const api = express.Router();

        api.get("/", async (req, res) => {try {
            const listAllRecipe = await db.collection("recipe")
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
    
            res.json(listAllRecipe);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while getting the recipes.' });
        }
    })

    return api;
}