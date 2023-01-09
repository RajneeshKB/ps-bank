import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Paper,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material'
import { newSavingAccountStyles } from './styles'
import { SavingAccountOpenForm } from '../../organisms/SavingAccountOpen'
import { NEW_SAVING_ACCOUNT_OPEN_STEP } from '../../../utils'

const NewSavingAccount: FC = () => {
  const [activeStep, updateActiveStep] = useState(
    +sessionStorage.activeStep || 0
  )
  const [showToast, updateShowToast] = useState(false)
  const navigate = useNavigate()

  const toggleShowToast = () => {
    updateShowToast(!showToast)
  }
  const stepHandler = (type: string) => {
    switch (type) {
      case 'NEXT':
        updateActiveStep(activeStep + 1)
        break
      case 'PREV':
        updateActiveStep(activeStep - 1)
        break
      case 'SKIP_NEXT':
        updateActiveStep(activeStep + 2)
        break
      case 'SKIP_PREV':
        updateActiveStep(activeStep - 2)
        break
      case 'SUCCESS':
        updateActiveStep(0)
        toggleShowToast()
        navigate('account-dashboard')
        break
      case 'ERROR':
        toggleShowToast()
        break
      default:
        break
    }
  }

  return (
    <Paper sx={newSavingAccountStyles.formWrapper}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        key="topright"
        open={showToast}
        autoHideDuration={8000}
        onClose={toggleShowToast}
      >
        <Alert
          onClose={toggleShowToast}
          severity="error"
          sx={{ width: '100%' }}
        >
          Oops, account creation failed. Try again!
        </Alert>
      </Snackbar>
      <Card sx={newSavingAccountStyles.cardWrapper}>
        <CardHeader
          title={
            <Box>
              <Typography variant="h2" color="primary.dark" textAlign="center">
                New Saving Account Opening Application
              </Typography>
              <Typography
                variant="body1"
                color="primary.dark"
                textAlign="center"
              >
                Please fill in details below and continue.
              </Typography>
              <Divider
                variant="fullWidth"
                sx={newSavingAccountStyles.divider}
              />
              <Stepper activeStep={activeStep} alternativeLabel>
                {NEW_SAVING_ACCOUNT_OPEN_STEP.map((label) => {
                  const stepProps: { completed?: boolean } = {}
                  return (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <Step key={label} {...stepProps}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  )
                })}
              </Stepper>
            </Box>
          }
        />
        <CardContent>
          <SavingAccountOpenForm
            activeStep={activeStep}
            stepNavigationHandler={stepHandler}
          />
        </CardContent>
      </Card>
    </Paper>
  )
}

export default NewSavingAccount
