/* eslint-disable no-console */
import { fireEvent, waitFor, within } from '@testing-library/react'
import React from 'react'
import { renderWithRouter } from '../../../utils/test-utils'
import CustomerRegistration from './CustomerRegistration'

const mockData = { mockNavigate: jest.fn() }
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockData.mockNavigate,
  Navigate: () => <div>Mock navigate component</div>,
}))

describe('TS:1 - CustomerRegistration component', () => {
  it('TC:01 - should render mock navigate component if customer basic details is not available in context', () => {
    const { getByText, queryByText } = renderWithRouter(
      <CustomerRegistration />
    )
    expect(
      queryByText(
        /Just one more step to get started with your digital banking account/
      )
    ).not.toBeInTheDocument()
    expect(getByText('Mock navigate component')).toBeInTheDocument()
  })

  it('TC:02 - should render CustomerRegistration component successfully if valid data available in context', () => {
    const { getByText, getAllByRole } = renderWithRouter(
      <CustomerRegistration />,
      {},
      {
        bankConextValue: {
          registrationData: {
            customerName: 'Test name',
            customerEmail: 'test@test.com',
            customerMob: '7894567345',
          },
        },
      }
    )
    expect(
      getByText(
        /Just one more step to get started with your digital banking account/
      )
    ).toBeInTheDocument()
    expect(getAllByRole('textbox')).toHaveLength(6)
    expect(getAllByRole('button')).toHaveLength(3)
    expect(getAllByRole('radiogroup')).toHaveLength(1)
    expect(getAllByRole('radio')).toHaveLength(4)
  })

  it('TC:03 - should render success modal on registration success and call mocked useNavigate on modal close', async () => {
    const {
      getByLabelText,
      getByRole,
      getAllByRole,
      queryByText,
      queryByRole,
    } = renderWithRouter(
      <CustomerRegistration />,
      {},
      {
        bankConextValue: {
          registrationData: {
            customerName: 'Test name',
            customerEmail: 'test@test.com',
            customerMob: '7894567345',
          },
        },
      }
    )

    const occupationBox = getByLabelText('Occupation *')
    const incomeBox = getAllByRole('radio')[1]
    const panBox = getByLabelText('PAN number *')
    const aadharBox = getByLabelText('Aadhar number *')
    const addressBox = getByLabelText('Address line 1 *')
    const stateBox = getByLabelText('State *')
    const cityBox = getByLabelText('City *')
    const countryBox = getByLabelText('Country *')

    // Select option from occupation dropdown
    fireEvent.mouseDown(occupationBox)
    const occupationOptions = within(getByRole('listbox'))
    fireEvent.click(occupationOptions.getByText(/salaried/i))
    // Select income radio option
    fireEvent.click(incomeBox)
    fireEvent.change(panBox, { target: { value: 'BRSGF1472D' } })
    fireEvent.change(aadharBox, { target: { value: '6537238569157654' } })
    fireEvent.change(addressBox, { target: { value: 'test apartment flat 2' } })
    fireEvent.change(stateBox, { target: { value: 'Delhi' } })
    fireEvent.change(cityBox, { target: { value: 'Delhi' } })
    // Select option from country dropdown
    fireEvent.mouseDown(countryBox)
    const countryOptions = within(getByRole('listbox'))
    fireEvent.click(countryOptions.getByText(/India/i))

    const submitButton = getByRole('button', { name: 'Submit' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(queryByText(/You're all set/)).toBeInTheDocument()
      expect(queryByText(/Happy banking!/)).toBeInTheDocument()
      expect(queryByRole('button', { name: 'Close' })).toBeDefined()
    })

    const modalCloseButton = getByRole('button', { name: 'Close' })
    fireEvent.click(modalCloseButton)

    await waitFor(() => {
      expect(queryByText(/You're all set/)).not.toBeInTheDocument()
      expect(mockData.mockNavigate).toHaveBeenCalled()
    })
  })
})
