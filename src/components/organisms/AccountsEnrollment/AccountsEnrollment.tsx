import React, { FC, memo, useState } from 'react'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import TabPanelSavings from '../../molecules/TabPanelSavings/TabPanelSavings'
import { CreditCardPanel } from '../../molecules/TabPanelCreditCard'
import { useBankContext } from '../../../context'
import { accountsEnrollmentStyles } from './styles'

interface ITabPanelProps {
  children: React.ReactNode
  index: number
  value: number
  ariaLabel: string
  id: string
}

const TabPanel: FC<ITabPanelProps> = ({
  children,
  value,
  index,
  ariaLabel,
  id,
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      aria-hidden={value !== index}
      id={id}
      aria-labelledby={ariaLabel}
    >
      {value === index && children}
    </div>
  )
}

const AccountsEnrollment: FC = () => {
  const [selectedTab, updatedSelectedTab] = useState(0)
  const {
    state: {
      loginData: { customerName },
    },
  } = useBankContext()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    updatedSelectedTab(newValue)
  }

  return (
    <Box sx={accountsEnrollmentStyles.titleContainer}>
      <Typography variant="h2">{`Welcome ${customerName}`}</Typography>
      <Typography variant="subtitle2">
        Thank you for chhosing us as your banking parnter.
      </Typography>
      <Typography variant="subtitle2" mt="1.5rem">
        Get started by opening a Saving bank account with us. You can also apply
        for a new credit card fro our various available options.
      </Typography>

      <Box sx={accountsEnrollmentStyles.tabsContainer}>
        <Tabs
          orientation="vertical"
          value={selectedTab}
          onChange={handleChange}
          aria-label="Open new account"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab
            label="Saving account"
            id="saving-account"
            aria-controls="saving-account-panel"
          />
          <Tab
            label="Credit card"
            id="credit-card"
            aria-controls="credit-card-panel"
          />
        </Tabs>
        <TabPanel
          value={selectedTab}
          index={0}
          id="saving-account"
          ariaLabel="saving-account-panel"
        >
          <TabPanelSavings />
        </TabPanel>
        <TabPanel
          value={selectedTab}
          index={1}
          id="credit-card"
          ariaLabel="credit-card-panel"
        >
          <CreditCardPanel />
        </TabPanel>
      </Box>
    </Box>
  )
}

export default memo(AccountsEnrollment)
