import { gql } from '@apollo/client'

export const GET_USER = gql`
  query GetUser($id: String!) {
    users_by_pk(id: $id) {
      first_name
    }
  }
`
