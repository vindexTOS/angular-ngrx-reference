import { Component, Inject, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  getsinglebannerId,
  updatebanner,
} from 'src/app/Store/Banner-data/Banner.action'
import { GetSingleBannerData } from 'src/app/Store/Banner-data/Banner.selector'
import { geturlid } from 'src/app/Store/Blob/Blog.selector'
import {
  channelactionapi,
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
import { FormService } from 'src/app/services/form.service'
import { UiServiceTsService } from 'src/app/services/ui.service.ts.service'
import { environment } from 'src/env'

@Component({
  selector: 'app-single-banner',
  templateUrl: './single-banner.component.html',
  styleUrls: ['./single-banner.component.css'],
})
export class SingleBannerComponent implements OnInit {
  banner: any = {}
  imageSrc: string = ''
  sub: PushSubscription | any
  showBannerSingle!: boolean
  loading!: boolean
  baseUrl = environment.apiUrl
  isEditMode: boolean = false
  editedValue!: string
  editedProperty!: string
  editObj = {
    name: '',
    zoneId: '',
    active: false,
    startDate: '',
    endDate: '',
    fileId: '',
    priority: null,
    channelId: '',
    language: '',
    url: '',
    labels: [],
    id: '',
  }
  constructor(
    private store: Store,
    private uiService: UiServiceTsService,
    private formService: FormService,
  ) {}
  refrenceChannels: refrenceTypes[] = []
  refrenceZones: refrenceTypes[] = []
  refrenceLabels: refrenceTypes[] = []
  refrenceLanguage: refrenceTypes[] = []
  priorityNums = Array.from({ length: 21 }, (_, index) => index)
  activeRefrence = [
    { key: true, name: 'true' },
    { key: false, name: 'false' },
  ]
  toggleSingle() {
    this.uiService.toggleBannerSingler()
  }

  preventToggle(event: MouseEvent): void {
    if (event.target instanceof HTMLElement) {
      const targetElement = event.target as HTMLElement
      if (targetElement.classList.contains('trigger-zone')) {
        this.uiService.toggleBannerSingler()
      } else {
        event.stopPropagation()
      }
    }
  }

  toggleEditMode() {
    this.isEditMode = true
  }

  saveChanges() {
    console.log(this.editObj)
    // this.store.dispatch(updatebanner({ updateData: this.editObj }))

    // this.uiService.toggleBannerSingler()
    // this.store.dispatch(getsinglebannerId({ id: this.editObj.id }))
  }

  cancelEdit() {
    this.isEditMode = false
  }
  onFileDropped(event: Event) {
    this.formService.onFileDropped(event)
  }

  onInputChange(event: Event) {
    this.formService.onInputChange(event)
  }
  ngOnInit(): void {
    this.store.select(GetSingleBannerData).subscribe((item) => {
      this.banner = item

      this.editObj = {
        name: item.name,
        zoneId: item.zoneId,
        active: Boolean(item.action),
        startDate: item.startDate,
        endDate: item.endDate,
        fileId: item.fileId,
        priority: item.priority,
        channelId: item.channelId,
        language: item.language,
        url: item.url,
        labels: item.labels,
        id: item.id,
      }
    })
    this.imageSrc = this.formService.imageSrc
    this.store.select(geturlid).subscribe((item) => {
      this.editObj.fileId = item
      this.imageSrc = item
    })

    this.sub = this.uiService

      .toggleSingle()
      .subscribe((val) => (this.showBannerSingle = val))

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
    })
  }
}
