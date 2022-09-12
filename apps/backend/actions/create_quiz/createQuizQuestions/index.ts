import { server } from '../../../sdk'
import {
  Mutation_RootCreate_QuizArgs,
  Quizzes_Questions_Insert_Input
} from '../../../sdk/generated'

export const NUMBER_OF_QUESTIONS_PER_QUIZ = 5

export type CreateQuizQuestionsOutput = Array<
  NonNullable<Quizzes_Questions_Insert_Input['question_id']>
>

export const createQuizQuestions = async (
  difficulty: Mutation_RootCreate_QuizArgs['difficulty']
): Promise<CreateQuizQuestionsOutput> => {
  const data = await server.GetQuestions()

  // TASK 1
  // Instructions:
  // https://www.notion.so/joinhyphen/Full-stack-engineer-exercise-5ccde379536d47e98fd6cfea63b39ef8#3416333e0d154921b8c93d121c8dbf77
  // ...

  return ['question1', 'question2', 'question3', 'question4', 'question5']
}
