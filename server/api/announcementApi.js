import express from "express";
import { ObjectId } from "mongodb";

export function AnnouncementApi(db) {
    const api = express.Router();

    console.log("using announcement");

    api.get("/", async (req, res) => {
        try {
            const announcements = await db
                .collection("announcement")
                .find()
                .toArray();

            res.json(announcements);
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .json({ message: "An error occurred while getting the quizzes." });
        }
    });

    api.get("/quizzes", async (req, res) => {try {
        const listAnnouncement = await db.collection("quiz")
            .find()
            .map(({ _id, title, description, startTime, endTime, schoolclass, recipeId, authorId }) => ({
                id: _id,
                title,
                description,
                startTime,
                endTime,
                schoolclass,
                recipeId,
                authorId
            }))
            .toArray();
        res.json(listAnnouncement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while getting the quizzes.' });
    }
    })

    // POST /api/quiz
    api.post("/", async (req, res) => {
        try {
            const { title, description, startTime, endTime, schoolclass, recipeId, authorId } = req.body;

            const announcements = await db.collection("announcement").insertOne({
                title,
                description,
                startTime,
                endTime,
                schoolclass,
                recipeId,
                authorId
            });

            res.status(201).json({ id: announcements.insertedId });
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .json({ message: "An error occurred while creating the quiz." });
        }
    });

    return api;
}
