import React, { FC } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Control, useForm } from 'react-hook-form'
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
import { FormBuilder } from '../../organisms/FormBuilder'
import { passwordResetStyles } from './styles'
import { getItemFromSession, PASSWORD_RESET_FORM } from '../../../utils'
import { RESET_PASSWORD } from '../../../graphql/queries'
import { GenericErrorModal } from '../../molecules/GenericErrorModal'
import { SuccessModal } from '../../atoms/SuccessModal'

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
  newPassword: '',
}

const PasswordReset: FC = () => {
  const { AccessToken } = sessionStorage
  const customerDetails = getItemFromSession('customerData')
  const navigate = useNavigate()

  const { control, handleSubmit }: FormProps = useForm<PasswordResetFormInputs>(
    {
      defaultValues: {
        ...initialStateValue,
        customerId: customerDetails?.customerId || '',
      },
    }
  )
  const [resetLoginPassword, { loading, error, data }] =
    useLazyQuery(RESET_PASSWORD)

  const closeModalAndNavigate = () => {
    navigate('/')
  }
  const registerUser = (formData: PasswordResetFormInputs) => {
    // eslint-disable-next-line no-console
    console.log('password reset initiated', formData)
    resetLoginPassword({
      variables: { input: formData },
      fetchPolicy: 'no-cache',
    })
  }

  if (!AccessToken || !customerDetails?.customerId) {
    return <Navigate to="/" />
  }

  if (loading) {
    return (
      <Stack>
        <CircularProgress />
        <Typography variant="caption">
          Password reset in progress, please wait!
        </Typography>
      </Stack>
    )
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
      {error && (
        <GenericErrorModal showModal onCloseClick={closeModalAndNavigate} />
      )}
      {data && (
        <SuccessModal
          showModal
          onCloseClick={closeModalAndNavigate}
          title={
            <Typography variant="h2">Password reset completed.</Typography>
          }
          description={
            <Typography variant="body1">
              Password updated successfully. Login again with new password to
              continue with your digital account.
            </Typography>
          }
        />
      )}
    </Paper>
  )
}

export default PasswordReset
