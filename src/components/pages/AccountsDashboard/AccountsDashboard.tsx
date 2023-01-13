import React, { FC } from 'react'
import { Container } from '@mui/material'
import { useQuery } from '@apollo/client'
import { GET_ACCOUNTS } from '../../../graphql/queries'
import { ViewLoader } from '../../atoms/ViewLoader'
import { useBankContext } from '../../../context'
import { AccountsList } from '../../organisms/Accounts'

const AccountsDashboard: FC = () => {
  const {
    state: {
      loginData: { customerId },
    },
  } = useBankContext()
  const { loading, error, data } = useQuery(GET_ACCOUNTS, {
    variables: { customerId },
  })

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
