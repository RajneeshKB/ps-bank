import { CircularProgress, Stack, Typography } from '@mui/material'
import React, { FC, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useBankContext } from '../../../context'
import { setLoginData } from '../../../context/actions'
import { useAuth } from '../../../hooks/useAuth'
import { PageLayout } from '../PageLayout'

const ProtectedLayout: FC = () => {
  const { dispatch } = useBankContext()
  const isAuthorized = useAuth()

  useEffect(() => {
    const { validContext, customerId, customerName, isNewUser, AccessToken } =
      isAuthorized
    if (!validContext) {
      dispatch(
        setLoginData({ customerId, customerName, isNewUser, AccessToken })
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized])

  if (!isAuthorized?.AccessToken) {
    // eslint-disable-next-line no-console
    console.log('use not authorized')
    return <Navigate to="/" />
  }

  if (!isAuthorized?.validContext) {
    return (
      <Stack>
        <CircularProgress />
        <Typography variant="caption">Loading data, please wait!</Typography>
      </Stack>
    )
  }

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  )
}

export default ProtectedLayout
