import React, { FC, useEffect } from 'react'
import { Container } from '@mui/material'
import { useLazyQuery } from '@apollo/client'
import { AccountsEnrollment } from '../../organisms/AccountsEnrollment'
import { GET_ACCOUNTS } from '../../../graphql/queries'
import { ViewLoader } from '../../atoms/ViewLoader'
import { useBankContext } from '../../../context'

const WelcomeDashboard: FC = () => {
  const [getAccounts, { loading, error, data }] = useLazyQuery(GET_ACCOUNTS)
  const {
    state: {
      loginData: { customerId },
    },
  } = useBankContext()

  useEffect(() => {
    getAccounts({
      variables: { customerId },
    })
  }, [customerId, getAccounts])

  if (loading) {
    return <ViewLoader />
  }
  if (error) {
    return <h2>Error occured</h2>
  }

  if (data?.getAccounts.length) {
    return <h2>Work in progress!</h2>
  }

  return (
    <Container maxWidth="xl">
      <AccountsEnrollment />
    </Container>
  )
}

export default WelcomeDashboard
