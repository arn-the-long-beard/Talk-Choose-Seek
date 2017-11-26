import {combineReducers} from 'redux'

import talkAndChooseAndSeek from './Pages/Talk-and-seek/reducer'
import host from './Server/reducer'
const rootReducer = combineReducers({
  // short hand property names
//  utilData
  talkAndChooseAndSeek,
  host
})
export default rootReducer
