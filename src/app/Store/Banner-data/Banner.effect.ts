import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { RefenceService } from 'src/app/services/refence.service'
import { catchError, map, switchMap } from 'rxjs/operators'
import { from, mergeMap, of, tap } from 'rxjs'
import { BannerService } from 'src/app/services/banner.service'
import {
  deletebanner,
  getquery,
  getquerydata,
  getsinglebannerId,
  getsinglebannerdata,
  updatebanner,
} from './Banner.action'
import { Store } from '@ngrx/store'
import {
  loadingEnd,
  loadingStart,
  statusError,
  statusSuccses,
} from '../StatusHanndle/Status.action'
import { GetStatusSuccsess } from '../StatusHanndle/Status.selector'

@Injectable()
export class BannerEffect {
  constructor(
    private actions$: Actions,
    private store: Store,
    private service: BannerService,
  ) {}

  getBannerFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getquery),
      // tap(() => console.log('DATA RECEIVED')),
      mergeMap((action) => {
        this.store.dispatch(loadingStart())
        // console.log(action)
        return from(this.service.GetBannerData(action.value)).pipe(
          map((res: any) => {
            // console.log(res)
            this.store.dispatch(loadingEnd())

            return getquerydata({ data: res.data })
          }),
          catchError((error) => {
            this.store.dispatch(loadingEnd())
            return of(statusError({ error: error.message }))
          }),
        )
      }),
    ),
  )

  getSingleBanner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getsinglebannerId),
      // tap(() => console.log('get single')),
      mergeMap((action) => {
        this.store.dispatch(loadingStart())
        //  this.store.dispatch(getsinglebannerdata())

        return from(this.service.GetSingleBanner(action.id)).pipe(
          map((res: any) => {
            this.store.dispatch(loadingEnd())
            // console.log(res.data)
            return getsinglebannerdata({ singleData: res.data })
          }),
          catchError((error) => {
            this.store.dispatch(loadingEnd())
            return of(statusError({ error: error.message }))
          }),
        )
      }),
    ),
  )

  updateBanner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatebanner),
      // tap(() => console.log('updated')),
      switchMap((action) => {
        this.store.dispatch(loadingStart())
        return from(
          this.service.UpdateBanner({ data: action.updateData }),
        ).pipe(
          switchMap((res) => {
            // console.log(res)
            this.store.dispatch(loadingEnd())
            return of(statusSuccses({ succses: 'Banner has been updated' }))
          }),
          catchError((error) => {
            console.log(error)
            this.store.dispatch(loadingEnd())
            return of(statusError({ error: error.error.message[0] }))
          }),
        )
      }),
    ),
  )
  deleteBanner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletebanner),
      // tap(() => console.log('banner h ')),
      mergeMap((action) => {
        this.store.dispatch(loadingStart())
        return from(this.service.DeleteBanner(action.id)).pipe(
          map((res) => {
            this.store.dispatch(loadingEnd())

            return statusSuccses({ succses: 'banner has been deleted' })
          }),
          catchError((error) => {
            console.log(error.error.message)

            this.store.dispatch(loadingEnd())

            return of(
              statusError({
                error: error.error.message[0],
              }),
            )
          }),
        )
      }),
    ),
  )
}
