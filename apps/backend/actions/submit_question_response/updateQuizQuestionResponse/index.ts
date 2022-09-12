import { server } from '../../../sdk'
import {
  Mutation_RootSubmit_Question_ResponseArgs,
  Quizzes_Questions_Response_Correctness_Enum,
  UpdateQuizQuestionResponseMutation
} from '../../../sdk/generated'

export type UpdateQuizQuestionResponseOutput = NonNullable<
  UpdateQuizQuestionResponseMutation['update_quizzes_questions']
>['returning'][number]['id']

export const updateQuizQuestionResponse = async (
  userId: string,
  input: Mutation_RootSubmit_Question_ResponseArgs['question_response'],
  correctness: Quizzes_Questions_Response_Correctness_Enum
): Promise<UpdateQuizQuestionResponseOutput> => {
  const data = await server.UpdateQuizQuestionResponse({
    userId,
    quizQuestionId: input.quiz_question_id,
    input: {
      response: input.response,
      response_correctness: correctness
    }
  })

  const quizQuestionId = data.update_quizzes_questions?.returning[0].id

  if (!quizQuestionId) {
    throw new Error('Could not update quiz question')
  }

  return quizQuestionId
}
