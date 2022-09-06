import { determineQuestionResponseCorrectness } from '.'
import { Quizzes_Questions_Response_Correctness_Enum } from '../../../sdk/generated'

describe('determineQuestionResponseCorrectness', () => {
  it('returns a Quizzes_Questions_Response_Correctness_Enum value', async () => {
    const correctness = await determineQuestionResponseCorrectness({
      quiz_question_id: '1',
      response: 'foo'
    })

    const values = Object.values(Quizzes_Questions_Response_Correctness_Enum)
    expect(values).toContain(correctness)
  })
})
