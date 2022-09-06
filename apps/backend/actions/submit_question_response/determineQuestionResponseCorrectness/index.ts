import {
  Mutation_RootSubmit_Question_ResponseArgs,
  Quizzes_Questions_Response_Correctness_Enum
} from '../../../sdk/generated'

export const determineQuestionResponseCorrectness = async (
  input: Mutation_RootSubmit_Question_ResponseArgs['question_response']
): Promise<Quizzes_Questions_Response_Correctness_Enum> => {
  // e.g.
  return Quizzes_Questions_Response_Correctness_Enum.Correct
}
