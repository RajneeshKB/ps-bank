import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { CssBaseline, ThemeProvider, Typography } from '@mui/material'

import CustomerDashboard from '../pages/CustomerDashboard/CustomerDashboard'
import { bankTheme } from '../../theme/psBankTheme'
import { BankContextProvider } from '../../context'
import { getBankGraphQlClient } from '../../graphql/client'
import { UnprotectedLayout } from '../organisms/UnprotectedLayout'
import { ProtectedLayout } from '../organisms/ProtectedLayout'

const LazyLoadedRegistrationDetails = lazy(
  () => import('../pages/CustomerRegistartion/CustomerRegistration')
)
const LazyLoadedLogin = lazy(() => import('../pages/Login/Login'))
const LazyLoadedPasswordReset = lazy(
  () => import('../pages/PasswordReset/PasswordReset')
)

const queryClient = getBankGraphQlClient()

const App: React.FC = () => (
  <ApolloProvider client={queryClient}>
    <ThemeProvider theme={bankTheme}>
      <CssBaseline />
      <Router>
        <BankContextProvider>
          <Routes>
            <Route element={<UnprotectedLayout />}>
              <Route path="/" element={<CustomerDashboard />} />
              <Route
                path="/login"
                element={
                  <Suspense fallback={<div>Loading</div>}>
                    <LazyLoadedLogin />
                  </Suspense>
                }
              />
              <Route
                path="/registration"
                element={
                  <Suspense fallback={<div>Loading</div>}>
                    <LazyLoadedRegistrationDetails />
                  </Suspense>
                }
              />
              <Route path="*" element={<Typography>Not found</Typography>} />
            </Route>
            <Route path="/ps-bank" element={<ProtectedLayout />}>
              <Route
                path="reset"
                element={
                  <Suspense fallback={<div>Loading</div>}>
                    <LazyLoadedPasswordReset />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </BankContextProvider>
      </Router>
    </ThemeProvider>
  </ApolloProvider>
)

export default App
