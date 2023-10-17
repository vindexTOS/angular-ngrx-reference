import { createReducer, on } from '@ngrx/store'
import { initialBlobState } from './Blob.State'
import { fileReset, fileUpload, fileUploadError, fileres } from './Blob.action'

const _BlobReducer = createReducer(
  initialBlobState,

  on(fileUpload, (state, action) => {
    return { ...state, blob: action.file }
  }),
  on(fileres, (state, action) => {
    // console.log(state, action)
    return { ...state, imgId: action.code }
  }),
  on(fileUploadError, (state, action) => {
    return { ...state, error: action.error }
  }),
  on(fileReset, (state, action) => {
    return { ...state, blob: null, imgId: '' }
  }),
)

export function BlobReducer(state: any, action: any) {
  return _BlobReducer(state, action)
}
