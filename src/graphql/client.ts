import { ApolloClient, InMemoryCache } from '@apollo/client'

const API_ENDPOINT = 'http://localhost:4000/graphql'

export const getBankGraphQlClient = () => {
  const graphQLClient = new ApolloClient({
    uri: API_ENDPOINT,
    cache: new InMemoryCache(),
  })

  return graphQLClient
}
