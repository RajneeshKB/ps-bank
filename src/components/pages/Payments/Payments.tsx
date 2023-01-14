import React, { FC } from 'react'
import {
  Outlet,
  Link as RouterLink,
  useLocation,
  matchPath,
} from 'react-router-dom'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import { PAY_CARD_ROUTE, TRANSFER_MONEY_ROUTE } from '../../../utils'

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation()

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i]
    const possibleMatch = matchPath(pattern, pathname)
    if (possibleMatch !== null) {
      return possibleMatch
    }
  }

  return null
}

const Payments: FC = () => {
  const routeMatch = useRouteMatch([TRANSFER_MONEY_ROUTE, PAY_CARD_ROUTE])
  const currentTab = routeMatch?.pattern?.path

  return (
    <Box>
      <Typography variant="h2" mb="1rem">
        Payments
      </Typography>
      <Tabs
        value={currentTab}
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
