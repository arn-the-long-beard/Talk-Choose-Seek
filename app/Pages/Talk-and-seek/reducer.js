import talk from './Talk/reducer'
import seek from './Seek/reducer'
import write from './Write/reducer'
import {combineReducers} from 'redux'
import * as types from './actionTypes'

function stepper (state = { stepIndex: 0, key: '', api: '', items: [], steps: [ {index: 0, valide: false}, {index: 1, valide: false}, {index: 2, valide: false}]}, action) {
  switch (action.type) {
    // case types.RENDER_MICROPHONE:
    //   return {...state,
    //     isReady: true
    //   }
    case types.NEXT_STEP:
      return {...state,
        stepIndex: state.stepIndex + 1
      }
    case types.PREV_STEP:
      return {...state,
        stepIndex: state.stepIndex - 1
      }

    case types.VALIDATE_KEY:
      return {...state,
        key: action.key,
        steps: update(state.steps, state.stepIndex, true)
      }
    case types.VALIDATE_API:
      return {...state,
        api: action.api,
        steps: update(state.steps, state.stepIndex, true)
      }
    case types.VALIDATE_RESULTS:
      return {...state,
        items: action.items
      }

    case types.INVALIDATE_API:
      return {...state,
        api: '',
        steps: update(state.steps, state.stepIndex, false)
      }
    case types.INVALIDATE_KEY:
      return {...state,
        key: '',
        steps: update(state.steps, state.stepIndex, false)
      }
    default:
      return state
  }
}

const update = (array, index, valid) => {
  return (array.map(item => {
    if (item.index !== index) {
      // This isn't the item we care about - keep it as-is
      return item
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      valide: valid
    }
  }))
}

const talkAndChooseAndSeek = combineReducers({
  talk, seek, write, stepper
})

export default talkAndChooseAndSeek
