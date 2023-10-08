import { createAction, props } from '@ngrx/store'

export const LOAD_LABEL_API = '[load label api]load label api'
export const labelactionapi = createAction(LOAD_LABEL_API)

export const LOAD_LABEL = '[load label]load label data'
export const labelaction = createAction(LOAD_LABEL, props<{ labelData: any }>())

export const LOAD_LABEL_ERROR = '[load label]load label data'
export const labelactionerror = createAction(
  LOAD_LABEL_ERROR,
  props<{ error: string }>(),
)
