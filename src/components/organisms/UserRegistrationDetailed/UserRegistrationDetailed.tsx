import { CircularProgress, Stack, Typography } from '@mui/material'
import React, { FC } from 'react'
import { Control, useForm } from 'react-hook-form'
import { registerCustomerQuery } from '../../../gqlQueries'
import { useCustomMutation } from '../../../hooks/useCustomMutation'
import {
  CUSTOMER_REGISTRATION,
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
  const customerMutation = useCustomMutation({
    query: registerCustomerQuery,
    queryKey: [CUSTOMER_REGISTRATION],
  })

  const registerUser = (formData: IRegistrationInputs) => {
    const customerRegistrationData = {
      customerData: {
        ...basicRegistrationData,
        ...formData,
      },
    }

    // const customerRegistrationData = {
    //   input: {
    //     ...basicRegistrationData,
    //     ...formData,
    //   },
    // }

    customerMutation.mutate(customerRegistrationData, {
      onSettled: (mutationResponse) => {
        // eslint-disable-next-line no-console
        console.log('submitted', mutationResponse)
        formSubmitCallback(mutationResponse)
      },
    })
  }

  if (customerMutation.isLoading) {
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
