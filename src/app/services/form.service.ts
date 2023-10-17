import { Injectable } from '@angular/core'
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { ImageService } from './image.service'
import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/env'
import { FormType } from '../Store/Form-post/Form.State'

@Injectable({
  providedIn: 'root',
})
export class FormService {
  exampleForm: FormGroup // Define exampleForm here
  imageSrcSubscription: Subscription
  imageSrc: string = ''
  selectedLabels: string[] = []
  baseUrl = environment.apiUrl

  constructor(
    private formBuilder: FormBuilder,
    private imageService: ImageService,
    private store: Store,
    private http: HttpClient,
  ) {
    this.exampleForm = this.formBuilder.group({
      name: this.formBuilder.control(''),
      channelId: this.formBuilder.control(''),
      language: this.formBuilder.control(''),
      zoneId: this.formBuilder.control(''),
      priority: this.formBuilder.control(''),
      isCorporate: this.formBuilder.control(''),
      url: this.formBuilder.control(''),
      startDate: this.formBuilder.control(''),
      endDate: this.formBuilder.control(''),
      active: this.formBuilder.control(''),
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

  onFileDropped(event: DragEvent) {
    this.imageService.onFileDropped(event)
  }

  onInputChange(event: Event) {
    this.imageService.onInputChange(event)
  }

  onLabelSelect(event: any) {
    this.selectedLabels.push(event.value)
  }
  // onSubmit(event: any) {
  //   event.preventDefault()
  //   // Handle form submission here
  //   console.log(this.exampleForm.value)
  // }

  postBanner(data: FormType) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.apiAuthToken}`,
    })

    return this.http.post(`${this.baseUrl}banners/save`, data, {
      headers,
    })
  }
}
