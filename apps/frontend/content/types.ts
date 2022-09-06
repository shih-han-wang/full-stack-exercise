type BaseQuestion = {
  label: string
}

type DataEntryQuestion = BaseQuestion & {
  inputType: 'email' | 'number' | 'color'
}

type RadioQuestion = BaseQuestion & {
  inputType: 'radio'
  options: Array<string>
}

type SliderQuestion = BaseQuestion & {
  inputType: 'slider'
  options: Array<number>
}

export type Questions = {
  [questionId: string]: DataEntryQuestion | RadioQuestion | SliderQuestion
}
