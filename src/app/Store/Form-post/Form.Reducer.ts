import { createReducer, on } from '@ngrx/store'
import { initialFormState } from './Form.State'
import { getformbanner } from './Form.Actions'

const _FormReducer = createReducer(
  initialFormState,
  on(getformbanner, (state, action) => {
    return { ...state, formData: action.formData }
  }),
)

export function FormReducer(state: any, action: any) {
  return _FormReducer(state, action)
}
