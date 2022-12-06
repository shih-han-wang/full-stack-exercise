import { Questions_Answer_Type_Enum } from 'backend/sdk/generated'
import { Template } from './types'

export const getTemplate = (
  inputOptions: string[] | null,
  answerType: Questions_Answer_Type_Enum
) => {
  if (!!inputOptions) return Template.RadioGrope
  return answerType === 'text' ? Template.Text : Template.Number
}
