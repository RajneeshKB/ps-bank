import { Theme } from '@mui/material'

export const welcomeDashboardStyles = {
  containerStyles: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: (theme: Theme) => `${theme.spacing(8)} ${theme.spacing(0)}`,
  },
}
