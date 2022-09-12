import { gql } from 'graphql-tag'

export const UPDATE_QUIZ_QUESTION_RESPONSE_MUTATION = gql`
  mutation UpdateQuizQuestionResponse(
    $quiz_question_id: String!
    $user_id: String!
    $input: quizzes_questions_set_input!
  ) {
    update_quizzes_questions(
      where: {
        id: { _eq: $quiz_question_id }
        quiz: { user_id: { _eq: $user_id } }
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
