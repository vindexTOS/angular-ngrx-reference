import { createReducer, on } from '@ngrx/store'
import { InitialRefrenceState } from './Refrence.State'
import {
  channelaction,
  channelactionerror,
  labelaction,
  labelactionerror,
  languageaction,
  languageactionerror,
  zoneaction,
  zoneactionerror,
} from './Refrence.Action'

const _RefrenceReducer = createReducer(
  InitialRefrenceState,
  // channels

  on(channelaction, (state, action) => {
    return { ...state, channels: action.channelData.data.entities }
  }),

  on(channelactionerror, (state, action) => {
    return { ...state, error: action.error }
  }),

  //  zone

  on(zoneaction, (state, action) => {
    // console.log(action)
    return { ...state, zones: action.zoneData.data.entities }
  }),
  on(zoneactionerror, (state, action) => {
    return { ...state, error: action.error }
  }),

  //  label
  on(labelaction, (state, action) => {
    // console.log(action)
    return {
      ...state,
      labels: action.labelData.data.entities,
    }
  }),
  on(labelactionerror, (state, action) => {
    return { ...state, error: action.error }
  }),
  //language

  on(languageaction, (state, action) => {
    return { ...state, languages: action.languageData.data.entities }
  }),
  on(languageactionerror, (state, action) => {
    return { ...state, error: action.error }
  }),
)

export function RefrenceReducer(state: any, action: any) {
  return _RefrenceReducer(state, action)
}
