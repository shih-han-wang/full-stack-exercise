import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Button, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { QuizQuestion } from '../../../types/query/quiz.types'
import QuizIcon from '../QuizIcon/QuizIcon'

type Props = {
  questions: QuizQuestion[]
  currentOrder: number
}

const QuizNav = ({ questions, currentOrder }: Props) => {
  const router = useRouter()
  const handleOnClick = (id: string) => id && router.push(`/question/${id}`)

  const nextQuestion = questions?.find(
    ({ order }) => order === currentOrder + 1
  )
  const currentQuestion = questions?.find(({ order }) => order === currentOrder)
  const previousQuestion = questions?.find(
    ({ order }) => order === currentOrder - 1
  )

  return (
    <Flex minWidth='100%' alignItems='center' justifyContent='center'>
      <Flex justifyContent='flex-start' flex='1'>
        {!!previousQuestion && (
          <Button
            size='md'
            colorScheme='gray'
            variant='outline'
            onClick={() => handleOnClick(previousQuestion?.id)}
          >
            <ChevronLeftIcon />
            Back
          </Button>
        )}
      </Flex>
      <Flex gap='2'>
        {questions.map((question) => (
          <QuizIcon
            key={question.id}
            question={question}
            currentOrder={currentOrder}
          />
        ))}
      </Flex>
      <Flex justifyContent='flex-end' flex='1'>
        {nextQuestion && (
          <Button
            size='md'
            colorScheme='gray'
            variant='outline'
            onClick={() => handleOnClick(nextQuestion?.id)}
            disabled={!currentQuestion?.response_correctness}
          >
            <ChevronRightIcon />
            Next
          </Button>
        )}
      </Flex>
    </Flex>
  )
}

export default QuizNav
