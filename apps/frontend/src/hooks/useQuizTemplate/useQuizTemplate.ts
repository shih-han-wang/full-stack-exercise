import { Questions_Answer_Type_Enum } from 'backend/sdk/generated'
import {
  Dispatch,
  FC,
  MouseEvent,
  SetStateAction,
  useEffect,
  useMemo,
  useState
} from 'react'
import { NumberInput, RadioGroup, TextInput } from '../../components'
import { getTemplate } from './helpers'
import { Template } from './types'

const QuizTemplates = {
  [Template.Number]: NumberInput,
  [Template.RadioGrope]: RadioGroup,
  [Template.Text]: TextInput
}

type Props = {
  answerType: Questions_Answer_Type_Enum
  disabled: boolean
  handleSubmit: (_response: string) => void
  inputOptions: string[] | null
  setAnswer: Dispatch<SetStateAction<string | null>>
  value: string
}

const useQuizTemplate = ({
  answerType,
  disabled,
  handleSubmit,
  inputOptions,
  setAnswer,
  value
}: Props) => {
  const [props, setProps] = useState({})
  const [showSubmitBtn, setShowSubmitBtn] = useState(false)
  const template = useMemo(
    () => getTemplate(inputOptions, answerType),
    [inputOptions, answerType]
  )
  const QuizTemplate: FC<any> = useMemo(
    () => QuizTemplates[template],
    [template]
  )

  useEffect(() => {
    const defaultProps = { value, disabled }
    switch (template) {
      case Template.RadioGrope:
        setShowSubmitBtn(false)
        setProps({
          ...defaultProps,
          options: inputOptions,
          onChange: handleSubmit
        })
        break
      case Template.Number:
        setShowSubmitBtn(true)
        setProps({ ...defaultProps, onChange: setAnswer })
        break
      case Template.Text:
        setShowSubmitBtn(true)
        setProps({
          ...defaultProps,
          onChange: (e: MouseEvent) => setAnswer((e.target as any).value)
        })
        break
      default:
        break
    }
  }, [
    answerType,
    disabled,
    handleSubmit,
    inputOptions,
    setAnswer,
    template,
    value
  ])

  return { QuizTemplate, props, showSubmitBtn }
}

export default useQuizTemplate
