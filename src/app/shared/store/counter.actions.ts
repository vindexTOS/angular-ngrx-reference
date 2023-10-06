import { createAction, props } from '@ngrx/store'

const increment = createAction('increament')
const decrement = createAction('decrement')
const reset = createAction('reset')
const customincrement = createAction(
  'customincrement',
  props<{ value: number; action: string }>(),
)
const changechannelname = createAction(
  'changechannelname',
  props<{ channelname: string }>(),
)
export { increment, decrement, reset, customincrement, changechannelname }
