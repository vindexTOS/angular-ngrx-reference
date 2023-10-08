import { createReducer, on } from '@ngrx/store'
import { InitialRefrenceState } from './Refrence.State'
import { labelaction, labelactionerror } from './Refrence.Action'

const _RefrenceReducer = createReducer(
  InitialRefrenceState,
  on(labelaction, (state, action) => {
    console.log(action.labelData, 'logg')
    return {
      ...state,
      labels: action.labelData.data.entities,
    }
  }),
  on(labelactionerror, (state, action) => {
    console.log(action.error, 'logg')
    return { ...state, error: action.error }
  }),
)

export function RefrenceReducer(state: any, action: any) {
  return _RefrenceReducer(state, action)
}
