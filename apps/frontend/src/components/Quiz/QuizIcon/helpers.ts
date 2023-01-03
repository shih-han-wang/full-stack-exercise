import { Quizzes_Questions_Response_Correctness_Enum } from 'backend/sdk/generated'
import { IconVarient } from './types'

export const getIconVarient = (
  correctness: Quizzes_Questions_Response_Correctness_Enum | null
) => {
  if (!correctness) return IconVarient.Default
  return correctness === Quizzes_Questions_Response_Correctness_Enum.Correct
    ? IconVarient.Correct
    : IconVarient.Incorrect
}
