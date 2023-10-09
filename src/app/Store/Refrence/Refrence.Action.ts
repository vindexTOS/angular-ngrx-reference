import { createAction, props } from '@ngrx/store'
//  channesl

export const LOAD_CHANNEL_API = '[load channel api]load channel api'
export const channelactionapi = createAction(LOAD_CHANNEL_API)

export const LOAD_CHANNEL = '[load channel]load channel'
export const channelaction = createAction(
  LOAD_CHANNEL,
  props<{ channelData: any }>(),
)

export const LOAD_CHANNEL_ERROR = '[load channel error]load channel error'
export const channelactionerror = createAction(
  LOAD_CHANNEL_ERROR,
  props<{ error: string }>(),
)

// zones

export const LOAD_ZONES_API = '[load zone api]load zone api'
export const zoneactionapi = createAction(LOAD_ZONES_API)

export const LOAD_ZONE = '[load zone]load zone'
export const zoneaction = createAction(LOAD_ZONE, props<{ zoneData: any }>())

export const LOAD_ZONE_ERROR = '[load zone error]load zone error'
export const zoneactionerror = createAction(
  LOAD_ZONE_ERROR,
  props<{ error: string }>(),
)

//  labels
export const LOAD_LABEL_API = '[load label api]load label api'
export const labelactionapi = createAction(LOAD_LABEL_API)

export const LOAD_LABEL = '[load label]load label data'
export const labelaction = createAction(LOAD_LABEL, props<{ labelData: any }>())

export const LOAD_LABEL_ERROR = '[load label]load label data'
export const labelactionerror = createAction(
  LOAD_LABEL_ERROR,
  props<{ error: string }>(),
)

//  languages

export const LOAD_LANGUAGE_API = '[load language api]load language api'
export const langaugeactionapi = createAction(LOAD_LANGUAGE_API)

export const LOAD_LANGUAGE = '[load language]load language'
export const languageaction = createAction(
  LOAD_LANGUAGE,
  props<{ languageData: any }>(),
)

export const LOAD_LANGUAGE_ERROR = '[load language error]load language error'
export const languageactionerror = createAction(
  LOAD_LANGUAGE_ERROR,
  props<{ error: string }>(),
)
