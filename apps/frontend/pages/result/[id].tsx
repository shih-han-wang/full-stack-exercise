import { Button, Flex, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Quizzes_Questions_Response_Correctness_Enum } from 'backend/sdk/generated'

import { QuizIcon } from '../../src/components'
import { apolloClient } from '../../src/dataAccess'
import { GET_QUIZ } from '../../src/query'

interface Question {
  id: string
  response_correctness: Quizzes_Questions_Response_Correctness_Enum
  __typename: 'quizzes_questions'
}

type Props = {
  questions: Question[]
}

const ResultPage = ({ questions }: Props) => {
  const router = useRouter()
  return (
    <Flex
      height='100vh'
      justifyContent='center'
      flexDirection='column'
      alignItems='center'
      gap='10'
    >
      <Flex gap='2'>
        {questions.map((question) => (
          <QuizIcon key={question.id} question={question} />
        ))}
      </Flex>
      <Heading textAlign='center'>Great job, you completed the Quiz!</Heading>
      <Button
        variant='outline'
        colorScheme='gray'
        onClick={() => router.push('/')}
      >
        Start a new quiz
      </Button>
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
      query: GET_QUIZ,
      variables: { id }
    })

    const quiz = data?.quizzes_by_pk

    if (!quiz)
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }

    return {
      props: {
        questions: quiz?.questions
      }
    }
  } catch (error) {
    console.log(error)
    return { props: {} }
  }
}

export default ResultPage
