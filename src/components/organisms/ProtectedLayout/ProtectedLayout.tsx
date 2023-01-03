import { CircularProgress, Stack, Typography } from '@mui/material'
import React, { FC, useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useBankContext } from '../../../context'
import { setLoginData } from '../../../context/actions'
import { useAuth } from '../../../hooks/useAuth'
import { PageLayout } from '../PageLayout'

const ProtectedLayout: FC = () => {
  const { dispatch } = useBankContext()
  const authInfo = useAuth()
  const { pathname } = useLocation()
  const { validContext, customerId, customerName, isNewUser, AccessToken } =
    authInfo

  useEffect(() => {
    if (!validContext) {
      dispatch(
        setLoginData({ customerId, customerName, isNewUser, AccessToken })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authInfo])

  if (!AccessToken) {
    // eslint-disable-next-line no-console
    console.log('use not authorized')
    return <Navigate to="/" />
  }

  if (!validContext) {
    return (
      <Stack>
        <CircularProgress />
        <Typography variant="caption">Loading data, please wait!</Typography>
      </Stack>
    )
  }
  /* istanbul ignore next */
  if (pathname === '/ps-bank' || pathname === '/ps-bank/') {
    const navigatePath = isNewUser ? 'reset' : 'account-dashboard'
    return <Navigate to={navigatePath} />
  }

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  )
}

export default ProtectedLayout
