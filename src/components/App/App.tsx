import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { CssBaseline, ThemeProvider, Typography } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import CustomerDashboard from '../pages/CustomerDashboard/CustomerDashboard'
import { bankTheme } from '../../theme/psBankTheme'
import { BankContextProvider } from '../../context'
import { getBankGraphQlClient } from '../../graphql/client'
import { UnprotectedLayout } from '../organisms/UnprotectedLayout'
import { ProtectedLayout } from '../organisms/ProtectedLayout'
import { ErrorBoundary } from '../molecules/ErrorBoundary'
import { PageLoader } from '../atoms/PageLoader'
import { PayCards } from '../organisms/PayCards'
import { TransferMoney } from '../organisms/TransferMoney'
import { PAY_CARD_ROUTE, TRANSFER_MONEY_ROUTE } from '../../utils'

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
const LazyLoadedPayments = lazy(() => import('../pages/Payments/Payments'))

const queryClient = getBankGraphQlClient()

const App: React.FC = () => (
  <ErrorBoundary>
    <ApolloProvider client={queryClient}>
      <ThemeProvider theme={bankTheme}>
        <CssBaseline />
        <Router>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
            <BankContextProvider>
              <Routes>
                <Route element={<UnprotectedLayout />}>
                  <Route path="/" element={<CustomerDashboard />} />
                  <Route
                    path="/login"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <LazyLoadedLogin />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/registration"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <LazyLoadedRegistrationDetails />
                      </Suspense>
                    }
                  />
                  <Route
                    path="*"
                    element={<Typography>Not found</Typography>}
                  />
                </Route>
                <Route path="/ps-bank" element={<ProtectedLayout />}>
                  <Route
                    path="reset"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <LazyLoadedPasswordReset />
                      </Suspense>
                    }
                  />
                  <Route
                    path="account-dashboard"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <LazyLoadedAccountsDashboard />
                      </Suspense>
                    }
                  />
                  <Route
                    path="card-dashboard"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <LazyLoadedCardsDashboard />
                      </Suspense>
                    }
                  />
                  <Route
                    path="apply"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <LazyLoadedNewApplication />
                      </Suspense>
                    }
                  />
                  <Route
                    path="apply/new-saving"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <LazyLoadedNewSavingAccount />
                      </Suspense>
                    }
                  />
                  <Route
                    path="apply/new-card"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <LazyLoadedNewCard />
                      </Suspense>
                    }
                  />
                  <Route
                    path="account-dashboard/account-statement"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <LazyLoadedAccountStatement />
                      </Suspense>
                    }
                  />
                  <Route
                    path="payments"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <LazyLoadedPayments />
                      </Suspense>
                    }
                  >
                    <Route
                      path={TRANSFER_MONEY_ROUTE}
                      element={
                        <Suspense fallback={<PageLoader />}>
                          <TransferMoney />
                        </Suspense>
                      }
                    />
                    <Route
                      path={PAY_CARD_ROUTE}
                      element={
                        <Suspense fallback={<PageLoader />}>
                          <PayCards />
                        </Suspense>
                      }
                    />
                  </Route>
                  <Route
                    path="profile"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <div>Profile view here. Work in progress!</div>
                      </Suspense>
                    }
                  />
                </Route>
              </Routes>
            </BankContextProvider>
          </LocalizationProvider>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  </ErrorBoundary>
)

export default App
