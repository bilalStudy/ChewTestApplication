import express from "express";
import { ObjectId } from "mongodb";

export function QuizApi(db) {
  const api = express.Router();

  // GET /api/quiz
  api.get("/", async (req, res) => {
    try {
      const quizzes = await db
        .collection("quiz")
        .find()
        .toArray();

      res.json(quizzes);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while getting the quizzes." });
    }
  });

    api.get("/quizzes", async (req, res) => {try {
        const listAllQuiz = await db.collection("quiz")
            .find()
            .map(({ _id, quizName, questions }) => ({
                id: _id,
                quizName,
                questions
            }))
            .toArray();
        res.json(listAllQuiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while getting the quizzes.' });
    }
    })

  // POST /api/quiz
  api.post("/", async (req, res) => {
    try {
      const { quizName, questions } = req.body;

      const quiz = await db.collection("quiz").insertOne({
        quizName,
        questions,
      });

      res.status(201).json({ id: quiz.insertedId });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while creating the quiz." });
    }
  });

  return api;
}
