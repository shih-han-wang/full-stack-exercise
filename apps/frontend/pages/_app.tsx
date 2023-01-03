import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'

import { apolloClient } from '../src/dataAccess'

const App = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={apolloClient}>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  </ApolloProvider>
)

export default App
