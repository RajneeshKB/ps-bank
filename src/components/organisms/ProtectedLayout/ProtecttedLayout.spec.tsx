/* eslint-disable no-console */
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
    jest.spyOn(customHooks, 'useAuth').mockReturnValue(true)
    const { getByText } = renderWithRouter(<ProtectedLayout />)
    expect(
      getByText(/This is a sample application for learning purpose./)
    ).toBeInTheDocument()
    expect(getByText(/Developed by: Rajneesh Barnwal/)).toBeInTheDocument()
  })

  it('TC:01 - should navigate to root page if user is not authorized', () => {
    jest.spyOn(customHooks, 'useAuth').mockReturnValue(false)
    const { getByText } = renderWithRouter(<ProtectedLayout />)
    expect(getByText(/Mock navigate component/)).toBeInTheDocument()
  })
})
