import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CssBaseline, ThemeProvider, Typography } from '@mui/material'

import CustomerDashboard from '../pages/CustomerDashboard/CustomerDashboard'

import { bankTheme } from '../../theme/psBankTheme'
import { PageLayout } from '../organisms/PageLayout'
import { BankContextProvider } from '../../context'

const LazyLoadedRegistrationDetails = lazy(
  () => import('../pages/CustomerRegistartion/CustomerRegistration')
)
const LazyLoadedLogin = lazy(() => import('../pages/Login/Login'))

const App: React.FC = () => (
  <ThemeProvider theme={bankTheme}>
    <CssBaseline />
    <Router>
      <BankContextProvider>
        <PageLayout>
          <Routes>
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
          </Routes>
        </PageLayout>
      </BankContextProvider>
    </Router>
  </ThemeProvider>
)

export default App
