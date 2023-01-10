import React, { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { Box, FormControlLabel, Stack, Switch, Typography } from '@mui/material'
import { AccountCard } from '../../molecules/AccountCard'

interface IAccountsProps {
  accountsData: {
    getCustomerDetails: { customerName: string }
    getAccounts: any[]
  }
}
const Accounts: FC<IAccountsProps> = ({ accountsData }) => {
  const [showBalance, updateShowBalance] = React.useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateShowBalance(event.target.checked)
  }
  const {
    getAccounts: accountList,
    getCustomerDetails: { customerName },
  } = accountsData

  if (!customerName || !accountList?.length) {
    return <Navigate to="/ps-bank/apply" />
  }

  return (
    <Box sx={{ py: '1.5rem' }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h2" mb="0.5rem">
          Accounts
        </Typography>
        <FormControlLabel
          control={<Switch checked={showBalance} onChange={handleChange} />}
          label="Show Details"
          labelPlacement="end"
        />
      </Stack>
      <Stack spacing={4}>
        {accountList.map((account) => {
          const { accountNumber, accountType } = account
          return (
            <AccountCard
              key={`${accountType}_${accountNumber}`}
              showBalance={showBalance}
              customerName={customerName}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...account}
            />
          )
        })}
      </Stack>
    </Box>
  )
}

export default Accounts
