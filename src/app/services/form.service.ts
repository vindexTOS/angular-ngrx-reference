import { Injectable } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ImageService } from './image.service'
import { Subscription } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class FormService {
  exampleForm: FormGroup // Define exampleForm here
  imageSrcSubscription: Subscription
  imageSrc: string = ''

  constructor(
    private formBuilder: FormBuilder,
    private imageService: ImageService,
  ) {
    this.exampleForm = this.formBuilder.group({
      name: this.formBuilder.control(''),
      channelId: this.formBuilder.control(''),
      language: this.formBuilder.control(''),
      zoneId: this.formBuilder.control(''),
      priority: this.formBuilder.control(''),
      fileId: this.formBuilder.control(''),
      isCorporate: this.formBuilder.control(''),
      url: this.formBuilder.control(''),
      startDate: this.formBuilder.control(''),
      endDate: this.formBuilder.control(''),
      active: this.formBuilder.control(''),
      labels: this.formBuilder.control(''), // Use a form control array for labels
      createdAt: this.formBuilder.control(''),
      modifiedAt: this.formBuilder.control(''),
    })

    this.imageSrcSubscription = this.imageService.imageSrc$.subscribe(
      (newImageSrc: string) => {
        this.imageSrc = newImageSrc
      },
    )
  }

  ngOnDestroy(): void {
    this.imageSrcSubscription.unsubscribe()
  }

  onFileDropped(event: Event) {
    this.imageService.onFileDropped(event)
  }

  onInputChange(event: Event) {
    this.imageService.onInputChange(event)
  }

  onSubmit(event: any) {
    event.preventDefault()
    // Handle form submission here
    console.log(this.exampleForm.value)
  }
}
