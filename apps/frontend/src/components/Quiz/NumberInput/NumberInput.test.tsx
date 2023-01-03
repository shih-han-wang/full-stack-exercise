import { render } from '@testing-library/react'
import NumberInput from './NumberInput'

const onChangeMock = jest.fn()

describe('Components > Quiz > NumberInput', () => {
  it('should render correctly', async () => {
    const view = render(<NumberInput value={5} onChange={onChangeMock} />)

    expect(view.asFragment()).toMatchSnapshot()
  })

  it('should render disabled state correctly', async () => {
    const view = render(
      <NumberInput value={5} onChange={onChangeMock} disabled />
    )

    expect(view.asFragment()).toMatchSnapshot()
  })
})
