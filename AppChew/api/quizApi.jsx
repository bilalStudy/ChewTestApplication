import axios from "axios";

const API_BASE_URL = "/api/quiz"; // Replace with the actual API endpoint

export const listQuizzes = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching the quizzes.");
  }
};

export const createQuiz = async (quizName, questions) => {
  try {
    const response = await axios.post(API_BASE_URL, { quizName, questions });
    return response.data.id;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while creating the quiz.");
  }
};
