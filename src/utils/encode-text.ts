const jsEntityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&grave;',
  '=': '&#x3D;'
}

const quotesEntityMap = {
  '"': '&quot;',
}


export const escapeUsingEntityMap = (text: string, entityMap: Record<string, string>) => {
  return text.split('').map(char => entityMap[char] ?? char).join('')
}

export const escapeText = (text: string) => {
  return escapeUsingEntityMap(text, jsEntityMap)
}

export const escapeQuotes = (text: string) => {
  return escapeUsingEntityMap(text, quotesEntityMap)
}
