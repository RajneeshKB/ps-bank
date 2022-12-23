import React from 'react'
import { render } from '@testing-library/react'
import { Footer } from '.'

describe('TS:1 - Bank app component', () => {
  it('TC:01 - should render Footer Component successfully', () => {
    const { getByText, getAllByRole } = render(<Footer />)
    expect(getAllByRole('heading')).toHaveLength(2)
    expect(
      getByText(/This is a sample application for learning purpose./)
    ).toBeInTheDocument()
    expect(getByText(/Developed by: Rajneesh Barnwal/)).toBeInTheDocument()
  })
})
