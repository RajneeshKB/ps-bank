import React, { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Button } from '@mui/material'
import { useBankContext } from '../../../context'
import { logoutCustomer } from '../../../context/actions'

const HeaderActions: FC = () => {
  const {
    dispatch,
    state: {
      loginData: { AccessToken },
    },
  } = useBankContext()

  const logoutCustomerAndResetSession = () => {
    dispatch(logoutCustomer())
  }

  if (!AccessToken) {
    return (
      <Button
        to="/login"
        variant="contained"
        component={RouterLink}
        color="success"
      >
        Login
      </Button>
    )
  }
  return (
    <Button
      variant="contained"
      color="success"
      onClick={logoutCustomerAndResetSession}
    >
      Logout
    </Button>
  )
}

export default HeaderActions
