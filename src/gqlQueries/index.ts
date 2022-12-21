import { gql } from 'graphql-request'

export const registerCustomerQuery = gql`
  mutation createNewCustomer($input: CustomerRegistrationData) {
    createCustomer(customerData: $input) {
      customerId
      customerName
    }
  }
`
