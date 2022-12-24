import React, { FC } from 'react'
import { Controller } from 'react-hook-form'
import {
  Button,
  CardActions,
  FormControl,
  FormHelperText,
  Stack,
} from '@mui/material'
import type { FormMetaData } from '../../../utils'
import { FormControlSelector } from '../../atoms/FormControlSelector'

interface IFormBuilderProps {
  formControls: FormMetaData[]
  controlValues?: any
  controlHook: any
  submitHandler: () => {}
  submitButtonLabel?: string
}

const FormBuilder: FC<IFormBuilderProps> = ({
  formControls,
  controlValues,
  controlHook,
  submitHandler,
  submitButtonLabel,
}) => (
  <form onSubmit={submitHandler} noValidate>
    <Stack spacing={4}>
      {formControls.map((cardControl) => (
        <Controller
          key={cardControl.id}
          control={controlHook}
          name={cardControl.name}
          rules={cardControl.validation}
          render={({ field, fieldState }) => {
            const { error } = fieldState
            return (
              <FormControl variant="standard">
                <FormControlSelector
                  controlData={cardControl}
                  controlHandler={field}
                  controlState={fieldState}
                  controlValues={controlValues[cardControl.id]}
                />
                {error?.message && (
                  <FormHelperText error>{error.message}</FormHelperText>
                )}
              </FormControl>
            )
          }}
        />
      ))}
      <CardActions sx={{ padding: '0' }}>
        <Button
          type="submit"
          variant="contained"
          disableElevation
          fullWidth
          size="large"
          sx={{ padding: '1rem 0' }}
        >
          {submitButtonLabel}
        </Button>
      </CardActions>
    </Stack>
  </form>
)

FormBuilder.defaultProps = {
  controlValues: {},
  submitButtonLabel: 'Submit',
}

export default FormBuilder
