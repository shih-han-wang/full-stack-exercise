import { createQuizQuestions, NUMBER_OF_QUESTIONS_PER_QUIZ } from '.'
import { mockServer } from '../../../sdk'
import {
  Create_Quiz_Difficulty,
  mockGetQuestionsQuery
} from '../../../sdk/generated'
import { mockQuestions } from '../../../sdk/mockData'

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
    const quizQuestions = await createQuizQuestions(Create_Quiz_Difficulty.Easy)
    expect(quizQuestions).toHaveLength(NUMBER_OF_QUESTIONS_PER_QUIZ)
  })

  it('returns a set of questions where each question is unique', async () => {
    const quizQuestions = await createQuizQuestions(Create_Quiz_Difficulty.Easy)
    const uniqueQuizQuestionIds = [
      ...new Set(quizQuestions.map((item) => item.id))
    ]
    expect(uniqueQuizQuestionIds).toHaveLength(NUMBER_OF_QUESTIONS_PER_QUIZ)
  })

  it('returns a new random set of questions each time it is called', async () => {
    const quizQuestions1 = await createQuizQuestions(
      Create_Quiz_Difficulty.Easy
    )
    const quizQuestions2 = await createQuizQuestions(
      Create_Quiz_Difficulty.Easy
    )
    expect(quizQuestions1).not.toEqual(quizQuestions2)
  })
})
