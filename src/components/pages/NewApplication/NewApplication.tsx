import React, { FC } from 'react'
import { Container } from '@mui/material'
import { AccountsEnrollment } from '../../organisms/AccountsEnrollment'

const NewApplication: FC = () => (
  <Container maxWidth="xl">
    <AccountsEnrollment />
  </Container>
)

export default NewApplication
