import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { COMPLETE_QUIZ, SUBMIT_QUESTION_RESPONSE } from '../../query'
import { QuizQuestion } from '../../types/query/quiz.types'

type Props = {
  id: string
  currentOrder: number
  allQuestions: QuizQuestion[]
  setAnswer: Dispatch<SetStateAction<string | null>>
  quizId: string
}

const useQuizzes = ({
  id,
  currentOrder,
  allQuestions,
  setAnswer,
  quizId
}: Props) => {
  const { push } = useRouter()

  const [submitAnswer, { loading }] = useMutation(SUBMIT_QUESTION_RESPONSE)
  const [completeQuiz, { loading: completing }] = useMutation(COMPLETE_QUIZ)

  const handleSubmitAnswer = useCallback(
    async (response: String | null) => {
      await submitAnswer({
        variables: { question_response: { quiz_question_id: id, response } }
      })
      setAnswer(null)
    },
    [submitAnswer, id, setAnswer]
  )

  const handleCompleteQuiz = useCallback(async () => {
    await completeQuiz({ variables: { quiz_id: quizId } })
    push(`/result/${quizId}`)
  }, [completeQuiz, quizId, push])

  const handleSubmit = useCallback(
    async (response: String | null) => {
      await handleSubmitAnswer(response)
      const nextQuestionId = allQuestions.find(
        ({ order }) => order === currentOrder + 1
      )?.id

      if (nextQuestionId) return push(`/question/${nextQuestionId}`)

      handleCompleteQuiz()
    },
    [allQuestions, currentOrder, push, handleSubmitAnswer, handleCompleteQuiz]
  )

  return { handleSubmit, setAnswer, loading: loading || completing }
}

export default useQuizzes
