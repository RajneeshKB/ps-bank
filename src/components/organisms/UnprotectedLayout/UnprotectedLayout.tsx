import React, { FC } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useBankContext } from '../../../context'
import { PageLayout } from '../PageLayout'

const UnprotectedLayout: FC = () => {
  const {
    state: {
      loginData: { AccessToken, customerId, isNewUser },
    },
  } = useBankContext()

  if (AccessToken && customerId) {
    const navigatePath = isNewUser
      ? '/ps-bank/reset'
      : '/ps-bank/account-dashboard'
    return <Navigate to={navigatePath} />
  }

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  )
}

export default UnprotectedLayout
