import React from 'react'
import { render } from '@testing-library/react'
import { Footer } from '.'

describe('TS:1 - Bank app component', () => {
  it('TC:01 - should render Footer Component successfully', () => {
    const { getByText, getByRole } = render(<Footer />)
    expect(getByRole('heading')).toBeDefined()
    expect(getByText(/Developed by: Rajneesh Barnwal/)).toBeInTheDocument()
  })
})
