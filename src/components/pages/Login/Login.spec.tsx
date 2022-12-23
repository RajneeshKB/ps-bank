/* eslint-disable no-console */
import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react'
import { renderWithRouter } from '../../../utils/test-utils'
import Login from './Login'
import { LOGIN_CUSTOMER } from '../../../graphql/queries'

const mockData = { mockNavigate: jest.fn() }
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockData.mockNavigate,
  Navigate: () => <div>Mock navigate component</div>,
}))
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

  it('TC:03 - should call login function on if form is valid when submitted and show error message if error occured from api', async () => {
    const { getByRole, getByLabelText, queryByText } = renderWithRouter(
      <Login />,
      {},
      {
        graphQlResponseMocks: [
          {
            request: {
              query: LOGIN_CUSTOMER,
              variables: {
                input: {
                  customerId: 'PS_12345',
                  pasword: 'invalidPass',
                },
              },
            },
            error: new Error('data mismatch'),
          },
        ],
      }
    )
    const customerIdBox = getByLabelText('Customer Id *')
    const passwordBox = getByLabelText('Password *')

    fireEvent.change(customerIdBox, { target: { value: 'PS_12345' } })
    fireEvent.change(passwordBox, { target: { value: 'invalidPass' } })

    const submitButton = getByRole('button', { name: 'login' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(
        queryByText(/Customer Id \/ Password is incorrect/)
      ).toBeInTheDocument()
    })
  })

  it('TC:04 - should navigate to password reset page if api call successful and context value is updated', async () => {
    const { getByText } = renderWithRouter(
      <Login />,
      {},
      {
        bankConextValue: {
          loginData: {
            customerId: 'PS_12345',
            customerName: 'Test User',
            AccessToken: 'newToken',
            isNewUser: true,
          },
        },
      }
    )

    await waitFor(() => {
      expect(getByText(/Mock navigate component/)).toBeInTheDocument()
    })
  })

  it('TC:05 - should display welcome message if api call successful and and is not new user', async () => {
    const { getByText } = renderWithRouter(
      <Login />,
      {},
      {
        bankConextValue: {
          loginData: {
            customerId: 'PS_12345',
            customerName: 'Test User',
            AccessToken: 'newToken',
            isNewUser: false,
          },
        },
      }
    )

    await waitFor(() => {
      expect(
        getByText(/Welcome customer PS_12345 Test User/)
      ).toBeInTheDocument()
    })
  })
})
