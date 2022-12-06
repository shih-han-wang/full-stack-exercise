import { Flex, Heading } from '@chakra-ui/react'
import { ReactElement } from 'react'

type Props = {
  children: ReactElement | ReactElement[]
  heading: string
}

const QuizLayout = ({ children, heading }: Props) => (
  <Flex
    height='100vh'
    alignItems='center'
    justifyContent='center'
    flexDirection='column'
  >
    <Heading as='h1' size='2xl' mb={8} textAlign='center'>
      {heading}
    </Heading>

    {children}
  </Flex>
)

export default QuizLayout
