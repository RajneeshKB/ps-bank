import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { useBankGraphQlClient } from './useBankGraphQlClient'

type UseCustomMutationProps = {
  query: any
  queryKey?: any
  // variables?: any
  // overrideHeaders?: any
}
export const useCustomMutation = ({
  query,
  queryKey = ['psbank'],
}: // variables = {},
// overrideHeaders = {},
UseCustomMutationProps): UseMutationResult => {
  const graphQlClient = useBankGraphQlClient()

  return useMutation(queryKey, async () => {
    try {
      const { data } = await graphQlClient.request(query)
      // eslint-disable-next-line no-console
      console.log('data receivede', data)
      return JSON.stringify(data)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('error receivede', e)
      return { error: { message: 'error while mutation' } }
    }
  })
}
