import express, {request} from "express";
import {BSON, ObjectId} from 'bson';

export function AnnouncementApi(db){
    const api = express.Router();

    api.get("/", async (req, res) => {


        const listAllAnnouncements = await db.collection("announcement")
            .find()
            .map(({ _id, title, description, startTime, endTime, school, schoolclass, recipeName, authorName }) => ({
                id: _id,
                title,
                description,
                startTime,
                endTime,
                school,
                schoolclass,
                recipeName,
                authorName
            }))
            .toArray();

        res.json(listAllAnnouncements)
    })

    api.post("/", async (req, res) => {


        const {_id, title, description, startTime, endTime, school, schoolClass, recipeName, authorName} = req.body

        console.log(req.body)


        // earlier implementation, finding based on author id and recipe id, the thought was that we send up all the arrays as json
        // but saw a better/easier solution

        /*
        const currentUser = await db.collection("users")
            .find({_id : new BSON.ObjectId(authorId)}).toArray();

        console.log(currentUser);

         */







        const result = db.collection("announcement").insertOne({
            title,
            description,
            startTime,
            endTime,
            school,
            schoolClass,
            recipeName,
            authorName,
        });



        res.sendStatus(200);

    })

    api.get("/:school", async (req,res) => {

        console.log(req.params.school)

        const schoolAnnouncement = await db.collection("announcement")
            .find({school: req.params.school}).toArray();


        // earlier implementation, finding based on author id and recipe id, the thought was that we send up all the arrays as json
        // but saw a better/easier solution

        /*
        console.log(schoolAnnouncement)
        console.log(schoolAnnouncement.map(user => (
            user.authorId
        )))

        const authorIdArray = schoolAnnouncement.map(user => (
            user.authorId
        ))


        const authorOids = [];
        authorIdArray.forEach(function(item){
            authorOids.push(new ObjectId(item))
        });


        const authors = await db.collection("users")
            .find({_id : { $in : authorOids }  }).toArray();

        const recipeIdArray = schoolAnnouncement.map(recipe => (
            recipe.recipeId
        ))

        const recipeOids = [];
        recipeIdArray.forEach(function (item){
            recipeOids.push(new ObjectId(item))
        });

        const recipes = await db.collection("recipe")
            .find({_id : { $in : recipeOids }  }).toArray();


        console.log(authors)
        console.log(recipes)

        const superArray = []
        superArray.push(schoolAnnouncement)
        superArray.push(authors)
        superArray.push(recipes)

         */

        res.json(schoolAnnouncement)

    })

    api.get("/:school/:schoolClass", async (req,res) => {

        console.log(req.params.school)
        console.log(req.params.schoolClass)

        const schoolAnnouncement = await db.collection("announcement")
            .find({school: req.params.school, schoolClass: req.params.schoolClass}).toArray();

        console.log(schoolAnnouncement)

        res.json(schoolAnnouncement)



    })

    return api;
}