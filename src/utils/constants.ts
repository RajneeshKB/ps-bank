export const ID_OCCUPATION = 'occupation'
export const ID_INCOME = 'income'
export const ID_COUNTRY = 'country'
export type ControlValues = {
  id: string
  label: string
  value: string
}
export const USER_REGISTRATION_CONTROL_VALUES = {
  [ID_OCCUPATION]: [
    {
      id: '1',
      label: 'Student',
      value: 'student',
    },
    { id: '2', label: 'Housewife', value: 'housewife' },
    { id: '3', label: 'Salaried', value: 'salaried' },
    { id: '4', label: 'Business', value: 'business' },
    { id: '5', label: 'Retired/Senior citizen', value: 'retired' },
  ],
  [ID_INCOME]: [
    { id: '1', label: '0-5,00,000', value: 'upto_5' },
    { id: '2', label: '5,00,000-10,00,000', value: '5_to_10' },
    { id: '3', label: '10,00,000-20,00,000', value: '10_to_20' },
    { id: '4', label: '> 20,00,000', value: 'more_than_20' },
  ],
  [ID_COUNTRY]: [{ id: '1', label: 'India', value: 'india' }],
}
export const REGISTRATION_DETAILS_DEFAULT_VALUES = {
  occupation: '',
  income: '',
  panNumber: '',
  aadharNumber: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  country: 'india',
}
export const REGISTRATION_BASIC_DEFAULT_VALUES = {
  customerEmail: '',
  customerMob: '',
  customerName: '',
}
