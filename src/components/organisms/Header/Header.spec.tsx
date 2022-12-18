import React from 'react'
import { renderWithRouter } from '../../../utils/test-utils'
import { Header } from '.'

describe('TS:1 - Header component', () => {
  it('TC:01 - should render Header Component successfully', () => {
    const { getByRole } = renderWithRouter(<Header />)
    expect(getByRole('link', { name: 'PS Bank' })).toBeDefined()
    expect(getByRole('link', { name: 'Login' })).toBeDefined()
  })
})
