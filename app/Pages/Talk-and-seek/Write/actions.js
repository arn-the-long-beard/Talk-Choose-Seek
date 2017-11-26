import * as types from './actionTypes'
import Api from './api'

export const updatePIFailed = (json) => {
  return {
    type: types.UPDATE_FAILED,
    err: json.err,
    message: json.message
  }
}
export const updatePIRequest = () => {
  return {
    type: types.UPDATE_REQUEST
  }
}
export const updatePISuccess = (json) => {
  return {
    type: types.UPDATE_SUCCESS,
    personalInformation: json.personalInformation,
    message: json.message
  }
}

export function update () {
  return function (dispatch, getState) {
    const {content} = getState().talkAndChooseAndSeek.write
    dispatch(updatePIRequest())
    return Api.save(content).then(response => {
      if (response.success) {
        dispatch(updatePISuccess(response))
      } else {
        dispatch(updatePIFailed(response))
      }
    }).catch(error => {
      dispatch(updatePIFailed(error.response.body))
    })
  }
}
export const write = (text, field) => {
  return {
    type: types.IS_WRITING,
    text,
    field
  }
}
export const choose = (search) => {
  return {
    type: types.IS_CHOOSING,
    search
  }
}

export const invalidate = () => {
  return {
    type: types.INVALIDATE
  }
}
