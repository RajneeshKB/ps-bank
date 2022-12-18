import { ID_COUNTRY, ID_INCOME, ID_OCCUPATION } from './constants'

export type FormMetaData = {
  id: string
  name: any
  label: string
  type: string
  subCategory: string
  placeholder: string
  required: boolean
  validation: {}
}
type AddressType = {
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  country: string
}
export interface IRegistrationInputs extends AddressType {
  occupation: string
  income: string
  panNumber: string
  aadharNumber: string
}

export type RegistrationBasicInputs = {
  customerEmail: string
  customerMob: string
  customerName: string
}
export const USER_REGISTRATION_BASIC: FormMetaData[] = [
  {
    id: 'customerName',
    name: 'customerName',
    label: 'Your Full Name',
    placeholder: 'Your Full Name',
    required: true,
    type: 'text',
    subCategory: '',
    validation: {
      required: { value: true, message: 'name is required' },
    },
  },
  {
    id: 'customerMob',
    name: 'customerMob',
    label: 'Mobile number',
    placeholder: 'Mobile number',
    required: true,
    type: 'text',
    subCategory: '',
    validation: {
      required: { value: true, message: 'mobile number is required' },
      pattern: {
        value: /^[7-9]{1}[0-9]{9}$/,
        message: 'invalid mobile number',
      },
    },
  },
  {
    id: 'customerEmail',
    name: 'customerEmail',
    label: 'Email',
    placeholder: 'Email',
    required: true,
    type: 'text',
    subCategory: '',
    validation: {
      required: { value: true, message: 'email is required' },
      pattern: {
        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
        message: 'invalid email',
      },
    },
  },
]

export const USER_REGISTRATION_DETAILS: FormMetaData[] = [
  {
    id: ID_OCCUPATION,
    name: ID_OCCUPATION,
    label: 'Occupation',
    placeholder: '',
    required: true,
    type: 'select',
    subCategory: '',
    validation: {
      required: { value: true, message: 'occupation is required' },
    },
  },
  {
    id: ID_INCOME,
    name: ID_INCOME,
    label: 'Income',
    placeholder: '',
    required: true,
    type: 'radioGroup',
    subCategory: '',
    validation: {
      required: { value: true, message: 'income is required' },
    },
  },
  {
    id: 'panNumber',
    name: 'panNumber',
    label: 'PAN number',
    placeholder: 'PAN number',
    required: true,
    type: 'text',
    subCategory: '',
    validation: {
      required: { value: true, message: 'pan number is required' },
    },
  },
  {
    id: 'aadharNumber',
    name: 'aadharNumber',
    label: 'Aadhar number',
    placeholder: 'Aadhar number',
    required: true,
    type: 'text',
    subCategory: '',
    validation: {
      required: { value: true, message: 'aadhar number is required' },
    },
  },
  {
    id: 'addressLine1',
    name: 'addressLine1',
    label: 'Address line 1',
    placeholder: 'Address line 1',
    required: true,
    type: 'text',
    subCategory: '',
    validation: {
      required: { value: true, message: 'address line 1 is required' },
    },
  },
  {
    id: 'addressLine2',
    name: 'addressLine2',
    label: 'Address line 2',
    placeholder: 'Address line 2',
    required: false,
    type: 'text',
    subCategory: '',
    validation: {},
  },
  {
    id: 'state',
    name: 'state',
    label: 'State',
    placeholder: 'State',
    required: true,
    type: 'text',
    subCategory: '',
    validation: {
      required: { value: true, message: 'state is required' },
    },
  },
  {
    id: 'city',
    name: 'city',
    label: 'City',
    placeholder: 'City',
    required: true,
    type: 'text',
    subCategory: '',
    validation: {
      required: { value: true, message: 'city is required' },
    },
  },
  {
    id: ID_COUNTRY,
    name: ID_COUNTRY,
    label: 'Country',
    placeholder: '',
    required: true,
    type: 'select',
    subCategory: '',
    validation: {
      required: { value: true, message: 'country is required' },
    },
  },
]

export const LOGIN_FORM: FormMetaData[] = [
  {
    id: 'customerId',
    name: 'customerId',
    label: 'Customer Id',
    placeholder: 'Customer Id',
    required: true,
    type: 'text',
    subCategory: '',
    validation: {
      required: { value: true, message: 'customer Id is required' },
    },
  },
  {
    id: 'password',
    name: 'password',
    label: 'Password',
    placeholder: 'Password',
    required: true,
    type: 'text',
    subCategory: 'password',
    validation: {
      required: { value: true, message: 'password is required' },
    },
  },
]
