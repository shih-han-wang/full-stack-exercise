import { DeepRequired } from 'ts-essentials'
import { server } from '../../../sdk'
import {
  Mutation_RootCreate_QuizArgs,
  Quizzes_Questions_Insert_Input
} from '../../../sdk/generated'

export const NUMBER_OF_QUESTIONS_PER_QUIZ = 5
export const EASY_DIFFICULTY_MAX_THESHOLD = 2
export const MODERATE_DIFFICULTY_MAX_THRESHOLD = 3

export type CreateQuizQuestionsOutput = Array<
  DeepRequired<
    Pick<
      Quizzes_Questions_Insert_Input,
      'id' | 'quiz_id' | 'question_id' | 'order'
    >
  >
>

export const createQuizQuestions = async (
  difficulty: Mutation_RootCreate_QuizArgs['difficulty']
): Promise<CreateQuizQuestionsOutput> => {
  const data = await server.GetQuestions()

  // TASK 1
  // Instructions:
  // https://www.notion.so/joinhyphen/Full-stack-engineer-exercise-0ae49ea931074efc816d66f2ce7c27e7#50dde96adb234e429b2741c88afff9c0
  // ...

  return []
}
