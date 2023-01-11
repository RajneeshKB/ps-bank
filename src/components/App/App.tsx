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
import { ErrorBoundary } from '../molecules/ErrorBoundary'

const LazyLoadedRegistrationDetails = lazy(
  () => import('../pages/CustomerRegistartion/CustomerRegistration')
)
const LazyLoadedLogin = lazy(() => import('../pages/Login/Login'))
const LazyLoadedPasswordReset = lazy(
  () => import('../pages/PasswordReset/PasswordReset')
)
const LazyLoadedAccountsDashboard = lazy(
  () => import('../pages/AccountsDashboard/AccountsDashboard')
)
const LazyLoadedCardsDashboard = lazy(
  () => import('../pages/CardsDashboard/CardsDashboard')
)
const LazyLoadedNewApplication = lazy(
  () => import('../pages/NewApplication/NewApplication')
)
const LazyLoadedNewSavingAccount = lazy(
  () => import('../pages/NewSavingAccount/NewSavingAccount')
)
const LazyLoadedNewCard = lazy(
  () => import('../pages/NewCreditCard/NewCreditCard')
)
const LazyLoadedAccountStatement = lazy(
  () => import('../pages/AccountStatement/AccountStatement')
)

const queryClient = getBankGraphQlClient()

const App: React.FC = () => (
  <ErrorBoundary>
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
                <Route
                  path="account-dashboard"
                  element={
                    <Suspense fallback={<div>Loading</div>}>
                      <LazyLoadedAccountsDashboard />
                    </Suspense>
                  }
                />
                <Route
                  path="card-dashboard"
                  element={
                    <Suspense fallback={<div>Loading</div>}>
                      <LazyLoadedCardsDashboard />
                    </Suspense>
                  }
                />
                <Route
                  path="apply"
                  element={
                    <Suspense fallback={<div>Loading</div>}>
                      <LazyLoadedNewApplication />
                    </Suspense>
                  }
                />
                <Route
                  path="new-saving"
                  element={
                    <Suspense fallback={<div>Loading</div>}>
                      <LazyLoadedNewSavingAccount />
                    </Suspense>
                  }
                />
                <Route
                  path="new-card"
                  element={
                    <Suspense fallback={<div>Loading</div>}>
                      <LazyLoadedNewCard />
                    </Suspense>
                  }
                />
                <Route
                  path="account-statement"
                  element={
                    <Suspense fallback={<div>Loading</div>}>
                      <LazyLoadedAccountStatement />
                    </Suspense>
                  }
                />
                <Route
                  path="profile"
                  element={
                    <Suspense fallback={<div>Loading</div>}>
                      <div>Profile view here. Work in progress!</div>
                    </Suspense>
                  }
                />
              </Route>
            </Routes>
          </BankContextProvider>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  </ErrorBoundary>
)

export default App
