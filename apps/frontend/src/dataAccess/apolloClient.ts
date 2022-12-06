import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const uri = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_API!
const token = process.env.NEXT_PUBLIC_USER1_JWT_TOKEN

const httpLink = createHttpLink({
  uri,
  headers: {
    authorization: `Bearer ${token}`
  }
})

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: token ? `Bearer ${token}` : ''
  }
}))

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})
