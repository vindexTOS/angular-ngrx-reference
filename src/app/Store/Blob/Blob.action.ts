import { createAction, props } from '@ngrx/store'

export const fileUpload = createAction(
  '[file upload]file upload',
  props<{ file: Blob }>(),
)
export const fileUploadError = createAction(
  '[file upload error]error',
  props<{ error: string }>(),
)
export const FILLERS_GET_CODE = '[file upload res]res'

export const fileres = createAction(
  FILLERS_GET_CODE,
  props<{ code: any; success: string }>(),
)

export const DELETE_BLOB = '[delete blob]delete'

export const deleteblob = createAction(DELETE_BLOB, props<{ blobId: string }>())
