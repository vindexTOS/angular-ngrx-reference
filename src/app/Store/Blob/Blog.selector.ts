import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Blobinterface } from './Blob.State'

export const getimagedata = createFeatureSelector<Blobinterface>('imagedata')

export const geturlid = createSelector(getimagedata, (state) => {
  return state.imgId
})
