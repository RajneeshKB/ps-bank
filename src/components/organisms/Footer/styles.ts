import { Theme } from '@mui/material'

export const footerStyles = {
  footerWrapperStyles: {
    backgroundColor: 'neutral.light',
    padding: (theme: Theme) => `${theme.spacing(3)} ${theme.spacing(0)}`,
  },
}
