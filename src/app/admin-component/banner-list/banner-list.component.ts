import { Component, OnInit } from '@angular/core'
import { MatPaginatorIntl } from '@angular/material/paginator'
import { Store } from '@ngrx/store'
import { Subject } from 'rxjs'
import { deletebanner, getquery } from 'src/app/Store/Banner-data/Banner.action'
import { GetBannerData } from 'src/app/Store/Banner-data/Banner.selector'
import { deleteblob } from 'src/app/Store/Blob/Blob.action'
import { BannerService } from 'src/app/services/banner.service'
import { FilterService } from 'src/app/services/filter.service'
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
  constructor(private store: Store, private filterService: FilterService) {}
  dataSource!: any[]
  baseUrl = environment.apiUrl

  pageLength?: number
  pageIndex: number = 0
  pageSize: number = 5

  queryObj = {
    pageIndex: this.pageIndex,
    pageSize: this.pageSize,
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
    console.log(bannerId)
    console.log(blobId)
    this.store.dispatch(deletebanner({ id: bannerId }))
    this.store.dispatch(deleteblob({ blobId }))
  }

  ngOnInit(): void {
    this.filterService.useEffect()
    this.displayedColumns = this.filterService.displayedColumns
    this.store.select(GetBannerData).subscribe((item) => {
      // console.log(item)

      this.dataSource = item.entities
      this.pageLength = item.total
    })
  }
}
