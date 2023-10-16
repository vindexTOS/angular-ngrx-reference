import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { RefenceService } from 'src/app/services/refence.service'
import { catchError, map, switchMap } from 'rxjs/operators'
import { mergeMap, of, tap } from 'rxjs'
import { ImageService } from 'src/app/services/image.service'
import { deleteblob, fileUpload, fileUploadError, fileres } from './Blob.action'
import { statusError, statusSuccses } from '../StatusHanndle/Status.action'

@Injectable()
export class BlobEffects {
  constructor(private actions$: Actions, private service: ImageService) {}

  uploadFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fileUpload),
      // tap(() => console.log('blob upload ')),
      mergeMap((action) =>
        this.service.PostBlob(action.file).pipe(
          map((res: any) => {
            const result = fileres({ code: res.data.id, success: 'uploaded' })
            return result
          }),
          catchError((error) => {
            console.error('Error:', error)
            return of(fileUploadError(error.error.message[0]))
          }),
        ),
      ),
    ),
  )

  deleteBlob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteblob),
      // tap(() => console.log('blob has been deleted')),
      mergeMap((action) =>
        this.service.RemoveBlob(action.blobId).pipe(
          map((res: any) => {
            return statusSuccses({ succses: 'blob has been deleted' })
          }),
          catchError((error) => {
            console.log(error)
            return of(statusError({ error: error.error.message[0] }))
          }),
        ),
      ),
    ),
  )
}
