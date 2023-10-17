import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ElementRef, Injectable, ViewChild } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { environment } from 'src/env'
import { fileReset, fileUpload } from '../Store/Blob/Blob.action'
import { Store } from '@ngrx/store'

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private _imageSrcSubject = new BehaviorSubject<string>('')
  imageSrc$: Observable<string> = this._imageSrcSubject.asObservable()

  constructor(private http: HttpClient, private store: Store) {}
  baseUrl = environment.apiUrl

  @ViewChild('uploadedImage') uploadedImage!: ElementRef
  allowedExtensions = ['jpg', 'jpeg', 'png']

  onFileDropped(event: DragEvent): void {
    event.preventDefault()
    if (event.dataTransfer) {
      const files = event?.dataTransfer.files
      if (files && files.length > 0) {
        const selectedFile = files[0]
        this.uploadFile(selectedFile)
      }
    }
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement
    const files = inputElement.files
    if (files && files.length > 0) {
      const selectedFile = files[0]
      this.uploadFile(selectedFile)
    }
  }

  private uploadFile(file: File): void {
    this.store.dispatch(fileUpload({ file: file }))

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      this._imageSrcSubject.next(result)
      this.uploadedImage.nativeElement.style.display = 'block'

      this._imageSrcSubject.next('')
    }
    reader.readAsDataURL(file)
    this.store.dispatch(fileReset())
  }

  PostBlob(blob: Blob) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.apiAuthToken}`,
    })
    const formData = new FormData()
    formData.append('blob', blob, 'multipart/form-data')
    return this.http.post(`${this.baseUrl}blob/upload`, formData, {
      headers,
    })
  }

  RemoveBlob(blobId: string) {
    let blobIds = [blobId]
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.apiAuthToken}`,
    })

    return this.http.post(
      `${this.baseUrl}blob/remove`,
      { blobIds },
      { headers },
    )
  }
}
