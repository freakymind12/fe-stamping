export function formatThousandSeparator(value, separator = ',') {
  if (typeof value !== 'number' && typeof value !== 'string') return ''
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}

export function parseThousandSeparator(value, separator = ',') {
  const regex = new RegExp(`\\${separator}`, 'g')
  return value.replace(regex, '')
}
