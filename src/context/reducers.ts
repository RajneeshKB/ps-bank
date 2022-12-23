import { Dispatch } from 'react'
import { SET_LOGIN_DATA, SET_REGISTRATION_DETAILS } from './actions'

export type RegistrationDetailType = {
  customerName: string
  customerEmail: string
  customerMob: string
}
export type LoginDataType = {
  customerId: string
  customerName: string
  AccessToken: string
  isNewUser: boolean
}
export type CombinedContextStateType = {
  registrationData: RegistrationDetailType
  loginData: LoginDataType
}
export type BankContextType = {
  state: CombinedContextStateType
  dispatch: Dispatch<{ type: string; payload: any }>
}

export const initialState = {
  registrationData: { customerName: '', customerEmail: '', customerMob: '' },
  loginData: {
    customerId: '',
    customerName: '',
    AccessToken: '',
    isNewUser: false,
  },
}

export const reducer = (
  state: CombinedContextStateType,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_REGISTRATION_DETAILS:
      return { ...state, registrationData: { ...action.payload } }
    case SET_LOGIN_DATA:
      if (action.payload?.loginCustomer) {
        sessionStorage.setItem(
          'customerData',
          JSON.stringify(action.payload.loginCustomer)
        )
        sessionStorage.setItem(
          'AccessToken',
          action.payload.loginCustomer.AccessToken
        )
        return {
          ...state,
          loginData: { ...action.payload.loginCustomer },
        }
      }
      return state
    default:
      return state
  }
}
