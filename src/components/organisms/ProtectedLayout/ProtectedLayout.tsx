import React, { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { PageLayout } from '../PageLayout'

const ProtectedLayout: FC = () => {
  const isAuthorized = useAuth()

  if (!isAuthorized) {
    // eslint-disable-next-line no-console
    console.log('use not authorized')
    return <Navigate to="/" />
  }

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  )
}

export default ProtectedLayout
