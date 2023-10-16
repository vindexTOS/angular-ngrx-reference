import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  deletebanner,
  getquery,
  getsinglebannerId,
  updatebanner,
} from 'src/app/Store/Banner-data/Banner.action'
import {
  GetBannerData,
  GetSingleBannerData,
} from 'src/app/Store/Banner-data/Banner.selector'
import { deleteblob } from 'src/app/Store/Blob/Blob.action'
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
import { FilterService } from 'src/app/services/filter.service'
import { UiServiceTsService } from 'src/app/services/ui.service.ts.service'
import { environment } from 'src/env'

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.css'],
})
export class BannerListComponent implements OnInit {
  baseUrl = environment.apiUrl
  displayedColumns!: string[]
  dataSource!: any[]
  editListItem = ''
  listItemValue = ''
  pageLength?: number
  pageIndex: number = 0
  pageSize: number = 10
  editedRowIndex: number | null = null
  editRowName: string = ''
  refrenceChannels: refrenceTypes[] = []
  refrenceZones: refrenceTypes[] = []
  refrenceLabels: refrenceTypes[] = []
  refrenceLanguage: refrenceTypes[] = []
  activeRefrence = [
    { key: true, name: 'active' },
    { key: false, name: 'not active' },
  ]
  priorityNums = Array.from({ length: 21 }, (_, index) => index)
  selectedIncludedLabels: string[] = []
  labelDefault: any[] = []
  editableObject: any = {}

  constructor(
    private store: Store,
    private filterService: FilterService,
    private uiService: UiServiceTsService,
  ) {
    this.filterService.displayedColumns$.subscribe((columns) => {
      this.displayedColumns = columns
    })

    const savedData = localStorage.getItem('pagination')
    if (savedData) {
      const parsedData = JSON.parse(savedData)

      this.pageIndex = parsedData.pageIndex
      this.pageSize = parsedData.pageSize
    }
  }

  saveDataToLocalStorage() {
    const dataToSave = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    }

    localStorage.setItem('pagination', JSON.stringify(dataToSave))
  }
  ngOnInit(): void {
    this.filterService.pageIndex = this.pageIndex
    this.filterService.pageSize = this.pageSize
    this.filterService.useEffect()
    this.displayedColumns = this.filterService.displayedColumns
    this.store.select(GetSingleBannerData).subscribe((item) => {
      this.editableObject = item
    })

    this.store.select(GetBannerData).subscribe((item) => {
      this.dataSource = item.entities
      this.pageLength = item.total
    })

    this.store.dispatch(channelactionapi())
    this.store.dispatch(zoneactionapi())
    this.store.dispatch(labelactionapi())
    this.store.dispatch(langaugeactionapi())

    this.store.select(getrefrenceChannelList).subscribe((item) => {
      this.refrenceChannels = item
    })

    this.store.select(getrefrenceZoneList).subscribe((item) => {
      this.refrenceZones = item
    })

    this.store.select(getreferenceLabelList).subscribe((item) => {
      this.refrenceLabels = item
    })

    this.store.select(getrefernceLangaugeList).subscribe((item) => {
      this.refrenceLanguage = item
    })
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
    this.store.dispatch(
      getquery({
        key: 'all',
        value: {
          pageIndex: event.pageIndex,
          pageSize: event.pageSize,
          sortBy: 'name.raw',
        },
      }),
    )
    this.saveDataToLocalStorage()
  }

  deleteBanner(bannerId: string, blobId: string) {
    this.store.dispatch(deletebanner({ id: bannerId }))
    this.store.dispatch(deleteblob({ blobId }))
    setTimeout(() => {
      this.store.dispatch(
        getquery({
          key: 'all',
          value: { pageIndex: 0, pageSize: 10, sortBy: 'name.raw' },
        }),
      )

      setTimeout(() => {
        this.store.dispatch(statusSuccses({ succses: '' }))
      }, 3000)
    }, 500)
  }

  toggleSingle(id: string) {
    this.uiService.toggleBannerSingler()
    this.store.dispatch(getsinglebannerId({ id: id }))
  }

  openListItem(index: number, name: string, id: string) {
    console.log(this.priorityNums)
    this.store.dispatch(getsinglebannerId({ id: id }))
    this.editRowName = name
    this.editedRowIndex = index
  }

  closeListItem(event: Event) {
    event.stopPropagation()
    this.editedRowIndex = null
    this.editRowName = ''
  }

  getListItemVal(val: string) {
    this.listItemValue = val
  }

  labels(event: Event, Array: any, index: number, name: string, id: string) {
    event.stopPropagation()
    this.store.dispatch(getsinglebannerId({ id: id }))

    if (this.labelDefault.length <= 0) {
      this.labelDefault = (Array || []).map((label: string) => ({
        name: label,
      }))
    }
    this.editRowName = name
    this.editedRowIndex = index
  }

  labelAdd(label: refrenceTypes) {
    console.log(label)
    this.labelDefault.push(label)
  }

  labelRemove(label: any) {
    this.labelDefault = this.labelDefault.filter(
      (val: any) => val.name !== label.name,
    )
  }

  saveEditedBanner(key: string) {
    let newObj = { ...this.editableObject }

    if (key === 'labels') {
      let labelsArr = this.labelDefault.map((item) => item.name)
      newObj[key] = labelsArr
    } else if (this.listItemValue) {
      newObj[key] = this.listItemValue
    }

    delete newObj.createdAt
    delete newObj.modifiedAt

    this.store.dispatch(updatebanner({ updateData: newObj }))

    setTimeout(() => {
      this.filterService.useEffect()
      this.editedRowIndex = null
      this.editRowName = ''
      setTimeout(() => {
        this.store.dispatch(statusSuccses({ succses: '' }))
      }, 3000)
    }, 500)
  }
}
