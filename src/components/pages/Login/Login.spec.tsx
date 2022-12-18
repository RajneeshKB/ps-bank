/* eslint-disable no-console */
import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react'
import { renderWithRouter } from '../../../utils/test-utils'
import Login from './Login'

describe('TS:1 - Login component', () => {
  it('TC:01 - should render Login Component successfully', () => {
    const { getByText, getAllByRole, getByLabelText } = renderWithRouter(
      <Login />
    )
    expect(getByText(/Login to world of digital banking/)).toBeInTheDocument()
    expect(getAllByRole('textbox')).toHaveLength(1)
    expect(getByLabelText('Customer Id *')).toBeInTheDocument()
    expect(getByLabelText('Password *')).toBeInTheDocument()
  })

  it('TC:02 - should not call login function on if form is not valid when submitted', async () => {
    jest.spyOn(console, 'log')
    const { getByRole } = renderWithRouter(<Login />)
    const submitButton = getByRole('button', { name: 'login' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(console.log).not.toHaveBeenCalled()
    })
  })

  it('TC:03 - should call login function on if form is valid when submitted', async () => {
    jest.spyOn(console, 'log')
    const { getByRole, getByLabelText } = renderWithRouter(<Login />)
    const customerIdBox = getByLabelText('Customer Id *')
    const passwordBox = getByLabelText('Password *')

    fireEvent.change(customerIdBox, { target: { value: 'user123' } })
    fireEvent.change(passwordBox, { target: { value: 'pass123' } })

    const submitButton = getByRole('button', { name: 'login' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(console.log).toHaveBeenCalled()
    })
  })
})
