import React, { FC, useState } from 'react'
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
  const [showToast, updateShowToast] = useState({
    display: false,
    success: '',
  })
  const toggleShowToast = (isSuccess: boolean) => {
    updateShowToast({
      display: !showToast.display,
      success: isSuccess ? 'SUCCESS' : 'FAILURE',
    })
  }
  const onToastClose = () => {
    updateShowToast({ display: false, success: '' })
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
        toggleShowToast(true)
        break
      case 'ERROR':
        toggleShowToast(false)
        break
      default:
        break
    }
  }

  return (
    <Paper sx={newSavingAccountStyles.formWrapper}>
      {showToast.success && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          key="topright"
          open={showToast.display}
          autoHideDuration={8000}
          onClose={onToastClose}
        >
          <Alert
            onClose={onToastClose}
            severity={showToast.success === 'SUCCESS' ? 'success' : 'error'}
            sx={{ width: '100%' }}
          >
            {showToast.success === 'SUCCESS'
              ? 'Woohoo, New saving account opened successfully.'
              : 'Oops, account creation failed. Try again!'}
          </Alert>
        </Snackbar>
      )}
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
