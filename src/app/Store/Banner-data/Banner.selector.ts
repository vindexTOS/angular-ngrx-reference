import { createFeatureSelector, createSelector } from '@ngrx/store'
import { BannerData } from './Banner.State'

const bannerData = createFeatureSelector<BannerData>('bannerdataselector')

export const GetBannerData = createSelector(bannerData, (state) => {
  return state.data
})
