import { gql } from 'graphql-tag'

export const GET_QUESTIONS_QUERY = gql`
  query GetQuestions {
    questions {
      id
      difficulty
    }
  }
`
