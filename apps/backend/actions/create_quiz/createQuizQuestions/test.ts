import {
  createQuizQuestions,
  DIFFICULTY_SCORE_DIVIDER,
  NUMBER_OF_EASY_QUESTIONS_FOR_MODERATE_QUIZ,
  NUMBER_OF_HARD_QUESTIONS_FOR_MODERATE_QUIZ,
  NUMBER_OF_QUESTIONS_PER_QUIZ
} from '.'
import { mockServer } from '../../../sdk'
import {
  Create_Quiz_Difficulty,
  mockGetQuestionsQuery
} from '../../../sdk/generated'
import { mockQuestions } from '../../../sdk/mockData'

const getQuestionsDifficulties = (quizQuestionIds: String[]) =>
  quizQuestionIds
    .map((id) => mockQuestions.find((question) => question.id === id))
    .map((question) => question?.difficulty)

describe('createQuizQuestions', () => {
  const questions = mockQuestions.map(
    ({ answer_value, ...propertiesToKeep }) => propertiesToKeep
  )

  beforeEach(() => {
    mockServer.use(
      mockGetQuestionsQuery((req, res, ctx) => {
        return res(ctx.data({ questions }))
      })
    )
  })

  it(`returns a set of ${NUMBER_OF_QUESTIONS_PER_QUIZ} questions`, async () => {
    const quizQuestionIds = await createQuizQuestions(
      Create_Quiz_Difficulty.Easy
    )
    expect(quizQuestionIds).toHaveLength(NUMBER_OF_QUESTIONS_PER_QUIZ)
  })

  it('returns a set of questions where each question is unique', async () => {
    const quizQuestionIds = await createQuizQuestions(
      Create_Quiz_Difficulty.Easy
    )
    const uniqueQuizQuestionIds = [...new Set(quizQuestionIds)]
    expect(uniqueQuizQuestionIds).toHaveLength(NUMBER_OF_QUESTIONS_PER_QUIZ)
  })

  it('returns a new set of questions each time it is called', async () => {
    const quizQuestionsIds1 = await createQuizQuestions(
      Create_Quiz_Difficulty.Easy
    )
    const quizQuestionsIds2 = await createQuizQuestions(
      Create_Quiz_Difficulty.Easy
    )
    expect(quizQuestionsIds1).not.toEqual(quizQuestionsIds2)
  })

  it(`returns a set of easy questions for ${Create_Quiz_Difficulty.Easy} quiz`, async () => {
    const quizQuestionIds = await createQuizQuestions(
      Create_Quiz_Difficulty.Easy
    )

    const quizQuestionsDifficulties = getQuestionsDifficulties(quizQuestionIds)

    expect(
      quizQuestionsDifficulties.filter(
        (difficulty) => difficulty && difficulty < DIFFICULTY_SCORE_DIVIDER
      )
    ).toHaveLength(NUMBER_OF_QUESTIONS_PER_QUIZ)
  })

  it(`returns ${NUMBER_OF_HARD_QUESTIONS_FOR_MODERATE_QUIZ} hard questions for ${Create_Quiz_Difficulty.Moderate} quiz`, async () => {
    const quizQuestionIds = await createQuizQuestions(
      Create_Quiz_Difficulty.Moderate
    )

    const quizQuestionsDifficulties = getQuestionsDifficulties(quizQuestionIds)

    expect(
      quizQuestionsDifficulties.filter(
        (difficulty) => difficulty && difficulty >= DIFFICULTY_SCORE_DIVIDER
      )
    ).toHaveLength(NUMBER_OF_HARD_QUESTIONS_FOR_MODERATE_QUIZ)
  })

  it(`returns ${NUMBER_OF_EASY_QUESTIONS_FOR_MODERATE_QUIZ} easy questions for ${Create_Quiz_Difficulty.Moderate} quiz`, async () => {
    const quizQuestionIds = await createQuizQuestions(
      Create_Quiz_Difficulty.Moderate
    )

    const quizQuestionsDifficulties = getQuestionsDifficulties(quizQuestionIds)

    expect(
      quizQuestionsDifficulties.filter(
        (difficulty) => difficulty && difficulty < DIFFICULTY_SCORE_DIVIDER
      )
    ).toHaveLength(NUMBER_OF_EASY_QUESTIONS_FOR_MODERATE_QUIZ)
  })

  it(`returns a set of hard questions for ${Create_Quiz_Difficulty.Hard} quiz`, async () => {
    const quizQuestionIds = await createQuizQuestions(
      Create_Quiz_Difficulty.Hard
    )

    const quizQuestionsDifficulties = getQuestionsDifficulties(quizQuestionIds)

    expect(
      quizQuestionsDifficulties.filter(
        (difficulty) => difficulty && difficulty >= DIFFICULTY_SCORE_DIVIDER
      )
    ).toHaveLength(NUMBER_OF_QUESTIONS_PER_QUIZ)
  })
})
