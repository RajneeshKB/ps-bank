import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { App } from '.'

describe('TS:1 - Bank app component', () => {
  it('TC:01 - should render app successfully with home route', () => {
    const { getByText, getAllByRole, getByLabelText } = render(<App />)

    expect(getByText('PS Bank')).toBeInTheDocument()
    expect(getAllByRole('link')).toHaveLength(2)
    expect(getByLabelText('Your Full Name *')).toBeInTheDocument()
    expect(getByLabelText('Mobile number *')).toBeInTheDocument()
    expect(getByLabelText('Email *')).toBeInTheDocument()
    expect(getByText(/Developed by: Rajneesh Barnwal/)).toBeInTheDocument()
  })

  it('TC:02 - should redirect to user detailed registration page on basic data filled and submitted', async () => {
    const { getByRole, getByText, getByLabelText } = render(<App />)

    const nameBox = getByLabelText('Your Full Name *')
    const numberBox = getByLabelText('Mobile number *')
    const emailBox = getByLabelText('Email *')

    fireEvent.change(nameBox, { target: { value: 'Test name' } })
    fireEvent.change(numberBox, { target: { value: '7893452345' } })
    fireEvent.change(emailBox, { target: { value: 'test@test.com' } })

    const submitButton = getByRole('button', { name: 'Register' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(
        getByText(
          /Just one more step to get started with your digital banking account/
        )
      ).toBeInTheDocument()
    })
  })

  it('TC:03 - should load login component on login button click', async () => {
    const { getByText, getByRole, getByLabelText } = render(<App />)

    const loginButton = getByRole('link', { name: 'Login' })
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(getByText(/Login to world of digital banking/)).toBeInTheDocument()
      expect(getByLabelText('Customer Id *')).toBeInTheDocument()
      expect(getByLabelText('Password *')).toBeInTheDocument()
    })
  })
})
