import React, { useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import { listQuizzes } from '../api/quizApi';

interface Question {
  question: string;
  answer: boolean;
  answerStatus?: 'green' | 'red';
}

interface QuizItem {
  id: string;
  quizName: string;
  questions: Question[];
}

const QuizScreen = () => {
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const fetchedQuizzes = await listQuizzes();
      setQuizzes(fetchedQuizzes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnswer = (questionId: string, isTrue: boolean) => {
    setQuizzes((prevQuizzes) => {
      const updatedQuizzes = prevQuizzes.map((quiz) => {
        if (quiz.questions.some((q) => q.question === questionId)) {
          return {
            ...quiz,
            questions: quiz.questions.map((question) => {
              if (question.question === questionId) {
                return {
                  ...question,
                  answerStatus: isTrue ? 'green' : 'red',
                };
              }
              return question;
            }),
          };
        }
        return quiz;
      });
      return updatedQuizzes;
    });
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <FlatList<QuizItem>
        data={quizzes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.quizItem}>
            <Text>Quiz Name: {item.quizName}</Text>
            {item.questions.map((questionObj, index) => (
              <View
                key={index}
                style={[
                  styles.quizItem,
                  { width: screenWidth * 0.8 },
                ]}
              >
                <View style={styles.questionBox}>
                  <Text>{questionObj.question}</Text>
                </View>
                <View style={styles.buttonContainer}>
                  <View style={[styles.button, { backgroundColor: questionObj.answerStatus === 'green' ? 'green' : '#F86D47' }]}>
                    <Button
                      title="True"
                      onPress={() => handleAnswer(questionObj.question, true)}
                      color="#fff"
                    />
                  </View>
                  <View style={[styles.button, { backgroundColor: questionObj.answerStatus === 'red' ? 'red' : '#F86D47' }]}>
                    <Button
                      title="False"
                      onPress={() => handleAnswer(questionObj.question, false)}
                      color="#fff"
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizItem: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  questionBox: {
    height: 150,
    marginBottom: '5%',
    padding: 10,
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '45%',
    borderWidth: 0.5,
    borderRadius: 10,
  },
});
