import React, { FC, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { Card, CardContent, Divider, Paper, Typography } from '@mui/material'
import { RegistrationSuccessModal } from '../../molecules/RegistrationSuccess'
import { UserRegistrationDetailsForm } from '../../organisms/UserRegistrationDetailed'
import { useBankContext } from '../../../context'
import { registrationDetailsStyles } from './styles'
import { CUSTOMER_REGISTRATION } from '../../../utils'

const CustomerRegistration: FC = () => {
  // const [regResponse, updateRegResponse] = useState()
  const [showModal, toggleShowModal] = useState(false)
  const queryClient = useQueryClient()
  const registrationResponse = queryClient.getQueryData([CUSTOMER_REGISTRATION])
  const navigate = useNavigate()
  const {
    state: { registrationData },
  } = useBankContext()

  const toggleModalView = () => toggleShowModal(!showModal)
  const closeModalAndNavigate = () => {
    toggleModalView()
    navigate('/')
  }
  const registrationCompletionHandler = () => {
    // eslint-disable-next-line no-console
    console.log('registration done', registrationResponse)
    toggleModalView()
  }
  // eslint-disable-next-line no-console
  console.log('registration done', registrationResponse)
  if (!registrationData?.customerName) return <Navigate to="/" />
  return (
    <Paper sx={registrationDetailsStyles.formWrapper}>
      <Card sx={registrationDetailsStyles.cardWrapper}>
        <CardContent>
          <Typography variant="h2" color="primary.dark">
            Just one more step to get started with your digital banking account
          </Typography>
          <Divider variant="fullWidth" sx={registrationDetailsStyles.divider} />
          <UserRegistrationDetailsForm
            basicRegistrationData={registrationData}
            formSubmitCallback={registrationCompletionHandler}
          />
        </CardContent>
      </Card>
      <RegistrationSuccessModal
        showModal={showModal}
        onCloseClick={closeModalAndNavigate}
      />
    </Paper>
  )
}

export default CustomerRegistration
