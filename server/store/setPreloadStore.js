
// TODO Split later into different files and Improve
export const checkCookie = (req, next) => {
  try {
    let state = req.cookies['state']
    if (state) {
      console.log('the state cookie is in the req')
      return next(null, JSON.parse(state))
    } else {
      return next(null, null)
    }
  } catch (e) {
    console.error(e)
    return next(e, null)
  }
}
// maxResults: state.maxResults
export const preparePreload = (state) => {
  if (state.key && state.maxResults && state.api) {
    console.log('-----hydrate state---------' + state.key + '---' + state.maxResult)
    // let talkAndSeek = {state}
    return state
  } else return null
}
