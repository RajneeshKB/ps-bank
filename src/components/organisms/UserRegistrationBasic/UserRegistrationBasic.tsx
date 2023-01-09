import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Control, useForm } from 'react-hook-form'
import { Box, Card, CardContent, Typography } from '@mui/material'
import {
  RegistrationBasicInputs,
  USER_REGISTRATION_BASIC,
  REGISTRATION_BASIC_DEFAULT_VALUES,
} from '../../../utils'
import { FormBuilder } from '../FormBuilder'
import { userRegistrationStyles } from './styles'
import { setRegistrationDetails } from '../../../context/actions'
import { useBankContext } from '../../../context'

type FormProps = {
  control: Control<RegistrationBasicInputs>
  handleSubmit: any
}

const UserRegistrationBasic: FC = () => {
  const { control, handleSubmit }: FormProps = useForm<RegistrationBasicInputs>(
    {
      defaultValues: REGISTRATION_BASIC_DEFAULT_VALUES,
    }
  )
  const navigate = useNavigate()
  const { dispatch } = useBankContext()

  const startRegistration = (formData: RegistrationBasicInputs) => {
    dispatch(setRegistrationDetails(formData))
    navigate('/registration')
  }

  return (
    <Box display="flex" justifyContent="flex-end">
      <Card sx={userRegistrationStyles.formWrapper}>
        <CardContent>
          <Typography variant="body1" mb="0.5rem">
            Let&apos;s get started
          </Typography>
          <FormBuilder
            formControls={USER_REGISTRATION_BASIC}
            controlHook={control}
            submitHandler={handleSubmit(startRegistration)}
            submitButtonLabel="Register"
          />
          <Typography variant="body2" mt="1rem">
            By choosing to continue, you agree to accept all applicable Terms &
            Conditions and Privacy Policy
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default UserRegistrationBasic
