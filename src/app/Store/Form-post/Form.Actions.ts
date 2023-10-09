import { createAction, props } from '@ngrx/store'
import { FormType } from './Form.State'
export const POST_BANNER = '[banner post]post banner'
export const postbanner = createAction(POST_BANNER)

export const GET_FORM_DATA = '[banner data]get banner'
export const postbannertodb = createAction(
  GET_FORM_DATA,
  props<{ formData: FormType }>(),
)
