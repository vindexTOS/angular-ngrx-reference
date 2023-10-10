import { createAction, props } from '@ngrx/store'
import { FormType } from './Form.State'
export const POST_BANNER = '[banner post]post banner'
export const postbanner = createAction(POST_BANNER)

export const GET_FORM_DATA = '[banner data]get banner'
export const postbannertodb = createAction(
  GET_FORM_DATA,
  props<{ formData: FormType }>(),
)

export const FORM_SUCCSESS = '[form succsess]form succsess'
export const postbannersuccsess = createAction(
  FORM_SUCCSESS,
  props<{ succsess: string }>(),
)

export const FORM_ERROR = '[form error]form error'
export const postbannererror = createAction(
  FORM_ERROR,
  props<{ error: string }>(),
)
