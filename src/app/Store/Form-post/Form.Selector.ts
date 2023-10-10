import { createFeatureSelector, createSelector } from '@ngrx/store'
import { formData } from './Form.State'

const formselector = createFeatureSelector<formData>('formselector')

export const getformData = createSelector(formselector, (state) => {
  return state.formData
})

export const loadingForm = createSelector(formselector, (state) => {
  return state.formData.loading
})
