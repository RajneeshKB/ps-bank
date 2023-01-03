import React, { FC, useEffect } from 'react'
import { Container } from '@mui/material'
import { useLazyQuery } from '@apollo/client'
import { GET_ACCOUNTS } from '../../../graphql/queries'
import { ViewLoader } from '../../atoms/ViewLoader'
import { useBankContext } from '../../../context'
import { AccountsList } from '../../organisms/Accounts'

const AccountsDashboard: FC = () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <ViewLoader />
  }
  if (error) {
    return <h2>Error occured</h2>
  }

  if (!data) return null
  return (
    <Container maxWidth="xl">
      <AccountsList accountsData={data} />
    </Container>
  )
}

export default AccountsDashboard
