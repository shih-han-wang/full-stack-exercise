import { render } from '@testing-library/react'
import SubmitButton from './SubmitButton'

const onClickMock = jest.fn()

describe('Components > Quiz > SubmitButton', () => {
  it('should render correctly', async () => {
    const view = render(<SubmitButton onClick={onClickMock} />)

    expect(view.asFragment()).toMatchSnapshot()
  })

  it('should render disabled state correctly', async () => {
    const view = render(<SubmitButton onClick={onClickMock} disabled />)

    expect(view.asFragment()).toMatchSnapshot()
  })

  it('should render buttonTextcorrectly', async () => {
    const view = render(
      <SubmitButton onClick={onClickMock} buttonText='Click me!' />
    )

    expect(view.asFragment()).toMatchSnapshot()
  })
})
