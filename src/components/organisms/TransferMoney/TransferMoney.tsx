import React, { FC, useState } from 'react'
import { Alert, Box, Snackbar, Stack, Typography } from '@mui/material'
import { useMutation, useQuery } from '@apollo/client'
import { useBankContext } from '../../../context'
import {
  ADD_PAYEE,
  GET_ACCOUNTS,
  GET_ALL_ACCOUNTS_AND_BENEFICIARIES,
  TRANSFER_MONEY,
} from '../../../graphql/queries'
import { ViewLoader } from '../../atoms/ViewLoader'
import { TransferMoney } from '../../molecules/TransferMoney'
import { AddPayeeModal } from '../../molecules/AddPayee'

const TransferMoeny: FC = () => {
  const [showModal, updateShowModal] = useState(false)
  const [showToast, updateShowToast] = useState({
    display: false,
    success: '',
  })
  const {
    state: {
      loginData: { customerId },
    },
  } = useBankContext()
  const { loading, data, error } = useQuery(
    GET_ALL_ACCOUNTS_AND_BENEFICIARIES,
    {
      variables: { customerId },
    }
  )
  const [addPayee, { loading: addingPayee }] = useMutation(ADD_PAYEE, {
    refetchQueries: [
      { query: GET_ALL_ACCOUNTS_AND_BENEFICIARIES, variables: { customerId } },
    ],
  })
  const [transferMoney, { loading: transferringMoney }] = useMutation(
    TRANSFER_MONEY,
    {
      refetchQueries: [
        {
          query: GET_ALL_ACCOUNTS_AND_BENEFICIARIES,
          variables: { customerId },
        },
        { query: GET_ACCOUNTS, variables: { customerId } },
      ],
    }
  )
  const toggleShowToast = (isSuccess: boolean) => {
    updateShowToast({
      display: !showToast.display,
      success: isSuccess ? 'SUCCESS' : 'FAILURE',
    })
  }
  const onToastClose = () => {
    updateShowToast({ display: false, success: '' })
  }

  const { getAccounts: accountList, getAllBeneficiaries: payeeList } =
    data || {}

  const toggleShowModal = () => {
    updateShowModal(!showModal)
  }
  const initiateAmountTransfer = (formData: any) => {
    // eslint-disable-next-line no-console
    console.log('formdata', formData)
    transferMoney({
      variables: {
        input: { ...formData, customerId },
      },
      onCompleted: () => {
        toggleShowToast(true)
      },
      onError: () => {
        toggleShowToast(false)
      },
    })
  }
  const initiatePayeeAddition = (formData: any) => {
    addPayee({
      variables: {
        input: { ...formData, customerId },
      },
      onCompleted: () => {
        toggleShowToast(true)
      },
      onError: () => {
        toggleShowToast(false)
      },
    })
    toggleShowModal()
  }
  if (loading) {
    return <ViewLoader />
  }
  if (error) {
    return (
      <Typography variant="h3">
        Error occured while fetching accounts data
      </Typography>
    )
  }
  if (accountList?.length) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '2rem',
        }}
      >
        <Stack
          p={8}
          maxWidth="50rem"
          width="40rem"
          border="1px solid"
          borderRadius={4}
        >
          {transferringMoney ? (
            <ViewLoader />
          ) : (
            <TransferMoney
              accountsList={accountList}
              beneficiaryList={payeeList}
              showPayeeLoader={addingPayee}
              onSubmitHandler={initiateAmountTransfer}
              onAddPayeeClick={toggleShowModal}
            />
          )}
        </Stack>
        {showModal && (
          <AddPayeeModal
            showModal={showModal}
            onSubmitHandler={initiatePayeeAddition}
            onCloseHandler={toggleShowModal}
          />
        )}
        {showToast.success && (
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            key="topright"
            open={showToast.display}
            autoHideDuration={8000}
            onClose={onToastClose}
          >
            <Alert
              onClose={onToastClose}
              severity={showToast.success === 'SUCCESS' ? 'success' : 'error'}
              sx={{ width: '100%' }}
            >
              {showToast.success === 'SUCCESS'
                ? 'Beneficiary added successfully'
                : 'Oops, Failed to add beneficiary. Try again!'}
            </Alert>
          </Snackbar>
        )}
      </Box>
    )
  }

  return null
}

export default TransferMoeny
