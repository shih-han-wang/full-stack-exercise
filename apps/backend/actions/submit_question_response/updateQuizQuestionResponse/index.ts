import {
  Mutation_RootSubmit_Question_ResponseArgs,
  Quizzes_Questions_Response_Correctness_Enum
} from '../../../sdk/generated'

export const updateQuizQuestionResponse = async (
  userId: string,
  input: Mutation_RootSubmit_Question_ResponseArgs['question_response'],
  correctness: Quizzes_Questions_Response_Correctness_Enum
): Promise<string> => {
  return 'quizQuestionId'
}
