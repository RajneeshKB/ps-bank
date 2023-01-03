import React, { FC, memo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import {
  Box,
  Drawer,
  IconButton,
  Link,
  List,
  MenuItem,
  Stack,
} from '@mui/material'
import { PAGES } from '../../../utils'

const HeaderMenuMobileView: FC = () => {
  const [drawerState, updateOpenDrawer] = useState(false)
  const closeDrawer = () => {
    updateOpenDrawer(false)
  }
  const openDrawer = () => {
    updateOpenDrawer(true)
  }

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <Stack direction="row" alignItems="center">
        <IconButton
          size="large"
          aria-label="bank navigation"
          aria-controls="bank-navigation-bar"
          aria-haspopup="true"
          onClick={openDrawer}
          color="inherit"
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          <MenuIcon />
        </IconButton>
        <Link
          component={RouterLink}
          to="/"
          underline="none"
          variant="h1"
          color="primary.contrastText"
        >
          PS Bank
        </Link>
      </Stack>
      <Drawer open={drawerState} onClose={closeDrawer}>
        <List
          sx={{ width: '11rem' }}
          role="menu"
          onClick={closeDrawer}
          onKeyDown={closeDrawer}
        >
          {PAGES.map((page) => (
            <MenuItem key={page.label}>
              <Link component={RouterLink} to={page.href} underline="none">
                {page.label}
              </Link>
            </MenuItem>
          ))}
        </List>
      </Drawer>
    </Box>
  )
}

export default memo(HeaderMenuMobileView)
