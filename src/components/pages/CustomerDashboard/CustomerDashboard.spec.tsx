import React from 'react'
import { renderWithRouter } from '../../../utils/test-utils'
import CustomerDashboard from './CustomerDashboard'

describe('TS:1 - CustomerDashboard component', () => {
  it('TC:01 - should render CustomerDashboard Component successfully', () => {
    const { getByText, getAllByRole, getByLabelText } = renderWithRouter(
      <CustomerDashboard />
    )

    expect(getByText(/Let's get started/)).toBeInTheDocument()
    expect(getAllByRole('textbox')).toHaveLength(3)
    expect(getByLabelText('Your Full Name *')).toBeInTheDocument()
    expect(getByLabelText('Mobile number *')).toBeInTheDocument()
    expect(getByLabelText('Email *')).toBeInTheDocument()
  })
})
