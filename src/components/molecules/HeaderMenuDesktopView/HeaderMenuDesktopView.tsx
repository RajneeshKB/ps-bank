import React, { FC, memo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Link, List, MenuItem } from '@mui/material'
import { PAGES } from '../../../utils'

interface IHeaderMenuDesktopView {
  showMenu: boolean
}
const HeaderMenuDesktopView: FC<IHeaderMenuDesktopView> = ({ showMenu }) => (
  <Box
    sx={{
      flexGrow: 1,
      display: { xs: 'none', md: 'flex' },
      color: 'primary.main',
    }}
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
    {showMenu && (
      <List
        sx={{
          flexGrow: 1,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'row',
          color: 'primary.main',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
        role="menu"
      >
        {PAGES.map((page) => (
          <MenuItem key={page.label}>
            <Link
              key={page.label}
              component={RouterLink}
              to={page.href}
              underline="none"
              color="primary.contrastText"
            >
              {page.label}
            </Link>
          </MenuItem>
        ))}
      </List>
    )}
  </Box>
)

export default memo(HeaderMenuDesktopView)
