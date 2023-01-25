import React, { FC } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Control, useForm } from 'react-hook-form'
import { useLazyQuery } from '@apollo/client'
import { Card, CardContent, Divider, Paper, Typography } from '@mui/material'
import { FormBuilder } from '../../organisms/FormBuilder'
import { passwordResetStyles } from './styles'
import { getItemFromSession, PASSWORD_RESET_FORM } from '../../../utils'
import { RESET_PASSWORD } from '../../../graphql/queries'
import { GenericErrorModal } from '../../molecules/GenericErrorModal'
import { SuccessModal } from '../../molecules/SuccessModal'
import { useBankContext } from '../../../context'
import { logoutCustomer } from '../../../context/actions'
import { ViewLoader } from '../../atoms/ViewLoader'

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
  const { dispatch } = useBankContext()
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
    dispatch(logoutCustomer())
    navigate('/')
  }
  const registerUser = (formData: PasswordResetFormInputs) => {
    resetLoginPassword({
      variables: { input: formData },
      fetchPolicy: 'no-cache',
    })
  }

  if (!AccessToken || !customerDetails?.customerId) {
    return <Navigate to="/" />
  }

  if (loading) {
    return <ViewLoader label="Password reset in progress, please wait!" />
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
