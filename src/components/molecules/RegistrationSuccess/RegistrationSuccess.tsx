import React, { FC } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Modal,
  Stack,
  Typography,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { registrationSuccessStyles } from './styles'

interface IRegistrationSuccessProps {
  showModal: boolean
  onCloseClick: () => void
}

const RegistrationSuccess: FC<IRegistrationSuccessProps> = ({
  showModal,
  onCloseClick,
}) => (
  <Modal
    open={showModal}
    disableEscapeKeyDown
    aria-labelledby="success-title"
    aria-describedby="success-detail"
  >
    <Card sx={registrationSuccessStyles.modalContent}>
      <CardHeader
        avatar={<CheckCircleIcon color="success" sx={{ fontSize: '4rem' }} />}
        title={
          <Typography id="success-title" variant="h2">
            You&apos;re all set
          </Typography>
        }
      />
      <CardContent id="success-detail">
        <Stack spacing={2}>
          <Typography variant="body1">
            Thanks you for registering with us. We will take maximum 24-48 hours
            to verify your details, and post verification we will inform you on
            your registered mail along with customer ID and one-time password.
          </Typography>
          <Typography variant="body1">
            Update your default password on first login and use your login
            credentials to open an digital account with us and give us serve you
            better.
          </Typography>
          <Typography variant="caption">Happy banking!</Typography>
        </Stack>
      </CardContent>
      <CardActions sx={registrationSuccessStyles.modalAction}>
        <Button variant="contained" onClick={onCloseClick}>
          Close
        </Button>
      </CardActions>
    </Card>
  </Modal>
)

export default RegistrationSuccess
