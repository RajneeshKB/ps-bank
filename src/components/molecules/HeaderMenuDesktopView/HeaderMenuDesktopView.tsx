import React, { FC, memo } from 'react'
import { Box, Link, List, MenuItem, Typography } from '@mui/material'
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
    <Link href="/" underline="none" variant="h1" color="primary.contrastText">
      <Typography variant="h1">PS Bank</Typography>
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
          padding: '0px',
        }}
        role="menu"
      >
        {PAGES.map((page) => (
          <MenuItem key={page.label}>
            <Link
              key={page.label}
              href={page.href}
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
