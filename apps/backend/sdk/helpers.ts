type UnknownInput = {}

export type HasuraRequest<
  TInputType extends UnknownInput = UnknownInput,
  TActionName extends string = string
> = {
  input: TInputType
  action: {
    name: TActionName
  }
}

export type HasuraRequestWithSessionVars<
  TInputType extends UnknownInput = UnknownInput,
  TActionName extends string = string
> = {
  session_variables: {
    'x-hasura-role': string
    'x-hasura-user-id': string
  }
} & HasuraRequest<TInputType, TActionName>

export interface HasuraEventPayload<TData extends UnknownInput = UnknownInput> {
  event: {
    session_variables: {
      'x-hasura-role': string
      'x-hasura-user-id': string
    }
    op: 'INSERT' | 'UPDATE' | 'DELETE' | 'MANUAL'
    data: {
      old: TData | null
      new: TData | null
    }
  }
  created_at: string
  id: string
  delivery_info: {
    max_retries: number
    current_retry: number
  }
  trigger: {
    name: string
  }
  table: {
    schema: string
    name: string
  }
}
