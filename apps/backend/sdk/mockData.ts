import { Questions, Questions_Answer_Type_Enum } from './generated'

export const mockQuestions: Array<
  Omit<Questions, 'quizzes' | 'quizzes_aggregate'>
> = [
  {
    id: 'question1',
    answer_value: 'Almond',
    answer_type: Questions_Answer_Type_Enum.Text,
    input_label: 'What nut is used to make marzipan?',
    input_options: ['Almond', 'Cashew', 'Hazelnut', 'Pecan'],
    difficulty: 0.3
  },
  {
    id: 'question2',
    answer_value: 'Canberra',
    answer_type: Questions_Answer_Type_Enum.Text,
    input_label: 'What is the capital of Australia?',
    difficulty: 0.3
  },
  {
    id: 'question3',
    answer_value: '42',
    answer_type: Questions_Answer_Type_Enum.Number,
    input_label: 'What is 6 * 7?',
    difficulty: 0.3
  },
  {
    id: 'question4',
    answer_value: 'Gouda',
    answer_type: Questions_Answer_Type_Enum.Text,
    input_label: 'Which cheese comes from the Netherlands?',
    input_options: ['Cheddar', 'Emmental', 'Gouda', 'Mozzarella'],
    difficulty: 0.3
  },
  {
    id: 'question5',
    answer_value: '125',
    answer_type: Questions_Answer_Type_Enum.Number,
    input_label: 'What is 500 / 4?',
    difficulty: 0.3
  },
  {
    id: 'question6',
    answer_value: 'Oxygen',
    answer_type: Questions_Answer_Type_Enum.Text,
    input_label: "What element does 'O' represent on the periodic table?",
    difficulty: 1
  },
  {
    id: 'question7',
    answer_value: '50',
    answer_type: Questions_Answer_Type_Enum.Number,
    input_label: 'In meters, how long is an Olympic swimming pool?',
    difficulty: 1
  },
  {
    id: 'question8',
    answer_value: 'Sheffield',
    answer_type: Questions_Answer_Type_Enum.Text,
    input_label:
      'Which English town has football teams called United and Wednesday?',
    difficulty: 1
  },
  {
    id: 'question9',
    answer_value: 'Everest',
    answer_type: Questions_Answer_Type_Enum.Text,
    input_label: 'What is the highest mountain in the world?',
    input_options: ['Everest', 'K2', 'Mount Fuji', 'Mount Kilimanjaro'],
    difficulty: 1
  },
  {
    id: 'question10',
    answer_value: 'Madrid',
    answer_type: Questions_Answer_Type_Enum.Text,
    input_label: 'What is the capital of Spain?',
    difficulty: 1
  }
]
