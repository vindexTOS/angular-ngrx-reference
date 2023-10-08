import { ElementRef, Injectable, ViewChild } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private _imageSrcSubject = new BehaviorSubject<string>('')
  imageSrc$: Observable<string> = this._imageSrcSubject.asObservable()

  constructor() {}

  @ViewChild('uploadedImage') uploadedImage!: ElementRef
  allowedExtensions = ['jpg', 'jpeg', 'png']

  onFileDropped(files: any): void {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry
        const file = droppedFile.file as File

        this.uploadFile(file)
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
    console.log('File uploaded:', file)

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      this._imageSrcSubject.next(result) // Update the subject with the new imageSrc
      console.log(result)
      this.uploadedImage.nativeElement.style.display = 'block'
    }
    reader.readAsDataURL(file)
  }
}
