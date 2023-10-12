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

export const GET_SINGLE_BANNER_ID = '[get single banner id]single id'
export const getsinglebannerId = createAction(
  GET_SINGLE_BANNER_ID,
  props<{ id: string }>(),
)
export const GET_SINGLE_BANNER_DATA = '[get single banner data]single data'
export const getsinglebannerdata = createAction(
  GET_SINGLE_BANNER_DATA,
  props<{ singleData: any }>(),
)

export const DELTE_BANNER = '[Delete Banner]delete'
export const deletebanner = createAction(DELTE_BANNER, props<{ id: string }>())

export const UPDATE_BANNER = '[Update Banner]update'
export const updatebanner = createAction(
  UPDATE_BANNER,
  props<{ updateData: any }>(),
)
