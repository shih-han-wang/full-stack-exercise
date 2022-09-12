import { NextApiRequest, NextApiResponse } from 'next'
import {
  Mutation_Root,
  Mutation_RootSubmit_Question_ResponseArgs
} from '../../sdk/generated'
import { HasuraRequestWithSessionVars } from '../../sdk/helpers'
import { determineQuestionResponseCorrectness } from './determineQuestionResponseCorrectness'
import { updateQuizQuestionResponse } from './updateQuizQuestionResponse'

export type SubmitQuestionResponseInput = Omit<NextApiRequest, 'body'> & {
  body: HasuraRequestWithSessionVars<Mutation_RootSubmit_Question_ResponseArgs>
}

export type SubmitQuestionResponseOutput = Pick<
  NonNullable<Mutation_Root['submit_question_response']>,
  'quiz_question_id'
>

export const submit_question_response = async (
  req: SubmitQuestionResponseInput,
  res: NextApiResponse<SubmitQuestionResponseOutput>
) => {
  try {
    const userId = req.body.session_variables['x-hasura-user-id']
    const input = req.body.input.question_response

    const correctness = await determineQuestionResponseCorrectness(input)
    const quizQuestionId = await updateQuizQuestionResponse(
      userId,
      input,
      correctness
    )

    return res.status(200).json({ quiz_question_id: quizQuestionId })
  } catch (error) {
    console.error(error)
    return res.status(500)
  }
}
