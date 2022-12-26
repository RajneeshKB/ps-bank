import React from 'react'
import { renderWithRouter } from '../../../utils/test-utils'
import * as customHooks from '../../../hooks/useAuth'
import ProtectedLayout from './ProtectedLayout'

const mockData = { mockNavigate: jest.fn() }
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockData.mockNavigate,
  Navigate: () => <div>Mock navigate component</div>,
}))
describe('TS:1 - ProtectedLayout component', () => {
  it('TC:01 - should render ProtectedLayout Component successfully', () => {
    jest.spyOn(customHooks, 'useAuth').mockReturnValue({
      validContext: true,
      AccessToken: 'testToken',
      customerId: 'test123',
      customerName: 'Test User',
      isNewUser: true,
    })
    const { getByText } = renderWithRouter(<ProtectedLayout />)
    expect(
      getByText(/This is a sample application for learning purpose./)
    ).toBeInTheDocument()
    expect(getByText(/Developed by: Rajneesh Barnwal/)).toBeInTheDocument()
  })

  it('TC:02 - should navigate to root page if user is not authorized', () => {
    jest.spyOn(customHooks, 'useAuth').mockReturnValue({})
    const { getByText } = renderWithRouter(<ProtectedLayout />)
    expect(getByText(/Mock navigate component/)).toBeInTheDocument()
  })

  xit('TC:03 - should render loading state while session data is updating local context state', () => {
    sessionStorage.setItem(
      'customerData',
      JSON.stringify({
        AccessToken: 'testToken',
        isNewUser: false,
        customerId: 'PS_12345',
        customerName: 'Test User',
      })
    )
    sessionStorage.setItem('AccessToken', 'testToken')

    jest.spyOn(customHooks, 'useAuth').mockReturnValue({
      validContext: false,
      AccessToken: 'testToken',
      customerId: 'test123',
      customerName: 'Test User',
      isNewUser: true,
    })
    const { getByText } = renderWithRouter(<ProtectedLayout />)
    expect(getByText(/Loading data, please wait!/)).toBeInTheDocument()
  })
})
