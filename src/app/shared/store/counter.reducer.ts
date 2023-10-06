import {
  createFeatureSelector,
  createSelector,
  createReducer,
  on,
} from '@ngrx/store'
import {
  changechannelname,
  customincrement,
  decrement,
  increment,
  reset,
} from './counter.actions'
import { initialState } from './counter.state'

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return {
      ...state,
      counter: state.counter + 1,
    }
  }),
  on(decrement, (state) => {
    return {
      ...state,
      counter: state.counter - 1,
    }
  }),
  on(reset, (state) => ({
    ...state, // Create a shallow copy of the current state
    counter: initialState.counter, // Reset the 'counter' property to its initial value
  })), // Reset action should reset to the initial state
  on(customincrement, (state, action) => {
    return {
      ...state,
      counter:
        action.action === 'add'
          ? state.counter + action.value
          : state.counter - action.value,
    }
  }),
  on(changechannelname, (state, action) => {
    return {
      ...state,
      channelname: action.channelname,
    }
  }),
)
export function counterReducer(state: any, action: any) {
  return _counterReducer(state, action)
}

const selectCounterState = createFeatureSelector<any>('counter')
export const selectCounter = createSelector(
  selectCounterState,
  (state: any) => state.counter,
)
