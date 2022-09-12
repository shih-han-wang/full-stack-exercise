import { gql } from 'graphql-tag'

export const GET_QUESTION_CORRECT_ANSWER_QUERY = gql`
  query GetQuestionCorrectAnswer($quiz_question_id: String!) {
    quizzes_questions_by_pk(id: $quiz_question_id) {
      question {
        answer_value
      }
    }
  }
`
