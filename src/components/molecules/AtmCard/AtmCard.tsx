import React, { FC, memo } from 'react'
import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { atmCardStyles } from './styles'
import { getMaskedCardNumber } from '../../../utils'

interface IAtmCardProps {
  customerName: string
  cardNumber: string
  cvvNumber: string
  validFrom: string
  validTo: string
  showDetails?: boolean
  isCreditCard?: boolean
  availableLimit?: string
  creditCardType?: string
  outstandingAmount?: string
}
const AtmCard: FC<IAtmCardProps> = ({
  customerName,
  cardNumber,
  cvvNumber,
  validFrom,
  validTo,
  showDetails,
  isCreditCard,
  availableLimit,
  creditCardType,
  outstandingAmount,
}) => (
  <Card
    sx={{
      ...atmCardStyles.cardContainer,
      // eslint-disable-next-line no-nested-ternary
      bgcolor: isCreditCard
        ? creditCardType === 'gold'
          ? '#a48a00'
          : '#818181'
        : '#e88075',
    }}
    raised
  >
    <CardContent sx={{ p: '0rem' }}>
      <Box sx={atmCardStyles.frontContent}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h3">{creditCardType?.toUpperCase()}</Typography>
          <Stack>
            <Typography variant="h2">PS Bank</Typography>
            <Typography variant="subtitle1">
              {isCreditCard ? 'Credit Cards' : 'Debit Cards'}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={4}>
          <Typography
            variant="h2"
            sx={atmCardStyles.cardNumber}
            fontSize={showDetails ? '1.5rem' : '1.4rem'}
          >
            {showDetails
              ? cardNumber?.match(/.{1,4}/g)?.join('  ')
              : getMaskedCardNumber(cardNumber)}
          </Typography>
          <Stack direction="row" justifyContent="space-between">
            <Stack>
              <Stack direction="row" spacing={10}>
                <Stack direction="row" spacing={1}>
                  <Typography
                    variant="caption"
                    maxWidth="2rem"
                    fontSize="0.5rem"
                  >
                    VALID FROM
                  </Typography>
                  <Typography variant="h4">{validFrom}</Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography
                    variant="caption"
                    maxWidth="2rem"
                    fontSize="0.5rem"
                  >
                    VALID THRU
                  </Typography>
                  <Typography variant="h4">{validTo}</Typography>
                </Stack>
              </Stack>
              <Typography variant="h3" letterSpacing="2px">
                {customerName}
              </Typography>
            </Stack>
            <Typography variant="h2">VISA</Typography>
          </Stack>
        </Stack>
      </Box>
      <Stack sx={atmCardStyles.backContent}>
        {availableLimit && (
          <Stack>
            <Typography variant="caption">Available limit</Typography>
            <Typography variant="subtitle1">
              &#8377;
              {availableLimit}
            </Typography>
          </Stack>
        )}
        {outstandingAmount && (
          <Stack>
            <Typography variant="caption">Current Outstanding</Typography>
            <Typography variant="subtitle1">
              &#8377;
              {outstandingAmount}
            </Typography>
          </Stack>
        )}
        <Stack>
          <Typography variant="caption">CVV</Typography>
          <Typography variant="subtitle1">
            {showDetails ? cvvNumber : cvvNumber.replaceAll(/\d/g, '*')}
          </Typography>
        </Stack>
      </Stack>
    </CardContent>
  </Card>
)

AtmCard.defaultProps = {
  isCreditCard: false,
  showDetails: false,
  availableLimit: '',
  creditCardType: '',
  outstandingAmount: '',
}
export default memo(AtmCard)
