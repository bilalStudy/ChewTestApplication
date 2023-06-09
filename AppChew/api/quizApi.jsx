import React from 'react';
import { baseUrl } from './userApi';

export const listQuizzes = async () => {
  try {
    const result = await fetch(`${baseUrl}/api/quiz/quizzes`);
    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }
    const data = await result.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching the quizzes.");
  }
};

/*
export const createQuiz = async (quizName, questions) => {
  try {
    const res = await fetch(`${baseUrl}/api/quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quizName, questions }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.id;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while creating the quiz.");
  }
};
*/

// Usage example:
listQuizzes().catch((error) => {
  console.error(error);
});

/*
createQuiz("Quiz Name", ["Question 1", "Question 2"]).catch((error) => {
  console.error(error);
});

*/
