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
      questions(
        order_by: { order: asc }
        where: { response: { _is_null: true } }
      ) {
        id
        response
      }
    }
  }
`

export const GET_QUIZ_QUESTIONS_BY_QUESTION_ID = gql`
  query GetQuizQuestionsByQuestionId($id: String!) {
    quizzes_questions_by_pk(id: $id) {
      order
      response
      quiz_id
      quiz {
        questions(order_by: { order: asc }) {
          id
          order
          response_correctness
        }
      }
      question {
        answer_type
        id
        input_label
        input_options
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

export const SUBMIT_QUESTION_RESPONSE = gql`
  mutation SubmitQuestionResponse(
    $question_response: Submit_Question_Response_Input!
  ) {
    submit_question_response(question_response: $question_response) {
      quiz_question {
        id
      }
    }
  }
`
export const COMPLETE_QUIZ = gql`
  mutation CompleteQuiz($quiz_id: String!) {
    complete_quiz(quiz_id: $quiz_id) {
      quiz {
        questions {
          response_correctness
        }
      }
    }
  }
`
