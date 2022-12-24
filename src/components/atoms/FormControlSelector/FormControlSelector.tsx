import React, { FC } from 'react'
import {
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material'
import { FormMetaData, ControlValues } from '../../../utils'

interface IFormControlSelectorProps {
  controlData: FormMetaData
  controlHandler: any
  controlState: any
  controlValues?: any
}

const FormControlSelector: FC<IFormControlSelectorProps> = ({
  controlData,
  controlHandler,
  controlState,
  controlValues,
}) => {
  const { id, name, label, type, subCategory, required, disabled } = controlData
  const { onChange, value } = controlHandler
  const { error } = controlState
  switch (controlData.type) {
    case 'text':
      return (
        <TextField
          id={id}
          label={label}
          required={required}
          onChange={onChange}
          value={value}
          error={!!error?.message}
          type={subCategory || type}
          variant="standard"
          disabled={disabled}
        />
      )

    case 'select':
      return (
        <>
          <InputLabel
            id={`${id}_label`}
            required={required}
            error={!!error?.message}
          >
            {label}
          </InputLabel>
          <Select
            labelId={`${id}_label`}
            id={id}
            value={value}
            label={label}
            onChange={onChange}
            error={!!error?.message}
            disabled={disabled}
          >
            {controlValues.map(
              ({ id: _id, label: _label, value: _value }: ControlValues) => (
                <MenuItem key={_id} value={_value}>
                  {_label}
                </MenuItem>
              )
            )}
          </Select>
        </>
      )

    case 'radioGroup':
      return (
        <>
          <FormLabel
            id={`${id}_label`}
            required={required}
            error={!!error?.message}
          >
            {label}
          </FormLabel>
          <RadioGroup
            id={id}
            aria-labelledby={`${id}_label`}
            value={value}
            onChange={onChange}
            name={name}
          >
            {controlValues.map(
              ({ id: _id, label: _label, value: _value }: ControlValues) => (
                <FormControlLabel
                  key={_id}
                  value={_value}
                  control={<Radio />}
                  label={_label}
                />
              )
            )}
          </RadioGroup>
        </>
      )

    default:
      return null
  }
}

FormControlSelector.defaultProps = {
  controlValues: [],
}

export default FormControlSelector
