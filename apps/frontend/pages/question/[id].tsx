import { Flex, Spinner } from '@chakra-ui/react'

import { useState } from 'react'
import { QuizLayout, SubmitButton } from '../../src/components'
import { apolloClient } from '../../src/dataAccess'
import { useQuizTemplate, useQuizzes } from '../../src/hooks'
import { GET_QUIZ_QUESTIONS_BY_QUESTION_ID } from '../../src/query'
import { Question, QuizQuestion } from '../../src/types/query/quiz.types'

export type Props = {
  allQuestions: QuizQuestion[]
  currentQuestion: Question
  id: string
  currentOrder: number
  response: string | null
}

const QuestionPage = ({
  allQuestions,
  currentQuestion: {
    answer_type: answerType,
    input_label: inputLabel,
    input_options: inputOptions
  },
  id,
  currentOrder,
  response
}: Props) => {
  const [answer, setAnswer] = useState<string | null>(null)

  const { handleSubmit, loading } = useQuizzes({
    allQuestions,
    currentOrder,
    id,
    setAnswer
  })

  const { QuizTemplate, props, showSubmitBtn } = useQuizTemplate({
    answerType,
    handleSubmit,
    inputOptions,
    setAnswer,
    value: response || undefined
  })

  return (
    <Flex
      as='form'
      padding='64px'
      height='100vh'
      alignItems='center'
      justifyContent='space-between'
      flexDirection='column'
    >
      {loading || !props ? (
        <Flex alignItems='center' h='100vh' justifyContent='center' gap='2'>
          <Spinner size='lg' />
        </Flex>
      ) : (
        <QuizLayout heading={inputLabel}>
          <QuizTemplate {...props}></QuizTemplate>
        </QuizLayout>
      )}

      {showSubmitBtn && (
        <SubmitButton
          onClick={() => handleSubmit(answer)}
          disabled={!answer || !!response || loading}
        />
      )}
    </Flex>
  )
}

export const getServerSideProps = async ({
  params: { id }
}: {
  params: { id: string }
}) => {
  try {
    const { data } = await apolloClient.query({
      query: GET_QUIZ_QUESTIONS_BY_QUESTION_ID,
      variables: { id }
    })

    const questionData = data?.quizzes_questions_by_pk

    if (!questionData)
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }

    return {
      props: {
        allQuestions: questionData?.quiz?.questions,
        currentQuestion: questionData?.question,
        id,
        response: questionData?.response,
        currentOrder: questionData?.order
      }
    }
  } catch (error) {
    console.log(error)
    return { props: {} }
  }
}

export default QuestionPage
