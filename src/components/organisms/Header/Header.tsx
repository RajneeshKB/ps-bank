import React, { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Container, Link, Stack } from '@mui/material'
import { headerStyles } from './styles'
import { HeaderActions } from '../../molecules/HeaderActions'

const Header: FC = () => (
  <header>
    <Box sx={headerStyles.headerWrapperStyles}>
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link
            component={RouterLink}
            to="/"
            underline="none"
            variant="h1"
            color="primary.contrastText"
          >
            PS Bank
          </Link>
          <HeaderActions />
        </Stack>
      </Container>
    </Box>
  </header>
)

export default Header
