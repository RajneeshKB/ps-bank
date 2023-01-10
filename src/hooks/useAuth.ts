import { useBankContext } from '../context'
import { getItemFromSession } from '../utils'

export const useAuth = () => {
  const {
    state: { loginData },
  } = useBankContext()

  if (loginData?.AccessToken) {
    return { ...loginData, validContext: true }
  }

  const sessionAccessToken = sessionStorage.AccessToken
  const sessionCustomerData = getItemFromSession('customerData')
  if (sessionAccessToken && sessionCustomerData?.AccessToken) {
    return { ...sessionCustomerData, validContext: false }
  }

  return {}
}
