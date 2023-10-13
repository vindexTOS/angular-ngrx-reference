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

  pageLength?: number
  pageIndex: number = 0
  pageSize: number = 5

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
        value: { pageIndex: event.pageIndex, pageSize: event.pageSize },
      }),
    )
  }

  deleteBanner(bannerId: string, blobId: string) {
    this.store.dispatch(deletebanner({ id: bannerId }))
    this.store.dispatch(deleteblob({ blobId }))
    setTimeout(() => {
      this.store.dispatch(
        getquery({
          key: 'all',
          value: { pageIndex: 0, pageSize: 5 },
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
    console.log(this.displayedColumns)
    this.store.select(GetBannerData).subscribe((item) => {
      // console.log(item)

      this.dataSource = item.entities
      this.pageLength = item.total
    })
  }
}
