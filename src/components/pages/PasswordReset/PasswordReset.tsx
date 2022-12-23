import React, { FC } from 'react'
import { Control, useForm } from 'react-hook-form'
import { Card, CardContent, Divider, Paper, Typography } from '@mui/material'
import { FormBuilder } from '../../organisms/FormBuilder'
import { passwordResetStyles } from './styles'
import { PASSWORD_RESET_FORM } from '../../../utils'

type PasswordResetFormInputs = {
  customerId: string
  oldPassword: string
  password: string
}
type FormProps = {
  control: Control<PasswordResetFormInputs>
  handleSubmit: any
}

const initialStateValue = {
  customerId: '',
  oldPassword: '',
  password: '',
}

const PasswordReset: FC = () => {
  const { control, handleSubmit }: FormProps = useForm<PasswordResetFormInputs>(
    {
      defaultValues: initialStateValue,
    }
  )

  const registerUser = (formData: PasswordResetFormInputs) => {
    // eslint-disable-next-line no-console
    console.log('password reset initiated', formData)
  }

  return (
    <Paper sx={passwordResetStyles.formWrapper}>
      <Card sx={passwordResetStyles.cardWrapper}>
        <CardContent>
          <Typography variant="h2" color="primary.dark">
            Reset your password
          </Typography>
          <Divider variant="fullWidth" sx={passwordResetStyles.divider} />
          <FormBuilder
            formControls={PASSWORD_RESET_FORM}
            controlHook={control}
            submitHandler={handleSubmit(registerUser)}
            submitButtonLabel="reset password"
          />
        </CardContent>
      </Card>
    </Paper>
  )
}

export default PasswordReset
