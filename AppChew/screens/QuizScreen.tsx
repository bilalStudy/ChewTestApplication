import React, { useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import { listQuizzes } from '../api/quizApi';
import IQuizItem from '../interfaces/IQuizItem';

const QuizScreen = () => {
  const [quizzes, setQuizzes] = useState<IQuizItem[]>([]);

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
                  userAnswer: isTrue,
                  answerStatus: isTrue === question.answer,
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
      <View
        style={{
          width: '80%',
          padding: 10,
          borderRadius: 10,
          alignItems: 'center',
        }}
      >
        <Image
          source={require('../assets/background2.jpg')}
          style={{
            resizeMode: 'cover',
            width: '100%',
            height: 150,
            borderRadius: 10,
          }}
        />
      </View>
      <Text style={{ left: '25%' }}>(13k Reviews)</Text>

      <FlatList<IQuizItem>
        data={quizzes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.quizItem}>
            <Text style={{ left: '5%' }}>Quiz Name: {item.quizName}</Text>
            {item.questions.map((questionObj, index) => (
              <View
                key={index}
                style={[styles.quizItem, { width: screenWidth * 0.8 }]}
              >
                <View style={styles.questionBox}>
                  <Text>{questionObj.question}</Text>
                </View>
                <View style={styles.buttonContainer}>
                  <View
                    style={[
                      styles.button,
                      {
                        backgroundColor:
                          questionObj.userAnswer !== undefined
                            ? questionObj.userAnswer === true
                              ? questionObj.answerStatus
                                ? '#34A853'
                                : '#EA4335'
                              : 'transparent'
                            : 'transparent',
                      },
                    ]}
                  >
                    <Button
                      title="True?"
                      onPress={() => handleAnswer(questionObj.question, true)}
                      color={
                        questionObj.userAnswer !== undefined &&
                        questionObj.userAnswer === true
                          ? '#fff'
                          : '#F86D47'
                      }
                    />
                  </View>

                  <View
                    style={[
                      styles.button,
                      {
                        backgroundColor:
                          questionObj.userAnswer !== undefined
                            ? questionObj.userAnswer === false
                              ? questionObj.answerStatus
                                ? '#34A853'
                                : '#EA4335'
                              : 'transparent'
                            : 'transparent',
                      },
                    ]}
                  >
                    <Button
                      title="False?"
                      onPress={() => handleAnswer(questionObj.question, false)}
                      color={
                        questionObj.userAnswer !== undefined &&
                        questionObj.userAnswer === false
                          ? '#fff'
                          : '#F86D47'
                      }
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
    width: '50%',
    borderRadius: 10,
  },
});
