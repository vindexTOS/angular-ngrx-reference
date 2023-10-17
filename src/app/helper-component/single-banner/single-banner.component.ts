import { Component, Inject, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  getquery,
  getsinglebannerId,
  updatebanner,
  updatelocalobject,
} from 'src/app/Store/Banner-data/Banner.action'
import {
  GetLocalUpdateObj,
  GetSingleBannerData,
} from 'src/app/Store/Banner-data/Banner.selector'
import { fileres } from 'src/app/Store/Blob/Blob.action'
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
import { statusSuccses } from 'src/app/Store/StatusHanndle/Status.action'
import { FormService } from 'src/app/services/form.service'
import { UiServiceTsService } from 'src/app/services/ui.service.ts.service'
import { environment } from 'src/env'
interface EditObjType {
  name: string
  zoneId: string
  active: boolean
  startDate: string
  endDate: string
  fileId: string
  priority: null | number
  channelId: string
  language: string
  url: string
  labels: string[]
  id: string
}
@Component({
  selector: 'app-single-banner',
  templateUrl: './single-banner.component.html',
  styleUrls: ['./single-banner.component.css'],
})
export class SingleBannerComponent implements OnInit {
  banner: any = {}
  imageSrc: string = ''
  imageSrcHtml: string = ''
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
    this.store.dispatch(updatebanner({ updateData: this.editObj }))
    this.uiService.toggleBannerSingler()
    setTimeout(() => {
      this.store.dispatch(
        getquery({
          key: 'all',
          value: { pageIndex: 0, pageSize: 10 },
        }),
      )

      setTimeout(() => {
        this.store.dispatch(statusSuccses({ succses: '' }))
      }, 3000)
    }, 1000)
    this.imageSrc = ''
    this.store.dispatch(fileres({ code: '', success: '' }))
  }

  cancelEdit() {
    this.isEditMode = false
  }
  onFileDropped(event: DragEvent) {
    this.formService.onFileDropped(event)
  }

  onInputChange(event: Event) {
    this.formService.onInputChange(event)
  }

  onValueChanged(property: keyof EditObjType, newValue: string) {
    //@ts-ignore
    this.editObj[property] = newValue
  }
  ngOnInit(): void {
    this.store.select(GetSingleBannerData).subscribe((item) => {
      this.banner = item

      this.editObj = {
        name: item.name,
        zoneId: item.zoneId,
        active: Boolean(item.active),
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

    // this.imageSrcHtml = this.formService.imageSrc
    // console.log(this.formService.imageSrc)
    this.store.select(geturlid).subscribe((item) => {
      this.editObj.fileId = item
      this.imageSrc = item
      console.log(item)
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
