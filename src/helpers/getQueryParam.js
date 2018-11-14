const getQueryParam = (param) => {
  if (typeof (window) !== 'undefined') {
    const query = window.location.search.substring(1)
    const windowParams = query.split('&')
    for (let i = 0; i < windowParams.length; i++) {
      var pair = windowParams[i].split('=')
      if (pair[0] === param) { return pair[1] }
    }
  }
  return undefined
}

export default getQueryParam
