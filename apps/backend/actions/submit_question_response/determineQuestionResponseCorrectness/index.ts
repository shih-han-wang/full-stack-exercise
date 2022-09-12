import { server } from '../../../sdk'
import {
  Mutation_RootSubmit_Question_ResponseArgs,
  Quizzes_Questions_Response_Correctness_Enum
} from '../../../sdk/generated'

export const determineQuestionResponseCorrectness = async ({
  quiz_question_id,
  response
}: Mutation_RootSubmit_Question_ResponseArgs['question_response']): Promise<Quizzes_Questions_Response_Correctness_Enum> => {
  const data = await server.GetQuestionCorrectAnswer({ quiz_question_id })
  const { answer_value } = data.quizzes_questions_by_pk?.question ?? {}
  const isCorrect = answer_value?.toUpperCase() === response.toUpperCase()

  if (isCorrect) {
    return Quizzes_Questions_Response_Correctness_Enum.Correct
  }

  return Quizzes_Questions_Response_Correctness_Enum.Incorrect
}
