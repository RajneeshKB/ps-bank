import type { RegistrationDetailType } from './reducers'

export const SET_REGISTRATION_DETAILS = 'bank/registration_basic'

export const setRegistrationDetails = (
  customerDetails: RegistrationDetailType
) => ({
  type: SET_REGISTRATION_DETAILS,
  payload: customerDetails,
})
