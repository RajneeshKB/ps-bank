import React, { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { Box, FormControlLabel, Stack, Switch, Typography } from '@mui/material'
import { CardAccordian } from '../../molecules/CardsAccordian'
import { cardsStyles } from './styles'

type DebitCard = {
  activeDebitCard: string
  cvvNumber: string
  validFrom: string
  validTo: string
}
type CreditCard = {
  availableLimit: string
  cardholderId: string
  creditCardNumber: string
  creditCardType: string
  cvvNumber: string
  outstandingAmount: string
  validFrom: string
  validTo: string
}
type CardsList = {
  getCustomerDetails: { customerName: string }
  getAccounts: DebitCard[]
  getCreditCards: CreditCard[]
}
interface IAccountsProps {
  cardsList: CardsList
}
const Accounts: FC<IAccountsProps> = ({ cardsList }) => {
  const [showDetails, updateShowDetails] = React.useState(false)
  const {
    getCustomerDetails: { customerName },
    getAccounts: debitCards,
    getCreditCards: creditCards,
  } = cardsList
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateShowDetails(event.target.checked)
  }

  if (!customerName || (!debitCards?.length && !creditCards.length)) {
    return <Navigate to="/ps-bank/apply" />
  }

  return (
    <Box sx={{ py: '1.5rem' }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h2" mb="0.5rem">
          Cards
        </Typography>
        <FormControlLabel
          control={<Switch checked={showDetails} onChange={handleChange} />}
          label="Show Card Details"
          labelPlacement="end"
        />
      </Stack>
      <Box sx={cardsStyles.cardContainer}>
        <CardAccordian
          title="Credit Cards"
          isCreditCard
          cardData={creditCards}
          customerName={customerName}
          showDetails={showDetails}
        />
        <CardAccordian
          title="Debit Cards"
          cardData={debitCards}
          customerName={customerName}
          showDetails={showDetails}
        />
      </Box>
    </Box>
  )
}

export default Accounts
