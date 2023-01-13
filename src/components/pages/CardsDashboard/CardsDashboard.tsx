import React, { FC } from 'react'
import { Container } from '@mui/material'
import { useQuery } from '@apollo/client'
import { GET_CREDIT_CARDS } from '../../../graphql/queries'
import { ViewLoader } from '../../atoms/ViewLoader'
import { useBankContext } from '../../../context'
import { Cards } from '../../organisms/Cards'

const CardsDashboard: FC = () => {
  const {
    state: {
      loginData: { customerId },
    },
  } = useBankContext()

  const { loading, error, data } = useQuery(GET_CREDIT_CARDS, {
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
      <Cards cardsList={data} />
    </Container>
  )
}

export default CardsDashboard
