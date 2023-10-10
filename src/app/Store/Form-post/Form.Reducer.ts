import { createReducer, on } from '@ngrx/store'
import { initialFormState } from './Form.State'
import {
  postbannererror,
  postbannersuccsess,
  postbannertodb,
} from './Form.Actions'

const _FormReducer = createReducer(
  initialFormState,
  on(postbannertodb, (state, action) => {
    return { ...state, formData: action.formData }
  }),
  on(postbannersuccsess, (state, action) => {
    return { ...state, succsess: action.succsess }
  }),
  on(postbannererror, (state, action) => {
    return { ...state, error: action.error }
  }),
)

export function FormReducer(state: any, action: any) {
  return _FormReducer(state, action)
}
