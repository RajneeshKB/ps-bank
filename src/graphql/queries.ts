import { gql } from '@apollo/client'

export const REGISTER_CUSTOMER = gql`
  mutation CreateCustomer($input: CustomerRegistrationData) {
    createCustomer(customerData: $input) {
      customerId
      customerName
    }
  }
`
