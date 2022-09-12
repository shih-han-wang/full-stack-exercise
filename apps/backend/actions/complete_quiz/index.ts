import { NextApiRequest, NextApiResponse } from 'next'
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
    // TASK 3
    // Instructions:
    // https://www.notion.so/joinhyphen/Full-stack-engineer-exercise-0ae49ea931074efc816d66f2ce7c27e7#e2d6346a45e4436988cfd769ebc6339a
    // ...

    return res.status(200).json({ quiz_id: 'quizId' })
  } catch (error) {
    console.error(error)
    return res.status(400).json({
      message: 'Could not create quiz'
    })
  }
}
