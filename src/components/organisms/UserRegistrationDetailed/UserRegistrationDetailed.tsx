import React, { FC } from 'react'
import { Control, useForm } from 'react-hook-form'
import {
  IRegistrationInputs,
  RegistrationBasicInputs,
  REGISTRATION_DETAILS_DEFAULT_VALUES,
  USER_REGISTRATION_CONTROL_VALUES,
  USER_REGISTRATION_DETAILS,
} from '../../../utils'
import { FormBuilder } from '../FormBuilder'

type FormProps = {
  control: Control<IRegistrationInputs>
  handleSubmit: any
}

interface IUserRegistrationDetailedProps {
  basicRegistrationData: RegistrationBasicInputs
  onFormSubmit: () => void
}
const UserRegistrationDetailed: FC<IUserRegistrationDetailedProps> = ({
  basicRegistrationData,
  onFormSubmit,
}) => {
  const { control, handleSubmit }: FormProps = useForm<IRegistrationInputs>({
    defaultValues: REGISTRATION_DETAILS_DEFAULT_VALUES,
  })
  const registerUser = (formData: IRegistrationInputs) => {
    // eslint-disable-next-line no-console
    console.log('registration successful wth user data', {
      ...basicRegistrationData,
      ...formData,
    })
    onFormSubmit()
  }

  return (
    <FormBuilder
      formControls={USER_REGISTRATION_DETAILS}
      controlHook={control}
      controlValues={USER_REGISTRATION_CONTROL_VALUES}
      submitHandler={handleSubmit(registerUser)}
    />
  )
}

export default UserRegistrationDetailed
