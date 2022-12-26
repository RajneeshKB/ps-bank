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
import { LOGIN_FORM } from '../../../utils'
import { FormBuilder } from '../../organisms/FormBuilder'
import { useBankContext } from '../../../context'
import { loginStyles } from './styles'
import { setLoginData } from '../../../context/actions'

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
  const [loginCustomer, { loading, error }] = useLazyQuery(LOGIN_CUSTOMER)
  const {
    dispatch,
    state: {
      loginData: { AccessToken, customerId, isNewUser },
    },
  } = useBankContext()

  const registerUser = (formData: LoginFormInputs) => {
    loginCustomer({
      variables: { input: formData },
      fetchPolicy: 'no-cache',
      onCompleted: (response) => {
        dispatch(setLoginData({ ...response.loginCustomer }))
      },
    })
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
  if (AccessToken && customerId) {
    const navigatePath = isNewUser ? '/ps-bank/reset' : '/ps-bank/accounts'
    return <Navigate to={navigatePath} />
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
