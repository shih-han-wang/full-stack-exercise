import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper
} from '@chakra-ui/react'

type Props = {
  value: number
  disabled?: boolean
  onChange: () => void
}

const Number = ({ value, disabled = false, onChange }: Props) => (
  <NumberInput value={value} onChange={onChange} isDisabled={disabled}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>
)

export default Number
