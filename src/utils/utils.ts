export function parse(JSONstr: string) {
  return JSON.parse(JSONstr)
}

export function uniqueRid() {
  return Math.floor(Math.random() * 10e12)
}

export function validateRid(rid: number) {
  return (data: { [key: string]: any; rid: number }) => {
    if (data.rid !== rid) {
      throw new Error('RequestID mismatch')
    }
    return data
  }
}

export function errorParser(err: any) {
  if (err) {
    if (err.response) {
      if (err.response.data) {
        if (err.response.data.type) {
          return Promise.reject(new Error(err.response.data.type))
        }
        return Promise.reject(new Error(err.response.data))
      }
      return Promise.reject(new Error(err.response))
    }
    return Promise.reject(err)
  }
  return Promise.reject(new Error('Unkown error'))
}
