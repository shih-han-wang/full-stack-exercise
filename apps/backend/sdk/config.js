module.exports = {
  schema: {
    'http://localhost:8080/v1/graphql': {
      headers: { 'X-Hasura-Admin-Secret': 'secret' }
    }
  },

  documents: ['**/*.server.gql.ts'],

  config: {
    skipTypename: false,
    maybeValue: 'T | null | undefined',
    strictScalars: true,
    scalars: {
      numeric: 'number',
      bigint: 'number',
      DateTime: 'string',
      timestamp: 'string',
      timestamptz: 'string',
      uuid: 'string',
      jsonb:
        'Record<string | number, unknown> | Array<string | number | Record<string | number, unknown>>'
    }
  },

  generates: {
    './sdk/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
        'typescript-msw',
        {
          add: {
            content:
              "import type { DocumentNode } from 'graphql' // organize-imports-ignore"
          }
        }
      ],
      overwrite: true
    }
  }
}
