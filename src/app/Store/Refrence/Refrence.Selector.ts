import { createFeatureSelector, createSelector } from '@ngrx/store'
import { RefrenceTypes } from './Refrence.State'
const getrefrencedata = createFeatureSelector<RefrenceTypes>('refrence')
// channels
export const getrefrenceChannelList = createSelector(
  getrefrencedata,
  (state) => {
    return state.channels
  },
)
// zone
export const getrefrenceZoneList = createSelector(getrefrencedata, (state) => {
  return state.zones
})

// label
export const getreferenceLabelList = createSelector(
  getrefrencedata,
  (state) => {
    return state.labels
  },
)
//language
export const getrefernceLangaugeList = createSelector(
  getrefrencedata,
  (state) => {
    return state.languages
  },
)

export const geterror = createSelector(getrefrencedata, (state) => {
  return state.error
})
