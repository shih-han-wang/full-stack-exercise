import { NextApiRequest, NextApiResponse } from 'next'
import {
  Mutation_Root,
  Mutation_RootSubmit_Question_ResponseArgs
} from '../../sdk/generated'
import {
  HasuraActionPayload,
  HasuraRequestWithSessionVars
} from '../../sdk/helpers'
import { determineQuestionResponseCorrectness } from './determineQuestionResponseCorrectness'
import { updateQuizQuestionResponse } from './updateQuizQuestionResponse'

export type SubmitQuestionResponseInput = Omit<NextApiRequest, 'body'> & {
  body: HasuraRequestWithSessionVars<Mutation_RootSubmit_Question_ResponseArgs>
}

export type SubmitQuestionResponseOutput = HasuraActionPayload<
  Pick<
    NonNullable<Mutation_Root['submit_question_response']>,
    'quiz_question_id'
  >
>

export const submit_question_response = async (
  req: SubmitQuestionResponseInput,
  res: NextApiResponse<SubmitQuestionResponseOutput>
) => {
  try {
    const userId = req.body.session_variables['x-hasura-user-id']
    console.log('TCL: ~ userId', userId)
    const input = req.body.input.question_response
    console.log('TCL: ~ input', input)

    const correctness = await determineQuestionResponseCorrectness(input)
    console.log('TCL: ~ correctness', correctness)
    const quizQuestionId = await updateQuizQuestionResponse(
      userId,
      input,
      correctness
    )
    console.log('TCL: ~ quizQuestionId', quizQuestionId)

    return res.status(200).json({
      quiz_question_id: quizQuestionId
    })
  } catch (error) {
    console.error(error)
    return res.status(400).json({
      message: 'Could not update question response'
    })
  }
}
