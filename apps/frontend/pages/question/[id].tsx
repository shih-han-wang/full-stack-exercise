import { Flex, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { QuizLayout, QuizNav, SubmitButton } from '../../src/components'
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
  quizId: string
}

const QuestionPage = ({
  allQuestions,
  currentQuestion: {
    answer_type: answerType,
    input_label: inputLabel,
    input_options: inputOptions
  },
  currentOrder,
  id,
  quizId,
  response
}: Props) => {
  const [answer, setAnswer] = useState<string | null>(response)

  useEffect(() => {
    setAnswer(response)
  }, [response])

  const { handleSubmit, loading } = useQuizzes({
    allQuestions,
    currentOrder,
    id,
    setAnswer,
    quizId
  })

  const { QuizTemplate, props, showSubmitBtn } = useQuizTemplate({
    answerType,
    handleSubmit,
    inputOptions,
    setAnswer,
    value: answer || '',
    disabled: !!response
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
      <QuizNav questions={allQuestions} currentOrder={currentOrder} />

      {loading || (props as any)?.value == undefined ? (
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
        currentOrder: questionData?.order,
        currentQuestion: questionData?.question,
        id,
        quizId: questionData?.quiz_id,
        response: questionData?.response
      }
    }
  } catch (error) {
    console.log(error)
    return { props: {} }
  }
}

export default QuestionPage
