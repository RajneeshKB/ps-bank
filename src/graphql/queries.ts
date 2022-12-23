import { gql } from '@apollo/client'

export const REGISTER_CUSTOMER = gql`
  mutation CreateCustomer($input: CustomerRegistrationData) {
    createCustomer(customerData: $input) {
      customerName
    }
  }
`

export const LOGIN_CUSTOMER = gql`
  query LoginCustomerToBank($input: CustomerLoginData) {
    loginCustomer(customerData: $input) {
      customerId
      customerName
      AccessToken
      isNewUser
    }
  }
`
