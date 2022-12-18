import React from 'react'
import { render } from '@testing-library/react'
import { FailureModal } from '.'

describe('TS:1 - FailureModal Component', () => {
  it('TC:01 - should render failure modal successfully', () => {
    const { getByText, getByRole } = render(
      <FailureModal showModal onCloseClick={jest.fn()} />
    )
    expect(getByText(/Our system isn't cooperating./)).toBeInTheDocument()
    expect(
      getByText(
        /There is a problem on our end. It should'nt last long so please try again shortly./
      )
    ).toBeInTheDocument()

    expect(getByRole('button', { name: 'Close' })).toBeDefined()
  })
})
