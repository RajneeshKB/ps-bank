import { GraphQLClient } from 'graphql-request'

const API_ENDPOINT = 'http://localhost:4000/graphql'

export const useBankGraphQlClient = () => {
  const graphQLClient = new GraphQLClient(API_ENDPOINT, {
    // mode: 'cors',
    // headers: {
    //   Authorization: `Bearer ${process.env.API_KEY}`,
    // },
  })

  return graphQLClient
}
