import { useMutation } from '@apollo/client'
import { CircularProgress, Stack, Typography } from '@mui/material'
import React, { FC } from 'react'
import { Control, useForm } from 'react-hook-form'
import { REGISTER_CUSTOMER } from '../../../graphql/queries'
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
  formSubmitCallback: (_arg: any) => void
}
const UserRegistrationDetailed: FC<IUserRegistrationDetailedProps> = ({
  basicRegistrationData,
  formSubmitCallback,
}) => {
  const { control, handleSubmit }: FormProps = useForm<IRegistrationInputs>({
    defaultValues: REGISTRATION_DETAILS_DEFAULT_VALUES,
  })
  const [registerCustomerMutation, { loading }] = useMutation(REGISTER_CUSTOMER)

  const registerUser = (formData: IRegistrationInputs) => {
    const customerRegistrationData = {
      input: {
        ...basicRegistrationData,
        ...formData,
      },
    }

    registerCustomerMutation({
      variables: customerRegistrationData,
      onCompleted: (mutationResponse) => {
        formSubmitCallback({ data: mutationResponse })
      },
      onError: (mutationResponse) => {
        formSubmitCallback({ error: mutationResponse })
      },
    })
  }

  if (loading) {
    return (
      <Stack>
        <CircularProgress />
        <Typography variant="caption">
          Registergin Customer, please wait!
        </Typography>
      </Stack>
    )
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
