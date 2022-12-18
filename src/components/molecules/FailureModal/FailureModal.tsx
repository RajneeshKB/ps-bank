import React, { FC } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Modal,
  Typography,
} from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import { failureModalStyles } from './styles'

interface IRegistrationFailureProps {
  showModal: boolean
  onCloseClick: () => void
}

const FailureModal: FC<IRegistrationFailureProps> = ({
  showModal,
  onCloseClick,
}) => (
  <Modal
    open={showModal}
    disableEscapeKeyDown
    aria-labelledby="failure-title"
    aria-describedby="failure-detail"
  >
    <Card sx={failureModalStyles.modalContent}>
      <CardHeader
        avatar={<CancelIcon color="error" sx={{ fontSize: '4rem' }} />}
        title={
          <Typography id="failure-title" variant="h2">
            Our system isn&apos;t cooperating.
          </Typography>
        }
      />
      <CardContent id="failure-detail">
        <Typography variant="body1">
          There is a problem on our end. It should&apos;nt last long so please
          try again shortly.
        </Typography>
      </CardContent>
      <CardActions sx={failureModalStyles.modalAction}>
        <Button variant="contained" onClick={onCloseClick}>
          Close
        </Button>
      </CardActions>
    </Card>
  </Modal>
)

export default FailureModal
