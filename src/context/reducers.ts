import { Dispatch } from 'react'
import { SET_REGISTRATION_DETAILS } from './actions'

export type RegistrationDetailType = {
  customerName: string
  customerEmail: string
  customerMob: string
}
export type CombinedContextStateType = {
  registrationData: RegistrationDetailType
}
export type BankContextType = {
  state: CombinedContextStateType
  dispatch: Dispatch<{ type: string; payload: any }>
}

export const initialState = {
  registrationData: { customerName: '', customerEmail: '', customerMob: '' },
}

export const reducer = (
  state: CombinedContextStateType,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_REGISTRATION_DETAILS:
      return { ...state, registrationData: { ...action.payload } }
    default:
      return state
  }
}
