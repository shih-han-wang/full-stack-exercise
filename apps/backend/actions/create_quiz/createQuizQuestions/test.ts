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
})
