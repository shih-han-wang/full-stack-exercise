import { GraphQLClient } from 'graphql-request'
import { setupServer } from 'msw/node'
import { getSdk } from './generated'

const backendClient = new GraphQLClient('http://localhost:8080/v1/graphql', {
  headers: { 'x-hasura-admin-secret': 'secret' }
})

export const server = getSdk(backendClient)
export const mockServer = setupServer()
