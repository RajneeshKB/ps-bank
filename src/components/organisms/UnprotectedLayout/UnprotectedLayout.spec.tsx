import React from 'react'
import { renderWithRouter } from '../../../utils/test-utils'
import UnprotectedLayout from './UnprotectedLayout'

const mockData = { mockNavigate: jest.fn() }
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockData.mockNavigate,
  Navigate: () => <div>Mock navigate component</div>,
  useLocation: () => ({ pathname: '/ps-bank/reset' }),
}))

describe('TS:1 - UnprotectedLayout component', () => {
  it('TC:01 - should render UnprotectedLayout Component successfully', () => {
    const { getByText } = renderWithRouter(<UnprotectedLayout />)
    expect(
      getByText(/This is a sample application for learning purpose./)
    ).toBeInTheDocument()
    expect(getByText(/Developed by: Rajneesh Barnwal/)).toBeInTheDocument()
  })

  it('TC:02 - should navigate if user is authenticated', () => {
    const { getByText } = renderWithRouter(
      <UnprotectedLayout />,
      {},
      {
        bankConextValue: {
          loginData: {
            AccessToken: 'test',
            customerId: 'c123',
            isNewUser: false,
          },
        },
      }
    )
    expect(getByText(/Mock navigate component/)).toBeInTheDocument()
  })

  it('TC:02 - should navigate if user is authenticated for new users', () => {
    const { getByText } = renderWithRouter(
      <UnprotectedLayout />,
      {},
      {
        bankConextValue: {
          loginData: {
            AccessToken: 'test',
            customerId: 'c123',
            isNewUser: true,
          },
        },
      }
    )
    expect(getByText(/Mock navigate component/)).toBeInTheDocument()
  })
})
