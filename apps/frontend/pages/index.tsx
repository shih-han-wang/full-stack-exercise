import { useMutation } from '@apollo/client'
import { Button, Flex, Spinner, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { MouseEvent, useEffect, useState } from 'react'

import { Create_Quiz_Difficulty } from 'backend/sdk/generated'

import { QuizLayout } from '../src/components'
import { apolloClient } from '../src/dataAccess'
import { CREATE_QUIZ, GET_INCOMPLETE_QUIZZES, GET_USER } from '../src/query'

type Question = {
  __typename: 'quizzes_questions'
  id: string
  response?: string
}

type Props = {
  user: { __typename: 'users'; first_name: string }
}

const USER_ID = 'user1'
const createQuizOptions = [
  Create_Quiz_Difficulty.Easy,
  Create_Quiz_Difficulty.Moderate,
  Create_Quiz_Difficulty.Hard
]

const WelcomePage = ({ user }: Props) => {
  const router = useRouter()
  const [createQuiz, { data }] = useMutation(CREATE_QUIZ)
  const [isLoading, setIsLoading] = useState(false)

  const handleOnClick = (event: MouseEvent) => {
    event.preventDefault()
    setIsLoading(true)
    createQuiz({ variables: { difficulty: (event.target as any).value } })
  }

  useEffect(() => {
    const questionId = data?.create_quiz?.quiz?.questions[0]?.id

    if (questionId) router.push(`/question/${questionId}`)
  }, [data, router])

  if (isLoading)
    return (
      <Flex alignItems='center' h='100vh' justifyContent='center' gap='2'>
        <Spinner size='lg' />
      </Flex>
    )

  return (
    <QuizLayout heading={`Hey ${user.first_name}, welcome to the quiz!`}>
      <Text fontSize='2xl' lineHeight={8} mb={8}>
        Choose your difficulty:
      </Text>

      <Stack direction='column' spacing={4}>
        {createQuizOptions.map((option) => (
          <Button
            key={option}
            colorScheme='teal'
            size='lg'
            width='240px'
            value={option}
            onClick={handleOnClick}
          >
            {option}
          </Button>
        ))}
      </Stack>
    </QuizLayout>
  )
}

export const getServerSideProps = async () => {
  try {
    const { data } = await apolloClient.query({
      query: GET_INCOMPLETE_QUIZZES
    })

    const firstIncompleteQuiz = data?.quizzes[0]

    if (firstIncompleteQuiz?.questions?.length > 0) {
      const questionId = firstIncompleteQuiz.questions.find(
        (question: Question) => !question.response
      )?.id

      return {
        redirect: {
          destination: `question/${questionId}`,
          permanent: false
        }
      }
    }

    const { data: userData } = await apolloClient.query({
      query: GET_USER,
      variables: { id: USER_ID }
    })

    return { props: { user: userData?.users_by_pk } }
  } catch (error) {
    console.error(error)
    return { props: {} }
  }
}

export default WelcomePage
