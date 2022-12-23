import { useBankContext } from '../context'
import { setLoginData } from '../context/actions'

export const useAuth = () => {
  const {
    dispatch,
    state: {
      loginData: { AccessToken },
    },
  } = useBankContext()

  if (AccessToken) {
    return true
  }

  const sessionAccessToken = sessionStorage.AccessToken
  const sessionCustomerData = sessionStorage.customerData
  if (sessionAccessToken && sessionCustomerData) {
    dispatch(setLoginData(sessionStorage.customerData))
    return true
  }

  return false
}
