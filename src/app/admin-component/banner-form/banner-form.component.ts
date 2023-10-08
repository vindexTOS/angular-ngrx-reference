import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormService } from 'src/app/services/form.service'
import { UiServiceTsService } from 'src/app/services/ui.service.ts.service'
import { Subscription } from 'rxjs'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'
import { getformbanner } from 'src/app/Store/Form-post/Form.Actions'
import {
  labelaction,
  labelactionapi,
} from 'src/app/Store/Refrence/Refrence.Action'
import { getreferencelist } from 'src/app/Store/Refrence/Refrence.Selector'

@Component({
  selector: 'app-banner-form',
  templateUrl: './banner-form.component.html',
  styleUrls: ['./banner-form.component.css'],
})
export class BannerFormComponent implements OnInit, OnDestroy {
  imageSrc: string = ''
  sub: Subscription | any
  showBannerForm = false

  exampleForm: FormGroup

  refrenceLabels = []
  constructor(
    private formService: FormService,
    private uiService: UiServiceTsService,
    private formBuilder: FormBuilder,
    private store: Store,
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

    this.sub = this.uiService
      .toggleShow()
      .subscribe((val) => (this.showBannerForm = val))
  }

  ngOnInit(): void {
    this.store.dispatch(labelactionapi())

    this.store.select(getreferencelist).subscribe((item) => {
      this.refrenceLabels = item
      console.log(item)
    })
    this.imageSrc = this.formService.imageSrc
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  onFileDropped(event: Event) {
    this.formService.onFileDropped(event)
  }

  onInputChange(event: Event) {
    this.formService.onInputChange(event)
  }

  test() {
    console.log(this.imageSrc)
  }

  closeForm() {
    this.uiService.toggle()
  }

  onSubmit(event: any) {
    event.preventDefault()
  }
  onCheck() {
    this.store.dispatch(getformbanner({ formData: this.exampleForm.value }))
  }
}
