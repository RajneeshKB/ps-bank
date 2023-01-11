import React, { FC, useState } from 'react'
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Snackbar,
  Typography,
} from '@mui/material'
import { CreditCardApplication } from '../../organisms/CreditCardApplication'
import { newCreditCardStyles } from './styles'

const NewSavingAccount: FC = () => {
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
  const onCompletion = (_type: string) => {
    if (_type === 'SUCCESS') {
      toggleShowToast(true)
    } else if (_type === 'FAILURE') {
      toggleShowToast(false)
    }
  }

  return (
    <Paper sx={newCreditCardStyles.formWrapper}>
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
              ? 'Woohoo, New credit card issued successfully.'
              : 'Oops, Failed to apply for new credit card. Try again!'}
          </Alert>
        </Snackbar>
      )}
      <Card sx={newCreditCardStyles.cardWrapper}>
        <CardHeader
          title={
            <Box>
              <Typography variant="h2" color="primary.dark" textAlign="center">
                New Credit Card Application
              </Typography>
              <Typography
                variant="body1"
                color="primary.dark"
                textAlign="center"
              >
                Please fill in details below and continue.
              </Typography>
            </Box>
          }
        />
        <CardContent>
          <CreditCardApplication onApplicationCompletion={onCompletion} />
        </CardContent>
      </Card>
    </Paper>
  )
}

export default NewSavingAccount
