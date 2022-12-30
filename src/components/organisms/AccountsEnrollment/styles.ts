import { Theme } from '@mui/material'

export const accountsEnrollmentStyles = {
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: (theme: Theme) => `${theme.spacing(8)} ${theme.spacing(0)}`,
  },
  tabsContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: (theme: Theme) => theme.spacing(8),
  },
}
