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

export const formatDisplayWithStar = (_data: string) => {
  const idx = _data.length - 4
  const result = _data.split('')
  result.splice(0, idx, '*'.repeat(idx)).join('')
  return result
}

export const getMaskedCardNumber = (_data: string) => {
  if (!_data) return ''
  const splittedData = _data.split('')
  splittedData.splice(0, 12, 'X'.repeat(12))
  return splittedData
    ?.join('')
    ?.match(/.{1,4}/g)
    ?.join('  ')
}
