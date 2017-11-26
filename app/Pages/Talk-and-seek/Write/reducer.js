import * as types from './actionTypes'

export default function writeReducer (state = {isRequesting: false, didInvalidate: true, api: ''}, action) {
  switch (action.type) {
    case types.UPDATE_REQUEST:
      return {...state,
        isRequesting: true,
        done: false,
        didInvalidate: false
      }
    case types.UPDATE_FAILED:
      return {...state,
        isRequesting: false,
        err: action.err,
        done: false,
        message: action.message,
        didInvalidate: false
      }
    case types.UPDATE_SUCCESS:
      return {...state,
        isRequesting: false,
        logged: false,
        done: true,
        message: action.message,
        items: action.personalInformation,
        didInvalidate: false
      }
    case types.IS_WRITING:
      return {...state,
        done: false,
        content: update(action, state.content),
        isEditing: true
      }
    case types.IS_CHOOSING:
      return {...state,
        done: false,
        api: action.search,
        isEditing: true
      }
    case types.INVALIDATE:
      return {...state,
        didInvalidate: true,
        api: '',
        isEditing: false
      }
    default:
      return state
  }
}

const update = (action, content) => {
  content[action.field] = action.text
  return content
}
