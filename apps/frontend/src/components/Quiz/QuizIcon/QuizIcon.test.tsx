import { render } from '@testing-library/react'
import { Quizzes_Questions_Response_Correctness_Enum } from 'backend/sdk/generated'
import { QuizQuestion } from '../../../types/query/quiz.types'
import QuizIcon from './QuizIcon'

const mockQuestions: QuizQuestion[] = [
  {
    __typename: 'quizzes_questions',
    id: 'id-1',
    order: 1,
    response_correctness: Quizzes_Questions_Response_Correctness_Enum.Correct
  },
  {
    __typename: 'quizzes_questions',
    id: 'id-2',
    order: 2,
    response_correctness: Quizzes_Questions_Response_Correctness_Enum.Incorrect
  },
  {
    __typename: 'quizzes_questions',
    id: 'id-3',
    order: 3,
    response_correctness: null
  },
  {
    __typename: 'quizzes_questions',
    id: 'id-4',
    order: 4,
    response_correctness: null
  }
]

describe('Components > Quiz > QuizIcon', () => {
  it('should render correctly for correct response varient', async () => {
    const view = render(
      <QuizIcon question={mockQuestions[0]} currentOrder={3} />
    )

    expect(view.asFragment()).toMatchSnapshot()
  })

  it('should render correctly for incorrect response varient', async () => {
    const view = render(
      <QuizIcon question={mockQuestions[1]} currentOrder={3} />
    )

    expect(view.asFragment()).toMatchSnapshot()
  })

  it('should render correctly for current order varient', async () => {
    const view = render(
      <QuizIcon question={mockQuestions[2]} currentOrder={3} />
    )

    expect(view.asFragment()).toMatchSnapshot()
  })

  it('should render correctly for default varient', async () => {
    const view = render(
      <QuizIcon question={mockQuestions[3]} currentOrder={3} />
    )

    expect(view.asFragment()).toMatchSnapshot()
  })
})
