import { sample, shuffle } from 'underscore'
import { server } from '../../../sdk'
import {
  Create_Quiz_Difficulty,
  Mutation_RootCreate_QuizArgs,
  Quizzes_Questions_Insert_Input,
  Quiz_Difficulty
} from '../../../sdk/generated'

export const NUMBER_OF_QUESTIONS_PER_QUIZ = 5
export const DIFFICULTY_SCORE_DIVIDER = 0.5
// Potential refactoring here to make it into algorithm
export const NUMBER_OF_EASY_QUESTIONS_FOR_MODERATE_QUIZ = 3
export const NUMBER_OF_HARD_QUESTIONS_FOR_MODERATE_QUIZ =
  NUMBER_OF_QUESTIONS_PER_QUIZ - NUMBER_OF_EASY_QUESTIONS_FOR_MODERATE_QUIZ

const NUMBER_OF_DIFFICULTY_QUESTIONS = {
  [Create_Quiz_Difficulty.Easy]: {
    [Quiz_Difficulty.Easy]: NUMBER_OF_QUESTIONS_PER_QUIZ,
    [Quiz_Difficulty.Hard]: 0
  },
  [Create_Quiz_Difficulty.Moderate]: {
    [Quiz_Difficulty.Easy]: NUMBER_OF_EASY_QUESTIONS_FOR_MODERATE_QUIZ,
    [Quiz_Difficulty.Hard]: NUMBER_OF_HARD_QUESTIONS_FOR_MODERATE_QUIZ
  },
  [Create_Quiz_Difficulty.Hard]: {
    [Quiz_Difficulty.Easy]: 0,
    [Quiz_Difficulty.Hard]: NUMBER_OF_QUESTIONS_PER_QUIZ
  }
}

export type CreateQuizQuestionsOutput = Array<
  NonNullable<Quizzes_Questions_Insert_Input['question_id']>
>

export const createQuizQuestions = async (
  difficulty: Mutation_RootCreate_QuizArgs['difficulty']
): Promise<CreateQuizQuestionsOutput> => {
  const data = await server.GetQuestions()

  const numberOfEasyQuestions =
    NUMBER_OF_DIFFICULTY_QUESTIONS[difficulty][Quiz_Difficulty.Easy]
  const numberOfHardQuestions =
    NUMBER_OF_DIFFICULTY_QUESTIONS[difficulty][Quiz_Difficulty.Hard]

  const easyQuestsions = data.questions.filter(
    ({ difficulty: score }) => score < DIFFICULTY_SCORE_DIVIDER
  )
  const hardQuestsions = data.questions.filter(
    ({ difficulty: score }) => score >= DIFFICULTY_SCORE_DIVIDER
  )

  return shuffle([
    ...sample(easyQuestsions, numberOfEasyQuestions).map(({ id }) => id),
    ...sample(hardQuestsions, numberOfHardQuestions).map(({ id }) => id)
  ])
}
