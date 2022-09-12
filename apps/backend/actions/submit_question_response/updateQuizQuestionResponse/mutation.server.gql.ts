import { gql } from 'graphql-tag'

export const UPDATE_QUIZ_QUESTION_RESPONSE_MUTATION = gql`
  mutation UpdateQuizQuestionResponse(
    $quizQuestionId: String!
    $userId: String!
    $input: quizzes_questions_set_input!
  ) {
    update_quizzes_questions(
      where: {
        id: { _eq: $quizQuestionId }
        quiz: { user_id: { _eq: $userId } }
        response: { _is_null: true }
      }
      _set: $input
    ) {
      returning {
        id
      }
    }
  }
`
