import { Component, OnInit } from '@angular/core'
import { MatPaginatorIntl } from '@angular/material/paginator'
import { Store } from '@ngrx/store'
import { Subject } from 'rxjs'
import {
  deletebanner,
  getquery,
  getsinglebannerId,
} from 'src/app/Store/Banner-data/Banner.action'
import { GetBannerData } from 'src/app/Store/Banner-data/Banner.selector'
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
import { SingleBannerComponent } from 'src/app/client-component/single-banner/single-banner.component'
import { BannerService } from 'src/app/services/banner.service'
import { FilterService } from 'src/app/services/filter.service'
import { UiServiceTsService } from 'src/app/services/ui.service.ts.service'
import { environment } from 'src/env'

export interface PeriodicElement {
  name: string
  position: number
  weight: number
  symbol: string
}

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',

  styleUrls: ['./banner-list.component.css'],
})
export class BannerListComponent implements OnInit {
  displayedColumns!: string[]
  dialog: any
  constructor(
    private store: Store,
    private filterService: FilterService,
    private uiService: UiServiceTsService,
  ) {
    this.filterService.displayedColumns$.subscribe((columns) => {
      this.displayedColumns = columns
    })
  }
  dataSource!: any[]
  baseUrl = environment.apiUrl
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
  queryObj = {
    pageIndex: this.pageIndex,
    pageSize: this.pageSize,
  }

  // openBannerPopup(banner: any): void {
  //   console.log(banner)
  //   const dataForDialog = {
  //     name: 'dwdw',
  //     zoneId: 'one',
  //     active: true,
  //     startDate: '2023-10-14T20:00:00.000Z',
  //     endDate: '2023-10-26T20:00:00.000Z',
  //     fileId: 'C:\\fakepathdaylight-forest-glossy-443446 (1).jpg',
  //     priority: 3,
  //     channelId: '2',
  //     language: 'ka',
  //     url: 'dwwde',
  //     labels: [],
  //     createdAt: '2023-10-10T15:41:31.455Z',
  //     modifiedAt: '2023-10-10T15:41:31.455Z',
  //     id: '5338132806930821',
  //   }

  //   const dialogRef = this.dialog.open(SingleBannerComponent, {
  //     data: dataForDialog,
  //   })

  //   dialogRef.afterClosed().subscribe(() => {
  //     console.log('Banner popup closed')
  //   })
  // }
  toggleSingle(id: string) {
    this.uiService.toggleBannerSingler()
    this.store.dispatch(getsinglebannerId({ id: id }))
  }
  getQueryArray(key: string, value: string[]) {}

  onPageChange(event: any) {
    //  { previousPageIndex: 0, pageIndex: 1, pageSize: 10, length: 200 }
    // console.log(event)
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
  }

  openListItem(index: number, name: string) {
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

  ngOnInit(): void {
    this.filterService.useEffect()
    this.displayedColumns = this.filterService.displayedColumns
    // console.log(this.displayedColumns)
    this.store.select(GetBannerData).subscribe((item) => {
      // console.log(item)

      this.dataSource = item.entities
      this.pageLength = item.total
    })

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
