import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { Circle } from '@chakra-ui/react'

import { QuizQuestion } from '../../../types/query/quiz.types'
import { ICON_COLORS } from './constants'
import { getIconVarient } from './helpers'
import { IconVarient } from './types'

type Props = {
  question: QuizQuestion
  currentOrder?: number
}

const QuizIcon = ({
  question: { response_correctness, order },
  currentOrder = 0
}: Props) => {
  const isCurrentQuestion = order === currentOrder
  const varient = getIconVarient(response_correctness)
  const Icon = varient === IconVarient.Correct ? CheckIcon : CloseIcon

  return (
    <Circle
      bg={ICON_COLORS[varient].bg}
      border='2px solid'
      borderColor={
        isCurrentQuestion
          ? ICON_COLORS[IconVarient.Current].border
          : ICON_COLORS[varient].border
      }
      size='6'
    >
      <Icon color='white' fontSize='xs' />
    </Circle>
  )
}

export default QuizIcon
