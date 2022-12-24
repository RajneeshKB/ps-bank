import { useLazyQuery } from '@apollo/client'
import {
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import React, { FC } from 'react'
import { Control, useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { LOGIN_CUSTOMER } from '../../../graphql/queries'
import { getItemFromSession, LOGIN_FORM } from '../../../utils'
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
  const [loginCustomer, { loading, error, data }] = useLazyQuery(LOGIN_CUSTOMER)
  const { AccessToken } = sessionStorage
  const customerDetails = getItemFromSession('customerData')

  const registerUser = (formData: LoginFormInputs) => {
    loginCustomer({
      variables: { input: formData },
      fetchPolicy: 'no-cache',
    })
  }

  if (AccessToken && customerDetails?.customerId) {
    return (
      <Typography variant="h2">{`Welcome customer ${customerDetails.customerId} ${customerDetails.customerName}`}</Typography>
    )
  }

  if (loading) {
    return (
      <Stack>
        <CircularProgress />
        <Typography variant="caption">
          Customerlogin in progress, please wait!
        </Typography>
      </Stack>
    )
  }

  if (data?.loginCustomer) {
    const { loginCustomer: custDetails } = data
    sessionStorage.setItem('customerData', JSON.stringify(custDetails))
    sessionStorage.setItem('AccessToken', custDetails.AccessToken)

    return custDetails?.isNewUser ? (
      <Navigate to="/ps-bank/reset" />
    ) : (
      <Typography variant="h2">{`Welcome customer ${custDetails?.customerId} ${custDetails?.customerName}`}</Typography>
    )
  }

  return (
    <Paper sx={loginStyles.formWrapper}>
      <Card sx={loginStyles.cardWrapper}>
        <CardContent>
          {error?.message && (
            <Typography variant="caption" color="error" mb="2rem">
              Customer Id / Password is incorrect
            </Typography>
          )}
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
