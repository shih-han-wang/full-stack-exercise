import { randomUUID } from 'crypto'
import { CreateQuizOutput } from '..'
import { server } from '../../../sdk'
import { InsertQuizMutationVariables } from '../../../sdk/generated'

export const insertQuiz = async (
  userId: InsertQuizMutationVariables['userId'],
  questions: InsertQuizMutationVariables['questions']
): Promise<CreateQuizOutput['quizId']> => {
  const data = await server.InsertQuiz({
    quizId: randomUUID(),
    userId,
    questions
  })

  if (!data.insert_quizzes_one) {
    throw new Error('Failed to insert quiz')
  }

  const quizId = data.insert_quizzes_one.id
  return quizId
}
