import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { RefenceService } from 'src/app/services/refence.service'
import { catchError, map, switchMap } from 'rxjs/operators'
import { of, tap } from 'rxjs'
import {
  channelaction,
  channelactionapi,
  channelactionerror,
  labelaction,
  labelactionapi,
  labelactionerror,
  langaugeactionapi,
  languageaction,
  languageactionerror,
  zoneaction,
  zoneactionapi,
  zoneactionerror,
} from './Refrence.Action'

@Injectable()
export class RefrenceEffects {
  constructor(private actions$: Actions, private service: RefenceService) {}

  //  channel

  channelRefrence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(channelactionapi),
      tap(() => console.log('triggered')),
      switchMap((act) => {
        return this.service.FindAll(1600).pipe(
          map((data) => {
            return channelaction({ channelData: data })
          }),
          catchError((_error) =>
            of(channelactionerror({ error: _error.message })),
          ),
        )
      }),
    ),
  )
  //   zone

  zoneRefrence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(zoneactionapi),
      tap(() => console.log('triggered')),
      switchMap((act) => {
        return this.service.FindAll(1700).pipe(
          map((data) => {
            return zoneaction({ zoneData: data })
          }),
          catchError((_error) =>
            of(zoneactionerror({ error: _error.message })),
          ),
        )
      }),
    ),
  )
  // label
  loadRefrences$ = createEffect(() =>
    this.actions$.pipe(
      ofType(labelactionapi),
      tap(() => console.log('Effect triggered')),
      switchMap((action) => {
        return this.service.FindAll(1900).pipe(
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

  // language

  langaugeRefrence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(langaugeactionapi),
      tap(() => console.log('triggered')),
      switchMap((action) => {
        return this.service.FindAll(2900).pipe(
          map((data) => {
            return languageaction({ languageData: data })
          }),
          catchError((_error) =>
            of(languageactionerror({ error: _error.message })),
          ),
        )
      }),
    ),
  )
}
