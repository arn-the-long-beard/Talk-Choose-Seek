import * as types from './actionTypes'

export default function Seek (state = {items: [], asked: {}, maxResults: 10, isRequesting: false, errors: null, preloaded: false, didInvalidate: true}, action) {
  switch (action.type) {
    case types.ASK_FAILED:
      return {...state,
        isRequesting: false,
        isFetching: false,
        didInvalidate: false,
        errors: action.err,
        lastUpdated: action.receivedAt,
        items: [],
        preloaded: false,
        message: action.message
      }
    case types.ASK_REQUEST:
      return {...state,
        isRequesting: true,
        didInvalidate: false
      }
    case types.ASK_SUCCESS:
      return {...state,
        isRequesting: false,
        didInvalidate: false,
        items: action.items,
        errors: null,
        asked: action.asked,
        lastUpdated: action.receivedAt,
        isFetching: false,
        message: action.message,
        preloaded: false
      }
    case types.ASK_AWAIT:
      return {...state,
        isFetching: true,
        didInvalidate: false,
        promise: action.promise,
        preload: false
      }
    case types.UPDATE_MAX_RESULTS:
      return {...state,
        maxResults: action.maxResults,
        didInvalidate: true
      }

    case types.INVALIDATE:
      return {...state,
        didInvalidate: true
      }

    default:
      return state
  }
}
