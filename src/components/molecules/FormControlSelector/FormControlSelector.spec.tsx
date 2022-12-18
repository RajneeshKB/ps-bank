import React from 'react'
import { render } from '@testing-library/react'
import { FormControlSelector } from '.'

describe('TS:1 - FormControlSelector Component', () => {
  const mockControlHandler = {
    onchange: jest.fn(),
    value: 'test value',
  }
  const mockControlState = { error: { message: 'testing component error' } }
  const mockControlData = {
    id: 'test1',
    name: 'test',
    label: 'Test Text',
    subCategory: '',
    placeholder: '',
    required: true,
    validation: {},
  }
  const mockControlValue = [
    { id: 'data1', value: 'control data 1', label: 'control label 1' },
  ]

  it('TC:01 - should render nothing if no control type is matched with list', () => {
    const { container } = render(
      <FormControlSelector
        controlData={{ ...mockControlData, type: '' }}
        controlHandler={mockControlHandler}
        controlState={mockControlState}
      />
    )
    expect(container.hasChildNodes()).toBeFalsy()
  })

  it('TC:02 - should render text field, if type is text', () => {
    const { getByRole, getByLabelText } = render(
      <FormControlSelector
        controlData={{ ...mockControlData, type: 'text' }}
        controlHandler={mockControlHandler}
        controlState={mockControlState}
      />
    )
    expect(getByRole('textbox')).toBeInTheDocument()
    expect(getByLabelText('Test Text *')).toBeInTheDocument()
  })

  it('TC:03 - should render select box, if type is select', () => {
    const { getByRole, getByLabelText } = render(
      <FormControlSelector
        controlData={{ ...mockControlData, type: 'select' }}
        controlHandler={mockControlHandler}
        controlState={mockControlState}
        controlValues={mockControlValue}
      />
    )
    expect(getByRole('button')).toBeInTheDocument()
    expect(getByLabelText('Test Text *')).toBeInTheDocument()
  })

  it('TC:04 - should render radio group, if type is radioGroup', () => {
    const { getByRole, getAllByRole, getByLabelText } = render(
      <FormControlSelector
        controlData={{ ...mockControlData, type: 'radioGroup' }}
        controlHandler={mockControlHandler}
        controlState={mockControlState}
        controlValues={mockControlValue}
      />
    )
    expect(getByRole('radiogroup')).toBeInTheDocument()
    expect(getAllByRole('radio')).toHaveLength(1)
    expect(getByLabelText('Test Text *')).toBeInTheDocument()
  })
})
