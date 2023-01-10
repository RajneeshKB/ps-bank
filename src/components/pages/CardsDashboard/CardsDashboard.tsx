import React, { FC, useEffect } from 'react'
import { Container } from '@mui/material'
import { useLazyQuery } from '@apollo/client'
import { GET_CREDIT_CARDS } from '../../../graphql/queries'
import { ViewLoader } from '../../atoms/ViewLoader'
import { useBankContext } from '../../../context'
import { Cards } from '../../organisms/Cards'

const CardsDashboard: FC = () => {
  const [getCreditCards, { loading, error, data }] =
    useLazyQuery(GET_CREDIT_CARDS)
  const {
    state: {
      loginData: { customerId },
    },
  } = useBankContext()

  useEffect(() => {
    getCreditCards({
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
      <Cards cardsList={data} />
    </Container>
  )
}

export default CardsDashboard
