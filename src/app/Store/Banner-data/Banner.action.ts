import { createAction, props } from '@ngrx/store'
import { BannerData, keyType } from './Banner.State'
export const GET_DATA = '[Get banner data]data'
export const getdata = createAction(GET_DATA)

export const GET_QUERY = '[Get query]query'
export const getquery = createAction(
  GET_QUERY,
  props<{ key: string; value: any }>(),
)

export const GET_QUERY_DATA = '[Get banner query data]query'
export const getquerydata = createAction(GET_QUERY_DATA, props<{ data: any }>())
