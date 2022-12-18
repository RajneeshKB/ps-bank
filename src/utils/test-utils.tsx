import React, { FC, ReactElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, RenderOptions } from '@testing-library/react'
import { BankContextProvider } from '../context'
import { CombinedContextStateType } from '../context/reducers'

/** interface type for render option being received as prop from test file */
interface ExtendedRenderOption extends Omit<RenderOptions, 'wrapper'> {
  bankConextValue?: CombinedContextStateType
}
/**
 * This function is used to wrap component with all required providers available in application
 * @params ui : component to be wrapped
 * @params {} of type ExtendedRenderOption with values to set in store and context
 */
const renderWithProviders = (
  ui: ReactElement,
  { bankConextValue = undefined, ...renderOptions }: ExtendedRenderOption = {}
) => {
  /** compoent with all provider wrapped with received or default values */
  const AllTheProviders: FC<{
    children: React.ReactElement
  }> = ({ children }) => {
    return (
      <BankContextProvider initialStateValue={bankConextValue}>
        {children}
      </BankContextProvider>
    )
  }
  return {
    ...render(ui, {
      wrapper: AllTheProviders,
      ...renderOptions,
    }),
  }
}

/** utility function to wrap component with router and all providers */
const renderWithRouter = (
  ui: ReactElement,
  { route = '/' } = {},
  renderOptions: ExtendedRenderOption = {}
) => {
  return {
    ...renderWithProviders(
      <MemoryRouter initialEntries={[{ pathname: route }]}>{ui}</MemoryRouter>,
      renderOptions
    ),
  }
}

export { renderWithProviders }
export { renderWithRouter }
