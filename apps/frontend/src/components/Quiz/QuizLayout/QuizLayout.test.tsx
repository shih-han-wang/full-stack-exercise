import { render } from '@testing-library/react'
import QuizLayout from './QuizLayout'

describe('Components > Quiz > QuizLayout', () => {
  it('should render correctly', async () => {
    const view = render(
      <QuizLayout heading='Ask me a question.'>
        <div>children</div>
      </QuizLayout>
    )

    expect(view.asFragment()).toMatchSnapshot()
  })
})
