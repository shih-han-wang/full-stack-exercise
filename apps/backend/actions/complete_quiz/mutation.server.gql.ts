import { gql } from 'graphql-tag'

export const COMPLETE_QUIZ_MUTATION = gql`
  mutation CompleteQuiz($quizId: String!, $userId: String!) {
    update_quizzes(
      where: {
        id: { _eq: $quizId }
        user_id: { _eq: $userId }
        completed_at: { _is_null: true }
      }
      _set: { completed_at: "now()" }
    ) {
      returning {
        id
        completed_at
      }
    }
  }
`
