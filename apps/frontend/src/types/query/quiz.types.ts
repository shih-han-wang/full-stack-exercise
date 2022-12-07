import {
  Questions_Answer_Type_Enum,
  Quizzes_Questions_Response_Correctness_Enum
} from 'backend/sdk/generated'

export interface QuizQuestion {
  id: string
  order?: number
  response_correctness: Quizzes_Questions_Response_Correctness_Enum | null
  __typename: 'quizzes_questions'
}

export interface Question {
  answer_type: Questions_Answer_Type_Enum
  id: string
  input_label: string
  input_options: string[] | null
  __typename: 'questions'
}
