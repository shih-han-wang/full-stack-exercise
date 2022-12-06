import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { SUBMIT_QUESTION_RESPONSE } from '../../query'
import { QuizQuestion } from '../../types/query/quiz.types'

type Props = {
  id: string
  currentOrder: number
  allQuestions: QuizQuestion[]
  setAnswer: Dispatch<SetStateAction<string | null>>
}

const useQuizzes = ({ id, currentOrder, allQuestions, setAnswer }: Props) => {
  const { push } = useRouter()

  const [submitAnswer, { loading }] = useMutation(SUBMIT_QUESTION_RESPONSE)

  const handleSubmitAnswer = useCallback(
    async (response: String | null) => {
      await submitAnswer({
        variables: { question_response: { quiz_question_id: id, response } }
      })
      setAnswer(null)
    },
    [submitAnswer, id, setAnswer]
  )

  const handleSubmit = useCallback(
    async (response: String | null) => {
      await handleSubmitAnswer(response)
      const nextQuestionId = allQuestions.find(
        ({ order }) => order === currentOrder + 1
      )?.id

      if (nextQuestionId) return push(`/question/${nextQuestionId}`)
    },
    [allQuestions, currentOrder, push, handleSubmitAnswer]
  )

  return { handleSubmit, setAnswer, loading: loading }
}

export default useQuizzes
