import { createFeatureSelector, createSelector } from '@ngrx/store'

const getrefrencedata = createFeatureSelector<any>('refrence')

export const getreferencelist = createSelector(getrefrencedata, (state) => {
  console.log(state)
  console.log(state.labels?.data?.entities)
  return state.labels?.data?.entities
})
export const geterror = createSelector(getrefrencedata, (state) => {
  return state.error
})
