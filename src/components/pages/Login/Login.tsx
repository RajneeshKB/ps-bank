import { Card, CardContent, Divider, Paper, Typography } from '@mui/material'
import React, { FC } from 'react'
import { Control, useForm } from 'react-hook-form'
import { LOGIN_FORM } from '../../../utils'
import { FormBuilder } from '../../organisms/FormBuilder'
import { loginStyles } from './styles'

type LoginFormInputs = {
  customerId: string
  password: string
}
type FormProps = {
  control: Control<LoginFormInputs>
  handleSubmit: any
}

const initialStateValue = {
  customerId: '',
  password: '',
}

const CustomerLogin: FC = () => {
  const { control, handleSubmit }: FormProps = useForm<LoginFormInputs>({
    defaultValues: initialStateValue,
  })

  const registerUser = (formData: LoginFormInputs) => {
    // eslint-disable-next-line no-console
    console.log('loggin user with data', formData)
  }

  return (
    <Paper sx={loginStyles.formWrapper}>
      <Card sx={loginStyles.cardWrapper}>
        <CardContent>
          <Typography variant="h2" color="primary.dark">
            Login to world of digital banking
          </Typography>
          <Divider variant="fullWidth" sx={loginStyles.divider} />
          <FormBuilder
            formControls={LOGIN_FORM}
            controlHook={control}
            submitHandler={handleSubmit(registerUser)}
            submitButtonLabel="login"
          />
        </CardContent>
      </Card>
    </Paper>
  )
}

export default CustomerLogin
