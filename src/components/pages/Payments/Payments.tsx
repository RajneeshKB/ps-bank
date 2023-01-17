import React, { FC, useEffect } from 'react'
import {
  Outlet,
  Link as RouterLink,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import { PAY_CARD_ROUTE, TRANSFER_MONEY_ROUTE } from '../../../utils'

const Payments: FC = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const splittedPath = pathname?.split('/')
  const currentPath = splittedPath?.length
    ? splittedPath[splittedPath.length - 1]
    : ''
  const selectedTab = [TRANSFER_MONEY_ROUTE, PAY_CARD_ROUTE].includes(
    currentPath
  )
    ? currentPath
    : TRANSFER_MONEY_ROUTE

  useEffect(() => {
    if ([TRANSFER_MONEY_ROUTE, PAY_CARD_ROUTE].indexOf(currentPath) === -1) {
      navigate(TRANSFER_MONEY_ROUTE)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box>
      <Typography variant="h2" mb="1rem">
        Payments
      </Typography>
      <Tabs
        value={selectedTab}
        aria-label="do payments"
        textColor="primary"
        indicatorColor="primary"
        sx={{ borderBottom: 1, borderColor: 'primary' }}
      >
        <Tab
          label="Transfer money"
          id="transfer-money"
          component={RouterLink}
          to="transfer-money"
          value="transfer-money"
        />
        <Tab
          label="Pay Credit Cards"
          id="pay-cards"
          component={RouterLink}
          to="pay-card"
          value="pay-card"
        />
      </Tabs>
      <Outlet />
    </Box>
  )
}

export default Payments
