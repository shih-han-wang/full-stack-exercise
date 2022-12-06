import { gql } from '@apollo/client'

// Queries
export const GET_INCOMPLETE_QUIZZES = gql`
  query GetIncompleteQuizzes {
    quizzes(
      where: { completed_at: { _is_null: true } }
      order_by: { started_at: asc }
    ) {
      id
      completed_at
      questions(order_by: { order: asc }) {
        id
        response
      }
    }
  }
`

// Mutations
export const CREATE_QUIZ = gql`
  mutation CreateQuiz($difficulty: Create_Quiz_Difficulty!) {
    create_quiz(difficulty: $difficulty) {
      quiz {
        questions(order_by: { order: asc }) {
          id
        }
      }
    }
  }
`
