import {Image, StyleSheet, Text, View, FlatList} from 'react-native' // fix here
import React, {useEffect, useState} from 'react'
import { listQuizzes } from '../api/quizApi'; // fix here

interface QuizItem {
  id: string;
  quizName: string;
  questions: any[]; // replace 'any' with the type of your questions if known
}

const QuizScreen = () => {
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const fetchedQuizzes = await listQuizzes();
      // ensure each item in fetchedQuizzes has an 'id' field
      setQuizzes(fetchedQuizzes);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Quiz screen</Text>
      <FlatList<QuizItem>
        data={quizzes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>Quiz Name: {item.quizName}</Text>
            <Text>Questions: {JSON.stringify(item.questions)}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({});