import { IconVarient } from './types'

export const ICON_COLORS = {
  [IconVarient.Correct]: {
    bg: 'green.500',
    border: 'green.500'
  },
  [IconVarient.Incorrect]: {
    bg: 'red.500',
    border: 'red.500'
  },
  [IconVarient.Default]: {
    bg: undefined,
    border: 'gray.400'
  },
  [IconVarient.Current]: {
    border: 'gray.900'
  }
}
