import React, { FC, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Box, Stack, Typography } from '@mui/material'
import { Control, useForm } from 'react-hook-form'
import { useBankContext } from '../../../context'
import { GET_ACCOUNTS } from '../../../graphql/queries'
import { ViewLoader } from '../../atoms/ViewLoader'
import {
  BANK_ACCOUNT,
  getItemFromSession,
  getTransactionFilterFormControlValues,
  ITransactionFilterForm,
  TRANSACTION_FILTER_FORM,
  TRANSACTION_FILTER_FORM_DEFAULT_VALUES,
} from '../../../utils'
import { FormBuilder } from '../../organisms/FormBuilder'
import { TransactionsList } from '../../organisms/AccountTransactions'

type FormProps = {
  control: Control<ITransactionFilterForm>
  handleSubmit: any
  watch: any
}

const AccountStatement: FC = () => {
  const [filterData, updateFilterData] = useState<any>(null)
  const {
    state: {
      loginData: { customerId },
    },
  } = useBankContext()
  const selectedAccount = getItemFromSession('selectedAccount') || ''

  const { loading, error, data } = useQuery(GET_ACCOUNTS, {
    variables: { customerId },
  })

  const defaultFormValues = {
    ...TRANSACTION_FILTER_FORM_DEFAULT_VALUES,
    [BANK_ACCOUNT]: selectedAccount,
  }
  const { control, handleSubmit, watch }: FormProps =
    useForm<ITransactionFilterForm>({
      defaultValues: defaultFormValues,
    })

  const fetchTransactions = (formData: ITransactionFilterForm) => {
    const {
      fromDate,
      selectedAccount: accountNumber,
      toDate,
      transactionListFilterOption,
    } = formData

    if (transactionListFilterOption === 'dateRange' && (!fromDate || !toDate))
      return

    let variableInputs = {}
    if (transactionListFilterOption === 'dateRange') {
      variableInputs = {
        customerId,
        accountNumber: accountNumber.toString(),
        lastTenTransactions: false,
        fromDate: new Date(fromDate).toISOString(),
        toDate: new Date(toDate).toISOString(),
      }
    } else {
      variableInputs = {
        customerId,
        accountNumber: accountNumber.toString(),
      }
    }
    updateFilterData(variableInputs)
  }

  if (loading) {
    return <ViewLoader />
  }
  if (error) {
    return <h2>Error occured</h2>
  }

  if (!data?.getAccounts?.length) return null

  return (
    <Box>
      <Typography variant="h2">Account Statement</Typography>
      <Stack my="1rem">
        <Box sx={{ border: '1px solid', p: '1rem' }}>
          <FormBuilder
            formControls={TRANSACTION_FILTER_FORM}
            controlHook={control}
            watchHook={watch}
            controlValues={getTransactionFilterFormControlValues(
              data.getAccounts
            )}
            submitHandler={handleSubmit(fetchTransactions)}
            submitButtonLabel="View transactions"
          />
        </Box>
      </Stack>
      {filterData && <TransactionsList filterData={filterData} />}
    </Box>
  )
}

export default AccountStatement
