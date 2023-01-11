import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react'
import { renderWithRouter } from '../../utils/test-utils'
import * as customHooks from '../../hooks/useAuth'
import { App } from '.'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }: any) => <div>{children}</div>,
}))

describe('TS:1 - Bank app component unprotected routes', () => {
  it('TC:01 - should render app successfully with home route', () => {
    const { getByText, getAllByRole, getByLabelText } = renderWithRouter(
      <App />
    )

    expect(getAllByRole('heading', { name: 'PS Bank' })).toHaveLength(2)
    expect(getAllByRole('link')).toHaveLength(3)
    expect(getByLabelText('Your Full Name *')).toBeInTheDocument()
    expect(getByLabelText('Mobile number *')).toBeInTheDocument()
    expect(getByLabelText('Email *')).toBeInTheDocument()
    expect(getByText(/Developed by: Rajneesh Barnwal/)).toBeInTheDocument()
  })

  it('TC:02 - should redirect to user detailed registration page on basic data filled and submitted', async () => {
    const { getByRole, getByLabelText, queryByText } = renderWithRouter(<App />)

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
        queryByText(
          /Just one more step to get started with your digital banking account/
        )
      ).toBeInTheDocument()
    })
  })

  it('TC:03 - should load login component successfully', async () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />, {
      route: '/login',
    })

    await waitFor(() => {
      expect(getByText(/Login to world of digital banking/)).toBeInTheDocument()
      expect(getByLabelText('Customer Id *')).toBeInTheDocument()
      expect(getByLabelText('Password *')).toBeInTheDocument()
    })
  })
})

describe('TS:2 - Bank app component protected routes', () => {
  const bankContextValueMock = {
    bankConextValue: {
      loginData: {
        customerId: 'PS_12345',
        customerName: 'Test User',
        AccessToken: 'testToken',
        isNewUser: true,
      },
    },
  }
  beforeEach(() => {
    jest.spyOn(customHooks, 'useAuth').mockReturnValue({
      validContext: true,
      AccessToken: 'testToken',
      customerId: 'test123',
      customerName: 'Test User',
      isNewUser: true,
    })
  })
  xit('TC:01 - should load password reset component successfully', async () => {
    const { queryByText } = renderWithRouter(
      <App />,
      {
        route: '/ps-bank/reset',
      },
      bankContextValueMock
    )

    await waitFor(() => {
      expect(queryByText(/Reset your password/)).toBeInTheDocument()
    })
  })

  it('TC:02 - should load account dashboard component successfully', async () => {
    const { queryByText } = renderWithRouter(
      <App />,
      {
        route: '/ps-bank/account-dashboard',
      },
      bankContextValueMock
    )

    await waitFor(() => {
      expect(queryByText(/Loading.../)).toBeInTheDocument()
    })
  })

  it('TC:03 - should load new application component successfully', async () => {
    const { queryByText } = renderWithRouter(
      <App />,
      {
        route: '/ps-bank/apply',
      },
      bankContextValueMock
    )

    await waitFor(() => {
      expect(
        queryByText(
          /Get started by opening a Saving bank account with us. You can also apply for a new credit card fro our various available options./
        )
      ).toBeInTheDocument()
    })
  })

  it('TC:04 - should load new savings component successfully', async () => {
    const { queryByText } = renderWithRouter(
      <App />,
      {
        route: '/ps-bank/new-saving',
      },
      bankContextValueMock
    )

    await waitFor(() => {
      expect(
        queryByText(/New Saving Account Opening Application/)
      ).toBeInTheDocument()
    })
  })

  xit('TC:05 - should load new card component successfully', async () => {
    const { queryByText } = renderWithRouter(
      <App />,
      {
        route: '/ps-bank/new-card',
      },
      bankContextValueMock
    )

    await waitFor(() => {
      expect(queryByText(/New Credit Card Application/)).toBeInTheDocument()
    })
  })

  it('TC:06 - should load cards component successfully', async () => {
    const { queryByText } = renderWithRouter(
      <App />,
      {
        route: '/ps-bank/card-dashboard',
      },
      bankContextValueMock
    )

    await waitFor(() => {
      expect(queryByText(/Loading.../)).toBeInTheDocument()
    })
  })

  xit('TC:07 - should load account statement component successfully', async () => {
    const { queryByText } = renderWithRouter(
      <App />,
      {
        route: '/ps-bank/account-statement',
      },
      bankContextValueMock
    )

    await waitFor(() => {
      expect(queryByText(/Loading.../)).toBeInTheDocument()
    })
  })
})
