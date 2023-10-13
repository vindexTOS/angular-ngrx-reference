import { createReducer, on } from '@ngrx/store'
import { BannerQueryState, BannerQueryTypes } from './Banner.State'
import {
  deletebanner,
  getquery,
  getquerydata,
  getsinglebannerdata,
  updatelocalobject,
} from './Banner.action'

const _BannerReducer = createReducer(
  BannerQueryState,
  on(getquery, (state, action) => {
    let newState = { ...state }
    if (action.key === 'all') {
      newState.queryParams = state.value
    } else {
      newState.queryParams[
        (action.key as unknown) as keyof typeof state.queryParams
      ] = action.value
    }

    return newState
  }),
  on(getquerydata, (state, action) => {
    return { ...state, data: action.data }
  }),
  on(getsinglebannerdata, (state, action) => {
    return { ...state, singleData: action.singleData }
  }),
  on(updatelocalobject, (state, action) => {
    return { ...state, localObj: action.localObj }
  }),
)

export function BannerReducer(state: any, action: any) {
  return _BannerReducer(state, action)
}
