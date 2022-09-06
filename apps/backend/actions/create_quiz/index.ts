import { NextApiRequest, NextApiResponse } from 'next'
import {
  Mutation_Root,
  Mutation_RootCreate_QuizArgs
} from '../../sdk/generated'
import { HasuraRequestWithSessionVars } from '../../sdk/helpers'
import { createQuizQuestions } from './createQuizQuestions'
import { insertQuiz } from './insertQuiz'

export type CreateQuizInput = Omit<NextApiRequest, 'body'> & {
  body: HasuraRequestWithSessionVars<Mutation_RootCreate_QuizArgs>
}

export type CreateQuizOutput = Pick<Mutation_Root['create_quiz'], 'quizId'>

export const create_quiz = async (
  req: CreateQuizInput,
  res: NextApiResponse<CreateQuizOutput>
) => {
  try {
    const userId = req.body.session_variables['x-hasura-user-id']
    const difficulty = req.body.input.difficulty

    const questions = await createQuizQuestions(difficulty) // ❌ not yet implemented
    const quizId = await insertQuiz(userId, questions) // ✅ implemented

    res.status(200).json({ quizId })
    //                      ^^
    // We only need to return the `quizId` here thanks to a configured object
    // relationship in Hasura, which connects this action's response to the rest
    // of the graph. This means the end user is able to request fields from the
    // `quizzes` object as a response to the original `create_quiz` mutation.
    // More info: https://hasura.io/docs/latest/actions/action-relationships/
  } catch (error) {
    console.error(error)
    res.status(500)
  }
}
