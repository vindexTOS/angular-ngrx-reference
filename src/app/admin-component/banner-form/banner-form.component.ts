import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { MatChipInputEvent } from '@angular/material/chips'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { Subscription } from 'rxjs'
import { FormService } from 'src/app/services/form.service'
import { UiServiceTsService } from 'src/app/services/ui.service.ts.service'
import { Store } from '@ngrx/store'
import {
  postbanner,
  postbannertodb,
} from 'src/app/Store/Form-post/Form.Actions'
import {
  channelactionapi,
  labelaction,
  labelactionapi,
  langaugeactionapi,
  zoneactionapi,
} from 'src/app/Store/Refrence/Refrence.Action'
import {
  getreferenceLabelList,
  getrefernceLangaugeList,
  getrefrenceChannelList,
  getrefrenceZoneList,
} from 'src/app/Store/Refrence/Refrence.Selector'
import { refrenceTypes } from 'src/app/Store/Refrence/Refrence.State'
import { geturlid } from 'src/app/Store/Blob/Blog.selector'
import { ImageService } from 'src/app/services/image.service'
@Component({
  selector: 'app-banner-form',
  templateUrl: './banner-form.component.html',
  styleUrls: ['./banner-form.component.css'],
})
export class BannerFormComponent implements OnInit, OnDestroy {
  uploadedImgSrc!: string
  imageSrc: string = ''
  sub: Subscription | any
  showBannerForm = false

  exampleForm: FormGroup
  bannerForm: FormGroup

  refrenceChannels: refrenceTypes[] = []
  refrenceZones: refrenceTypes[] = []
  refrenceLabels: refrenceTypes[] = []
  refrenceLanguage: refrenceTypes[] = []
  fb: any
  selectedLabels: string[] = []

  priorityNums = Array.from({ length: 21 }, (_, index) => index)
  imageSrcSubscription: any

  constructor(
    private formService: FormService,
    private uiService: UiServiceTsService,
    private formBuilder: FormBuilder,
    private store: Store,
    private imageService: ImageService,
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
      active: this.formBuilder.control(false),
    })

    this.sub = this.uiService
      .toggleShow()
      .subscribe((val) => (this.showBannerForm = val))

    this.bannerForm = this.formBuilder.group({
      labels: new FormControl([]),
    })
  }

  ngOnInit(): void {
    this.store.dispatch(channelactionapi())
    this.store.dispatch(zoneactionapi())
    this.store.dispatch(labelactionapi())
    this.store.dispatch(langaugeactionapi())
    // channel
    this.store.select(getrefrenceChannelList).subscribe((item) => {
      this.refrenceChannels = item
    })
    //  zone
    this.store.select(getrefrenceZoneList).subscribe((item) => {
      this.refrenceZones = item
    })
    //   labels
    this.store.select(getreferenceLabelList).subscribe((item) => {
      this.refrenceLabels = item
    })
    //   languages
    this.store.select(getrefernceLangaugeList).subscribe((item) => {
      this.refrenceLanguage = item
      console.log(this.refrenceLanguage)
    })
    // img

    this.store.select(geturlid).subscribe((item) => {
      this.uploadedImgSrc = item
    })
    this.imageSrc = this.formService.imageSrc
    this.selectedLabels = this.formService.selectedLabels
  }

  //
  onLabelSelect(event: any) {
    this.formService.onLabelSelect(event)
  }

  remove(label: string) {
    this.selectedLabels = this.selectedLabels.filter((val) => val !== label)
  }
  //
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

  onSubmit() {
    const data = {
      ...this.exampleForm.value,
      labels: this.selectedLabels,
      fileId: this.uploadedImgSrc,
    }
    this.store.dispatch(postbannertodb(data))
    console.log(data)
  }
  onCheck() {
    this.store.dispatch(postbannertodb({ formData: this.exampleForm.value }))
  }
}
