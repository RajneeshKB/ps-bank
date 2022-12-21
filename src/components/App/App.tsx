import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CssBaseline, ThemeProvider, Typography } from '@mui/material'

import CustomerDashboard from '../pages/CustomerDashboard/CustomerDashboard'
import { PageLayout } from '../organisms/PageLayout'
import { bankTheme } from '../../theme/psBankTheme'
import { BankContextProvider } from '../../context'

const LazyLoadedRegistrationDetails = lazy(
  () => import('../pages/CustomerRegistartion/CustomerRegistration')
)
const LazyLoadedLogin = lazy(() => import('../pages/Login/Login'))

const queryClient = new QueryClient()

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
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
  </QueryClientProvider>
)

export default App
