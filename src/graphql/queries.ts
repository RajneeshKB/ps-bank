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

export const RESET_PASSWORD = gql`
  query ResetPassword($input: PasswordResetData) {
    resetPassword(customerData: $input) {
      message
    }
  }
`

export const GET_CUSTOMER_DETAILS = gql`
  query GetCustomerDetails($customerId: String) {
    getCustomerDetails(customerId: $customerId) {
      customerId
      customerEmail
      customerMob
      customerName
      dateOfBirth
      genderType
      fathersName
      mothersName
      occupation
      income
      panNumber
      aadharNumber
      addressLine1
      addressLine2
      city
      pincode
      state
      country
    }
  }
`

export const GET_ACCOUNTS = gql`
  query GetAccounts($customerId: String) {
    getAccounts(customerId: $customerId) {
      accountNumber
      accountType
      primaryHolderId
      isJointAccount
      jointHolderId
      jointRelationship
      nomineeId
    }
  }
`

export const OPEN_NEW_SAVING_ACCOUNT = gql`
  mutation OpenNewAccount($input: AccountOpeningData) {
    openNewAccount(accountData: $input) {
      accountNumber
    }
  }
`
