import React, { FC } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { footerStyles } from './styles'

const Footer: FC = () => (
  <footer>
    <Box sx={footerStyles.footerWrapperStyles}>
      <Container maxWidth="xl">
        <Typography
          variant="h5"
          color="neutral.contrastText"
          textAlign="center"
        >
          Developed by: Rajneesh Barnwal
        </Typography>
      </Container>
    </Box>
  </footer>
)

export default Footer
