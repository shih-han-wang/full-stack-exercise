import { Input } from '@chakra-ui/react'

type Props = {
  onChange: () => void
  value: string
  disabled?: boolean
}

const TextInput = ({ onChange, value, disabled = false }: Props) => (
  <Input
    disabled={disabled}
    onChange={onChange}
    placeholder='Answer...'
    size='lg'
    value={value}
    width='320px'
  />
)

export default TextInput
