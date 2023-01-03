import React, { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material'
import { useBankContext } from '../../../context'
import { MobileMenuView } from '../../molecules/HeaderMenuMobileView'
import { ContextMenu } from '../../molecules/HeaderContextMenu'
import { DesktopMenuView } from '../../molecules/HeaderMenuDesktopView'

const Header: FC = () => {
  const {
    state: {
      loginData: { AccessToken },
    },
  } = useBankContext()

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {AccessToken && <MobileMenuView />}
          <DesktopMenuView showMenu={!!AccessToken} />
          {AccessToken ? (
            <ContextMenu />
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                to="/login"
                variant="contained"
                component={RouterLink}
                color="success"
              >
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
