import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useBankGraphQlClient } from './useBankGraphQlClient'

type UseCustomQueryProps = {
  queryKey: string[]
  query: any
  queryArgs?: string[]
  variables?: any
  overrideHeaders?: any
}
export const useCustomQuery = ({
  queryKey,
  query,
  queryArgs = [],
  variables = {},
  overrideHeaders = {},
}: UseCustomQueryProps): UseQueryResult => {
  const { request } = useBankGraphQlClient()

  return useQuery([...queryKey, ...queryArgs], async () => {
    const { data } = await request(query, variables, overrideHeaders)
    return data
  })
}
