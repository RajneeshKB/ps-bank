import React, { FC } from 'react'
import { Typography } from '@mui/material'
import { SuccessModal } from '../../atoms/SuccessModal'

interface IGenericErrorModalProps {
  showModal: boolean
  onCloseClick: () => void
}

const GenericErrorModal: FC<IGenericErrorModalProps> = ({
  showModal,
  onCloseClick,
}) => {
  const modalProps = {
    showModal,
    onCloseClick,
    title: (
      <Typography variant="h2">Our system isn&apos;t cooperating.</Typography>
    ),
    description: (
      <Typography variant="body1">
        There is a problem on our end. It should&apos;nt last long so please try
        again shortly.
      </Typography>
    ),
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <SuccessModal {...modalProps} />
}

export default GenericErrorModal
