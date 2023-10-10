import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { RefenceService } from 'src/app/services/refence.service'
import { catchError, map, switchMap } from 'rxjs/operators'
import { from, mergeMap, of, tap } from 'rxjs'
import { BannerService } from 'src/app/services/banner.service'
import { getquery, getquerydata } from './Banner.action'
import { Store } from '@ngrx/store'
import {
  loadingEnd,
  loadingStart,
  statusError,
} from '../StatusHanndle/Status.action'

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
      tap(() => console.log('DATA RECEIVED')),
      mergeMap((action) => {
        this.store.dispatch(loadingStart())
        console.log(action)
        return from(this.service.GetBannerData(action.value)).pipe(
          map((res: any) => {
            console.log(res)
            this.store.dispatch(loadingEnd())

            return getquerydata({ data: res })
          }),
          catchError((error) => {
            this.store.dispatch(loadingEnd())
            return of(statusError({ error: error.message }))
          }),
        )
      }),
    ),
  )
}
