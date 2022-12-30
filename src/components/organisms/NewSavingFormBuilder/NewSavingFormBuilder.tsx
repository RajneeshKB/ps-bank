import React, { FC, useEffect } from 'react'
import { Controller } from 'react-hook-form'
import {
  Box,
  Button,
  CardActions,
  Divider,
  FormControl,
  FormHelperText,
  Stack,
  Typography,
} from '@mui/material'
import { FormMetaData, NEW_SAVING_ACCOUNT_OPEN_STEP } from '../../../utils'
import { FormControlSelector } from '../../atoms/FormControlSelector'
import { newSavingFormBuilderStyles } from './styles'

interface INewSavingFormBuilderProps {
  formControls: { [key: string]: FormMetaData[] }
  controlValues?: any
  controlHook: any
  activeStep: number
  submitHandler: () => {}
  secondaryButtonHandler: () => void
}

const NewSavingFormBuilder: FC<INewSavingFormBuilderProps> = ({
  formControls,
  controlValues,
  controlHook,
  activeStep,
  submitHandler,
  secondaryButtonHandler,
}) => {
  useEffect(() => {
    sessionStorage.activeStep = activeStep
  }, [activeStep])

  return (
    <form onSubmit={submitHandler} noValidate>
      <Stack spacing={4}>
        <Box sx={newSavingFormBuilderStyles.stepTitle}>
          <Typography variant="h3">
            {NEW_SAVING_ACCOUNT_OPEN_STEP[activeStep]}
          </Typography>
        </Box>
        {Object.values(formControls)?.map((section) => {
          return (
            <React.Fragment key={`group_${section[0].id}`}>
              <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                rowGap="1.5rem"
                justifyContent="space-between"
              >
                {section.map((cardControl) => (
                  <Controller
                    key={cardControl.id}
                    control={controlHook}
                    name={cardControl.name}
                    rules={cardControl.validation}
                    render={({ field, fieldState }) => {
                      const { error } = fieldState
                      return (
                        <FormControl
                          variant="standard"
                          sx={{
                            width: !cardControl.halfWidth ? '100%' : '47%',
                          }}
                        >
                          <FormControlSelector
                            controlData={cardControl}
                            controlHandler={field}
                            controlState={fieldState}
                            controlValues={controlValues[cardControl.id]}
                          />
                          {error?.message && (
                            <FormHelperText error>
                              {error.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                      )
                    }}
                  />
                ))}
              </Box>
              <Divider
                variant="fullWidth"
                sx={newSavingFormBuilderStyles.stepDivider}
              />
            </React.Fragment>
          )
        })}
        <CardActions
          sx={{
            padding: '0',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {activeStep !== 0 && (
            <Button
              type="button"
              variant="outlined"
              disableElevation
              onClick={secondaryButtonHandler}
            >
              Back
            </Button>
          )}
          <Button type="submit" variant="contained" disableElevation>
            {NEW_SAVING_ACCOUNT_OPEN_STEP.length - 1 === activeStep
              ? 'Finish'
              : 'Continue'}
          </Button>
        </CardActions>
      </Stack>
    </form>
  )
}

NewSavingFormBuilder.defaultProps = {
  controlValues: {},
}

export default NewSavingFormBuilder
