// const encodeReserveRE = /[!'()*]/g
// const encodeReserveReplacer = c => '%' + c.charCodeAt(0).toString(16)
// const commaRE = /%2C/g

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
// const encode = str =>
//   encodeURIComponent(str)
//     .replace(encodeReserveRE, encodeReserveReplacer)
//     .replace(commaRE, ',')

const decode = decodeURIComponent

export const parseQuery = (query) => {
  const res = {}

  query = query.trim().replace(/^(\?|#|&)/, '')

  if (!query) {
    return res
  }

  query.split('&').forEach(param => {
    const parts = param.replace(/\+/g, ' ').split('=')
    const key = decode(parts.shift())
    const val = parts.length > 0 ? decode(parts.join('=')) : null

    if (res[key] === undefined) {
      res[key] = val
    } else if (Array.isArray(res[key])) {
      res[key].push(val)
    } else {
      res[key] = [res[key], val]
    }
  })

  return res
}
