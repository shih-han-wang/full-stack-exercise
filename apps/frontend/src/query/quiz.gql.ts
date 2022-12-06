import { gql } from '@apollo/client'

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
