import { createFeatureSelector, createSelector } from '@ngrx/store'
import { RefrenceTypes } from './Refrence.State'
const getrefrencedata = createFeatureSelector<RefrenceTypes>('refrence')

export const getreferencelist = createSelector(getrefrencedata, (state) => {
  console.log(state)
  console.log(state.labels)
  return state.labels
})
export const geterror = createSelector(getrefrencedata, (state) => {
  return state.error
})
