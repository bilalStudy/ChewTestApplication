import IQuestion from './IQuestion';

interface IQuizItem {
  id: string;
  quizName: string;
  questions: IQuestion[];
}

export default IQuizItem;
