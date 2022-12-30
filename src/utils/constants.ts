export const ID_OCCUPATION = 'occupation'
export const ID_INCOME = 'income'
export const ID_COUNTRY = 'country'
export const SAVING_ACCOUNT_TYPE = 'savingAccountType'
export const GENDER_TYPE = 'genderType'
export const RELATIONSHIP = 'relationship'

export type ControlValues = {
  id: string
  label: string
  value: string
}
const GENDER_TYPE_VALUE: ControlValues[] = [
  { id: '1', label: 'Male', value: 'male' },
  { id: '2', label: 'Female', value: 'female' },
]
const RELATIONSHIP_VALUES: ControlValues[] = [
  { id: '1', label: 'Father', value: 'father' },
  { id: '2', label: 'Mother', value: 'mother' },
  { id: '3', label: 'Spouse', value: 'spouse' },
  { id: '4', label: 'Brother', value: 'brother' },
  { id: '5', label: 'Sister', value: 'sister' },
  { id: '7', label: 'Son', value: 'son' },
  { id: '8', label: 'Daughter', value: 'daughter' },
  { id: '6', label: 'Gaurdian', value: 'gaurdian' },
]

export const USER_REGISTRATION_CONTROL_VALUES: {
  [key: string]: ControlValues[]
} = {
  [GENDER_TYPE]: GENDER_TYPE_VALUE,
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
export const SAVING_ACCOUNT_OPENING_CONTROL_VALUES: {
  [key: string]: ControlValues[]
} = {
  [SAVING_ACCOUNT_TYPE]: [
    { id: '1', label: 'Regular', value: 'regular' },
    { id: '2', label: 'Premium', value: 'premium' },
  ],
  [GENDER_TYPE]: GENDER_TYPE_VALUE,
  ...USER_REGISTRATION_CONTROL_VALUES,
  [`joint_${RELATIONSHIP}`]: RELATIONSHIP_VALUES,
  [`joint_${GENDER_TYPE}`]: GENDER_TYPE_VALUE,
  [`joint_${ID_OCCUPATION}`]: USER_REGISTRATION_CONTROL_VALUES[ID_OCCUPATION],
  [`joint_${ID_INCOME}`]: USER_REGISTRATION_CONTROL_VALUES[ID_INCOME],
  [`joint_${ID_COUNTRY}`]: USER_REGISTRATION_CONTROL_VALUES[ID_COUNTRY],
  [`nominee_${RELATIONSHIP}`]: RELATIONSHIP_VALUES,
  [`nominee_${GENDER_TYPE}`]: GENDER_TYPE_VALUE,
}

export const REGISTRATION_DETAILS_DEFAULT_VALUES = {
  customerName: '',
  dateOfBirth: '',
  [GENDER_TYPE]: '',
  fathersName: '',
  mothersName: '',
  occupation: '',
  income: '',
  panNumber: '',
  aadharNumber: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  pincode: '',
  state: '',
  country: 'india',
}
export const REGISTRATION_BASIC_DEFAULT_VALUES = {
  customerEmail: '',
  customerMob: '',
  customerName: '',
}

export const NEW_SAVING_ACCOUNT_OPEN_STEP = [
  'Primary Applicant Details',
  'Joint Applicant Details',
  'Nominee Details',
]

export const SAVING_ACCOUNT_OPENING_AND_STEPPER_MAP = [
  'PRIMARY_APPLICANT',
  'JOINT_APPLICANT',
  'NOMINEE',
]

export const SAVING_ACCOUNT_OPENING_FORM_DEFAULT_VALUES = {
  [SAVING_ACCOUNT_TYPE]: '',
  customerName: '',
  dateOfBirth: '',
  [GENDER_TYPE]: '',
  customerEmail: '',
  customerMob: '',
  fathersName: '',
  mothersName: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  pincode: '',
  state: '',
  [ID_COUNTRY]: 'india',
  [ID_OCCUPATION]: '',
  [ID_INCOME]: '',
  panNumber: '',
  aadharNumber: '',
  isJointAccount: false,
  joint_customerName: '',
  joint_dateOfBirth: '',
  [`joint_${GENDER_TYPE}`]: '',
  joint_fathersName: '',
  joint_mothersName: '',
  joint_customerEmail: '',
  joint_customerMob: '',
  joint_addressLine1: '',
  joint_addressLine2: '',
  joint_city: '',
  joint_pincode: '',
  joint_state: '',
  [`joint_${ID_COUNTRY}`]: 'india',
  [`joint_${ID_OCCUPATION}`]: '',
  [`joint_${ID_INCOME}`]: '',
  joint_panNumber: '',
  joint_aadharNumber: '',
  [`joint_${RELATIONSHIP}`]: '',
  [`nominee_${RELATIONSHIP}`]: '',
  nominee_customerName: '',
  nominee_dateOfBirth: '',
  [`nominee_${GENDER_TYPE}`]: '',
  nominee_fathersName: '',
  nominee_mothersName: '',
}
