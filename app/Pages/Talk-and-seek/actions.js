import * as types from './actionTypes'
// import Api from './api'

export const next = () => {
  return {
    type: types.NEXT_STEP
  }
}
export const prev = () => {
  return {
    type: types.PREV_STEP
  }
}

export function nextStep () {
  return function (dispatch, getState) {
    const {stepIndex} = getState().talkAndChooseAndSeek.stepper
    if (stepIndex < 2) {
      dispatch(next())
    }
  }
}

// this.props.actions.startRecording()
// }
export function prevStep () {
  return function (dispatch, getState) {
    const {stepIndex} = getState().talkAndChooseAndSeek.stepper
    if (stepIndex > 0) {
      dispatch(prev())
    }
  }
}

export function chekStep (state) {
  const {stepper} = state.talkAndChooseAndSeek

  switch (stepper.stepIndex) {
    case 0:
      return stepper.key !== '' || stepper.key !== undefined
    case 1:
      return stepper.api !== '' || stepper.api !== undefined
    case 2:
      return stepper.items !== [] || stepper.items !== undefined
    default:
      return false
  }
}

const validateK = (key) => {
  return {
    type: types.VALIDATE_KEY,
    key
  }
}

export function ValidateKey (key) {
  return function (dispatch, getState) {
    dispatch(validateK(key))
    if (key !== '') {
      dispatch(nextStep())
    }
  }
}
const validateA = (api) => {
  return {
    type: types.VALIDATE_API,
    api
  }
}

export function ValidateApi (api) {
  return function (dispatch, getState) {
    dispatch(validateA(api))
    if (chekStep(getState())) {
      dispatch(nextStep())
    }
  }
}

const inValidateK = (key) => {
  return {
    type: types.INVALIDATE_KEY,
    key
  }
}

export function inValidateKey (key) {
  return function (dispatch, getState) {
    dispatch(inValidateK(key))
  }
}
const inValidateA = (api) => {
  return {
    type: types.INVALIDATE_API,
    api
  }
}

export function inValidateApi (api) {
  return function (dispatch, getState) {
    dispatch(inValidateA())
  }
}

const ValidateR = (items) => {
  return {
    type: types.VALIDATE_RESULTS,
    items
  }
}

export function ValidateResults (items) {
  return function (dispatch) {
    dispatch(ValidateR(items))
  }
}
