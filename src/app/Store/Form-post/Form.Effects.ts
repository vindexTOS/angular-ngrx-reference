import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap } from 'rxjs/operators'
import { mergeMap, of, tap } from 'rxjs'
import { FormService } from 'src/app/services/form.service'
import { postbannertodb } from './Form.Actions'
import { Store } from '@ngrx/store'
import {
  loadingEnd,
  loadingStart,
  statusError,
  statusSuccses,
} from '../StatusHanndle/Status.action'

@Injectable()
export class FormEffect {
  constructor(
    private actions$: Actions,
    private service: FormService,
    private store: Store,
  ) {}

  uploadForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postbannertodb),
      mergeMap((action: any) => {
        const { type, ...actionDataWithoutType } = action

        // Dispatch loading start action
        this.store.dispatch(loadingStart())

        return this.service.postBanner(actionDataWithoutType).pipe(
          tap(() => console.log('FORM TRIGGERED')),
          map((res: any) => {
            console.log(res)

            this.store.dispatch(loadingEnd())
            return statusSuccses({ succses: 'Banner posted' })
          }),
          catchError((error) => {
            this.store.dispatch(loadingEnd())
            return of(statusError({ error: error.error.message[0] }))
          }),
        )
      }),
    ),
  )
}
