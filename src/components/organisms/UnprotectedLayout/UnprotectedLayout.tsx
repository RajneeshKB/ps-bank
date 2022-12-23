import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { PageLayout } from '../PageLayout'

const UnprotectedLayout: FC = () => {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  )
}

export default UnprotectedLayout
