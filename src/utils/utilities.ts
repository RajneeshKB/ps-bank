export const getItemFromSession = (key: string) => {
  try {
    const sessionData = sessionStorage.getItem(key)
    if (sessionData) {
      return JSON.parse(sessionData)
    }
    return null
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('parsing error', e)
  }
  return null
}
