import { NextApiRequest, NextApiResponse } from 'next'
import { server } from '../../sdk'
import {
  Mutation_Root,
  Mutation_RootComplete_QuizArgs
} from '../../sdk/generated'
import {
  HasuraActionPayload,
  HasuraRequestWithSessionVars
} from '../../sdk/helpers'

export type CompleteQuizInput = Omit<NextApiRequest, 'body'> & {
  body: HasuraRequestWithSessionVars<Mutation_RootComplete_QuizArgs>
}

export type CompleteQuizOutput = HasuraActionPayload<
  Pick<NonNullable<Mutation_Root['complete_quiz']>, 'quiz_id'>
>

export const complete_quiz = async (
  req: CompleteQuizInput,
  res: NextApiResponse<CompleteQuizOutput>
) => {
  try {
    const userId = req.body.session_variables['x-hasura-user-id']
    const quizId = req.body.input.quiz_id
    const data = await server.CompleteQuiz({ userId, quizId })
    const completedQuizId = data.update_quizzes?.returning[0].id

    if (!completedQuizId) {
      throw new Error('Could not complete quiz')
    }

    return res.status(200).json({ quiz_id: completedQuizId })
  } catch (error) {
    console.error(error)
    return res.status(400).json({
      message: 'Could not complete quiz'
    })
  }
}
