export interface Blobinterface {
  imgId: string
  error: string
  blob: Blob | null
}

type blob = {
  fileName: string
  fileSize: number
  id: string
  mimeType: string
}

export interface blobRespons {
  data: blob
  success: boolean
}
export const initialBlobState: Blobinterface = {
  imgId: '',
  blob: null,
  error: '',
}
