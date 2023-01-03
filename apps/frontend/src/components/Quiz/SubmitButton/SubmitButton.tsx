import { Button } from '@chakra-ui/react'

type Props = {
  disabled?: boolean
  onClick: () => void
  buttonText?: string
}

const SubmitButton = ({
  disabled = false,
  onClick,
  buttonText = 'Submit'
}: Props) => (
  <Button
    colorScheme='teal'
    disabled={disabled}
    onClick={onClick}
    size='lg'
    type='submit'
    width='320px'
  >
    {buttonText}
  </Button>
)

export default SubmitButton
