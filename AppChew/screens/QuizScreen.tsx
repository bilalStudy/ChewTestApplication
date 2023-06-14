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

interface Question {
  question: string;
  answer: boolean;
  userAnswer?: boolean;
  answerStatus?: boolean;
}

interface QuizItem {
  id: string;
  quizName: string;
  questions: Question[];
}

const QuizScreen = () => {
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const fetchedQuizzes = await listQuizzes();
      setQuizzes(fetchedQuizzes);
      calculateTotalPoints(fetchedQuizzes);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotalPoints = (quizzes: QuizItem[]) => {
    let points = 0;
    quizzes.forEach((quiz) => {
      points += quiz.questions.length;
    });
    setTotalPoints(points);
  };

  const handleAnswer = (questionId: string, isTrue: boolean) => {
    setQuizzes((prevQuizzes) => {
      const updatedQuizzes = prevQuizzes.map((quiz) => {
        if (quiz.questions.some((q) => q.question === questionId)) {
          let questionAnswered = false; // Flag to check if the question has already been answered

          const updatedQuestions = quiz.questions.map((question) => {
            if (question.question === questionId) {
              if (question.userAnswer !== undefined) {
                // If the question has already been answered, don't update anything
                questionAnswered = true;
                return question;
              }

              const answerStatus = isTrue === question.answer;
              const scoreIncrement = answerStatus ? 1 : 0;
              setScore((prevScore) => prevScore + scoreIncrement);

              return {
                ...question,
                userAnswer: isTrue,
                answerStatus: answerStatus,
              };
            }
            return question;
          });

          // If the question has already been answered, don't update the quiz
          if (questionAnswered) {
            return quiz;
          }

          return {
            ...quiz,
            questions: updatedQuestions,
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

        <FlatList<QuizItem>
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

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            Score: {score}/{totalPoints}
          </Text>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizItem: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  questionBox: {
    width: '100%',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    margin: 5,
    borderRadius: 5,
  },
  scoreContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuizScreen;

