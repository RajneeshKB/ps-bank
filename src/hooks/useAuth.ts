import { useBankContext } from '../context'
// import { setLoginData } from '../context/actions'

export const useAuth = () => {
  const {
    // dispatch,
    state: {
      loginData: { AccessToken },
    },
  } = useBankContext()

  if (AccessToken) {
    return { AccessToken }
  }

  const sessionAccessToken = sessionStorage.AccessToken
  const sessionCustomerData = sessionStorage.customerData
  if (sessionAccessToken && sessionCustomerData) {
    // dispatch(setLoginData(JSON.parse(sessionStorage.customerData)))
    return JSON.parse(sessionStorage.customerData)
  }

  return {}
}
