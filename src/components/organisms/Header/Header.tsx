import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material'
import { useBankContext } from '../../../context'
import { MobileMenuView } from '../../molecules/HeaderMenuMobileView'
import { ContextMenu } from '../../molecules/HeaderContextMenu'
import { DesktopMenuView } from '../../molecules/HeaderMenuDesktopView'
import { headerStyles } from './styles'

const Header: FC = () => {
  const {
    state: {
      loginData: { AccessToken },
    },
  } = useBankContext()

  const { pathname } = useLocation()
  const splittedPath = pathname?.split('/')
  const currentPath = splittedPath?.length
    ? splittedPath[splittedPath.length - 1]
    : ''
  const parentPath =
    splittedPath?.length > 1 ? splittedPath[splittedPath.length - 2] : ''

  return (
    <AppBar position="static" sx={headerStyles.headerWrapperStyles}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MobileMenuView
            showMenu={!!AccessToken}
            selectedMenu={currentPath}
            parentPath={parentPath}
          />
          <DesktopMenuView
            showMenu={!!AccessToken}
            selectedMenu={currentPath}
            parentPath={parentPath}
          />
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
              <Button href="/login" variant="contained" color="success">
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
