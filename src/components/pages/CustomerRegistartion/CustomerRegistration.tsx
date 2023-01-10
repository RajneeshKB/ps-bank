import React, { FC, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Card, CardContent, Divider, Paper, Typography } from '@mui/material'
import { UserRegistrationDetailsForm } from '../../organisms/UserRegistrationDetailed'
import { useBankContext } from '../../../context'
import { logoutCustomer } from '../../../context/actions'
import { RegistrationSuccess } from '../../molecules/RegistrationSuccess'
import { GenericErrorModal } from '../../molecules/GenericErrorModal'
import { registrationDetailsStyles } from './styles'

const CustomerRegistration: FC = () => {
  const [regResponse, updateRegResponse] = useState({ data: {}, error: {} })
  const [showModal, toggleShowModal] = useState(false)
  const navigate = useNavigate()
  const {
    dispatch,
    state: { registrationData },
  } = useBankContext()

  const toggleModalView = () => toggleShowModal(!showModal)
  const closeModalAndNavigate = () => {
    toggleModalView()
    dispatch(logoutCustomer())
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
          <RegistrationSuccess
            customerData={regResponse.data}
            showModal={showModal}
            onCloseClick={closeModalAndNavigate}
          />
        ) : (
          <GenericErrorModal
            showModal={showModal}
            onCloseClick={closeModalAndNavigate}
          />
        ))}
    </Paper>
  )
}

export default CustomerRegistration
