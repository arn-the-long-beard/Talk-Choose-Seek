
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
  if (state.talkAndChooseAndSeek) {
    // console.log('-----hydrate state---------' + state.key + '---' + state.maxResult)
    // let talkAndChooseAndSeek = {seek: { didInvalidate: true, maxResults: state.maxResults, asked: {key: state.key, api: state.api}, items: [], isRequesting: false, preloaded: true }, stepper: {key: state.key, api: state.api}}

    let talkAndChooseAndSeek = {seek: { didInvalidate: true, maxResults: state.talkAndChooseAndSeek.seek.maxResults, asked: state.talkAndChooseAndSeek.seek.asked, items: [], isRequesting: false, preloaded: true }, stepper: state.talkAndChooseAndSeek.stepper}
    return {talkAndChooseAndSeek}
  } else return null
}
