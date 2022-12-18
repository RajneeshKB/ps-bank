import React from 'react'
import { Container, Paper } from '@mui/material'
import { CustomerDashboardStyles } from './styles'
import { UserRegistrationBasicForm } from '../../organisms/UserRegistrationBasic'

const CustomerDashboard = () => (
  <Paper sx={CustomerDashboardStyles.paperContainer}>
    <Container maxWidth="xl">
      <UserRegistrationBasicForm />
    </Container>
  </Paper>
)

export default CustomerDashboard
