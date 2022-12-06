import { useRadioGroup, VStack } from '@chakra-ui/react'
import { RadioCard } from './components'

type Props = {
  options: string[]
  onChange: () => void
  value: string
  disabled: boolean
}

const RadioGroup = ({ options, onChange, value, disabled }: Props) => {
  const { getRootProps, getRadioProps, isDisabled } = useRadioGroup({
    name: 'answer',
    onChange,
    value,
    isDisabled: disabled
  })

  return (
    <VStack {...getRootProps()} spacing={5} alignItems='stretch'>
      {options &&
        options.map((value) => {
          const radio = getRadioProps({ value, isDisabled })
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          )
        })}
    </VStack>
  )
}

export default RadioGroup
