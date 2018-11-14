const addParamToUrlQuery = (name, value) => {
  if (typeof (window) !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set(name, value)

    window.history.pushState({}, '', `?${urlParams.toString()}`)
  }
}

export default addParamToUrlQuery
