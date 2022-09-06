import { updateQuizQuestionResponse } from '.'
import { Quizzes_Questions_Response_Correctness_Enum } from '../../../sdk/generated'

describe('updateQuizQuestionResponse', () => {
  it('returns a quiz question ID', async () => {
    const quizQuestionId = await updateQuizQuestionResponse(
      {
        quiz_question_id: '1',
        response: 'foo'
      },
      Quizzes_Questions_Response_Correctness_Enum.Correct
    )

    expect(quizQuestionId).toBe('quizQuestionId')
  })
})
