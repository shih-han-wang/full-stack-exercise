import { Questions } from './types'

export const questions: Questions = {
  email: {
    inputType: 'email',
    label: 'What is your email?'
  },

  cheese: {
    inputType: 'radio',
    label: 'What is your favourite cheese?',
    options: ['Cheddar', 'Emmental', 'Gouda', 'Mozzarella', 'Other']
  },

  friends: {
    inputType: 'number',
    label: 'How many friends do you have?'
  },

  color: {
    inputType: 'color',
    label: 'What is your favourite color?'
  },

  pizza: {
    inputType: 'slider',
    label: 'How much do you love pineapple on pizza?',
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }
}
