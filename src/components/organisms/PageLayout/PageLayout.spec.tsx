import React from 'react'
import { renderWithRouter } from '../../../utils/test-utils'
import { PageLayout } from '.'

describe('TS:1 - PageLayout component', () => {
  it('TC:01 - should render PageLayout Component successfully with header and footer', () => {
    const { getByText, getByRole } = renderWithRouter(
      <PageLayout>
        <div>Testing page layout</div>
      </PageLayout>
    )
    expect(getByRole('link', { name: 'PS Bank' })).toBeDefined()
    expect(getByRole('link', { name: 'Login' })).toBeDefined()
    expect(getByText(/Testing page layout/)).toBeInTheDocument()
    expect(getByText(/Developed by: Rajneesh Barnwal/)).toBeInTheDocument()
  })
})
