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
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { FormMetaData, NEW_SAVING_ACCOUNT_OPEN_STEP } from '../../../utils'
import { FormControlSelector } from '../../atoms/FormControlSelector'
import { newEnrollmentFormBuilderStyles } from './styles'

interface INewEnrollmentFormBuilderProps {
  formControls: { [key: string]: FormMetaData[] }
  controlValues?: any
  controlHook: any
  activeStep?: number
  submitHandler: () => {}
  secondaryButtonHandler?: () => void
}

const NewEnrollmentFormBuilder: FC<INewEnrollmentFormBuilderProps> = ({
  formControls,
  controlValues,
  controlHook,
  activeStep = 0,
  submitHandler,
  secondaryButtonHandler,
}) => {
  useEffect(() => {
    sessionStorage.activeStep = activeStep
  }, [activeStep])
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <form onSubmit={submitHandler} noValidate>
      <Stack spacing={4}>
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
                            width: !isDesktop ? '100%' : '47%',
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
                sx={newEnrollmentFormBuilderStyles.stepDivider}
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

NewEnrollmentFormBuilder.defaultProps = {
  controlValues: {},
  activeStep: 0,
  secondaryButtonHandler: () => {},
}

export default NewEnrollmentFormBuilder
