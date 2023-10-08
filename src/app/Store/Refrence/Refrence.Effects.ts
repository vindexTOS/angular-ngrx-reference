import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { RefenceService } from 'src/app/services/refence.service'
import { catchError, map, switchMap } from 'rxjs/operators'
import { of, tap } from 'rxjs'
import {
  labelaction,
  labelactionapi,
  labelactionerror,
} from './Refrence.Action'

@Injectable()
export class RefrenceEffects {
  constructor(private actions$: Actions, private service: RefenceService) {}

  loadRefrences$ = createEffect(() =>
    this.actions$.pipe(
      ofType(labelactionapi),
      tap(() => console.log('Effect triggered')),
      switchMap((action) => {
        return this.service.FindAll(1600).pipe(
          map((data) => {
            return labelaction({ labelData: data })
          }),
          catchError((_error) =>
            of(labelactionerror({ error: _error.message })),
          ),
        )
      }),
    ),
  )
}
