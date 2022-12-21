import React, { FC, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Card, CardContent, Divider, Paper, Typography } from '@mui/material'
import { RegistrationSuccessModal } from '../../molecules/RegistrationSuccess'
import { UserRegistrationDetailsForm } from '../../organisms/UserRegistrationDetailed'
import { useBankContext } from '../../../context'
import { registrationDetailsStyles } from './styles'
import { FailureModal } from '../../molecules/FailureModal'

const CustomerRegistration: FC = () => {
  const [regResponse, updateRegResponse] = useState({ data: {}, error: {} })
  const [showModal, toggleShowModal] = useState(false)
  const navigate = useNavigate()
  const {
    state: { registrationData },
  } = useBankContext()

  const toggleModalView = () => toggleShowModal(!showModal)
  const closeModalAndNavigate = () => {
    toggleModalView()
    navigate('/')
  }
  const registrationCompletionHandler = ({ data, error }: any) => {
    updateRegResponse({ data, error })
    toggleModalView()
  }
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
      {showModal &&
        (regResponse?.data ? (
          <RegistrationSuccessModal
            customerData={regResponse.data}
            showModal={showModal}
            onCloseClick={closeModalAndNavigate}
          />
        ) : (
          <FailureModal
            showModal={showModal}
            onCloseClick={closeModalAndNavigate}
          />
        ))}
    </Paper>
  )
}

export default CustomerRegistration
