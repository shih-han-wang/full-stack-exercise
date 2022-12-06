import { render } from '@testing-library/react'
import TextInput from './TextInput'

const onChangeMock = jest.fn()

describe('Components > Quiz > TextInput', () => {
  it('should render correctly', async () => {
    const view = render(<TextInput value='value' onChange={onChangeMock} />)

    expect(view.asFragment()).toMatchSnapshot()
  })

  it('should render disabled state correctly', async () => {
    const view = render(
      <TextInput value='value' onChange={onChangeMock} disabled />
    )

    expect(view.asFragment()).toMatchSnapshot()
  })
})
