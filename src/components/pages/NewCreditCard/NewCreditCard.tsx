import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { NewCreditCardApplication } from '../../organisms/NewCreditCardApplication'
import { newCreditCardStyles } from './styles'

const NewSavingAccount: FC = () => {
  const [showToast, updateShowToast] = useState(false)
  const navigate = useNavigate()
  const toggleShowToast = () => {
    updateShowToast(!showToast)
  }
  const onCompletion = (_type: string) => {
    if (_type === 'SUCCESS') {
      navigate('/')
    } else if (_type === 'FAILURE') {
      toggleShowToast()
    }
  }
  return (
    <Paper sx={newCreditCardStyles.formWrapper}>
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
          Oops, Failed to apply for new credit card. Try again!
        </Alert>
      </Snackbar>
      <Card sx={newCreditCardStyles.cardWrapper}>
        <CardHeader
          title={
            <Box>
              <Typography variant="h2" color="primary.dark" textAlign="center">
                New Credit Card Application
              </Typography>
              <Typography
                variant="subtitle1"
                color="primary.dark"
                textAlign="center"
              >
                Please fill in details below and continue.
              </Typography>
            </Box>
          }
        />
        <CardContent>
          <NewCreditCardApplication onApplicationCompletion={onCompletion} />
        </CardContent>
      </Card>
    </Paper>
  )
}

export default NewSavingAccount
