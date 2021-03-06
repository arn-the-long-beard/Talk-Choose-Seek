import * as types from './actionTypes'
import Api from './api'
import StateSaver from '../../../store/stateSaver'
import ServerAddress from '../../../Server/ServerAddress'
export const askFailed = (data, json) => {
  return {
    type: types.ASK_FAILED,
    data,
    err: json.err,
    receivedAt: Date.now(),
    message: json.message
  }
}
export const askRequest = () => {
  return {
    type: types.ASK_REQUEST

  }
}
export const askSuccess = (asked, json) => {
  return {
    type: types.ASK_SUCCESS,
    items: json.items,
    contentType: json.type,
    message: json.message,
    receivedAt: Date.now(),
    asked
  }
}
// export const askSuccessPage = (asked, json) => {
//   return {
//     type: types.ASK_SUCCESS_PAGE,
//     items: json.items,
//     contentType:json.type,
//     message: json.message,
//     receivedAt: Date.now(),
//     asked
//   }
// }
export const NeedAskAsyncRequest = promise => {
  return {
    type: types.ASK_AWAIT,
    promise: promise
  }
}

export const checkIfNeedAskAsync = (key, api) => {
  return function (dispatch, getState) {
    if (shouldAsk(key, api, getState())) {
      ServerAddress.saveIp(getState().host.server)
      const {maxResults} = getState().talkAndChooseAndSeek.seek
      dispatch(NeedAskAsyncRequest(Api.seek(key, maxResults, api).then(response => {
        if (response.success) {
          dispatch(askSuccess({key, maxResults, api}, response))
          // switch (response.type) {
          //   case 'json':
          //     dispatch(askSuccess({key, maxResults, api}, response))
          //     break
          //   case 'html':
          //     dispatch(askSuccessPage({key, maxResults, api}, response))
          //     break
          //   default:
          //     dispatch(askSuccess({key, maxResults, api}, response))
          // }
        } else {
          dispatch(askFailed({info: {key, maxResults, api}}, response))
        }
      }).catch(error => {
        dispatch(askFailed({info: {key, maxResults, api}}, error.response.body))
      })))
    }
  }
}
export const ask = (key, api) => {
  return (dispatch, getState) => {
    const {maxResults} = getState().talkAndChooseAndSeek.seek
    const {talkAndChooseAndSeek} = getState()
    // Todo need to protected cookies
    ServerAddress.saveIp(getState().host.server)
    dispatch(askRequest(key))
    return Api.seek(key, maxResults, api).then(response => {
      if (response.success) {
        dispatch(askSuccess({key, maxResults, api}, response))
        // switch (response.type) {
        //   case 'json':
        //     dispatch(askSuccess({key, maxResults, api}, response))
        //     break
        //   case 'html':
        //     dispatch(askSuccessPage({key, maxResults, api}, response))
        //     break
        //   default:
        //     dispatch(askSuccess({key, maxResults, api}, response))
        // }
        StateSaver.saveState({talkAndChooseAndSeek})
      } else {
        dispatch(askFailed(response))
      }
    }).catch(error => {
      dispatch(askFailed(key, error.response.body))
    })
  }
}

const shouldAsk = (key, api, state) => {
  const {seek} = state.talkAndChooseAndSeek
  if (key !== '' && api !== '' && seek.didInvalidate && !seek.isRequesting && !seek.errors) {
    return true
  } else if ((key !== seek.asked.key || api !== seek.asked.api) && !seek.isRequesting && !seek.errors) {
    return true
  } else {
    return seek.didInvalidate
  }
}
export const checkIfNeedToAsk = (key, api) => {
  return (dispatch, getState) => {
    if (shouldAsk(key, api, getState())) {
      return dispatch(ask(key, api))
    }
  }
}
export const update = (value) => {
  return {
    type: types.UPDATE_MAX_RESULTS,
    maxResults: Number(value)
  }
}
export const updateMaxResults = (value) => {
  return (dispatch, geState) => {
    const {talkAndChooseAndSeek} = geState()
    StateSaver.saveState({talkAndChooseAndSeek})
    return dispatch(update(value))
  }
}
// const save = () => {
//   return (dispatch, geState) => {
//     const {talkAndChooseAndSeek} = geState()
//     StateSaver.saveState({talkAndChooseAndSeek})
//   }
// }

function invalidateTotal () {
  return {
    type: types.INVALIDATE
  }
}

export const invalidate = () => {
  return (dispatch) => {
    return dispatch(invalidateTotal())
  }
}
