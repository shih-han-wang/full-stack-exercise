import { Box, useRadio } from '@chakra-ui/react'

const RadioCard = (props: any) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        cursor='pointer'
        textAlign='center'
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600'
        }}
        _focus={{
          boxShadow: 'outline'
        }}
        _hover={{
          borderColor: 'teal.600'
        }}
        _disabled={{
          pointerEvents: 'none',
          opacity: '0.7'
        }}
        px={{ base: 8, sm: 16, md: 24 }}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export default RadioCard
