import { Injectable, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { getquery } from '../Store/Banner-data/Banner.action'
import { GetBannerData } from '../Store/Banner-data/Banner.selector'
import { environment } from 'src/env'
const ELEMENT_DATA: any[] = [
  {
    name: 'dwdw',
    zoneId: 'one',
    active: true,
    startDate: '2023-10-14T00:00:00.000Z',
    endDate: '2023-10-25T00:00:00.000Z',
    fileId: '7734879576766559',
    priority: 3,
    channelId: '2',
    language: 'ka',
    url: 'dwwd',
    labels: [],
    createdAt: '2023-10-10T17:43:02.483Z',
    modifiedAt: '2023-10-10T18:18:29.119Z',
    id: '1298636451914905',
  },
  {
    name: 'as',
    channelId: 'mobile-bank-ios',
    language: 'ka',
    zoneId: 'dashboard-right-new',
    priority: 1,
    isCorporate: false,
    url: 'as',
    startDate: '2023-10-27T00:00:00.000Z',
    endDate: '2023-10-25T00:00:00.000Z',
    active: true,
    labels: ['vip'],
    fileId: '5449433001067677',
    createdAt: '2023-10-10T11:02:47.408Z',
    modifiedAt: '2023-10-10T17:21:09.275Z',
    id: '2435982059802953',
  },
  {
    name: 'Apples',
    zoneId: 'two',
    active: true,
    startDate: '2023-10-16T00:00:00.000Z',
    endDate: '2000-12-31T00:00:00.000Z',
    fileId: '9257123519886280',
    priority: 4,
    channelId: 'internet-bank',
    language: 'en',
    url: 'dwdw',
    labels: [],
    createdAt: '2023-10-10T13:02:40.534Z',
    modifiedAt: '2023-10-10T17:32:33.713Z',
    id: '3208468577248975',
  },
  {
    name: 's',
    zoneId: 'dashboard-main',
    active: true,
    startDate: '2023-10-08T00:00:00.000Z',
    endDate: '2023-10-18T00:00:00.000Z',
    fileId: '7137075988346977',
    priority: 4,
    channelId: 'internet-bank',
    language: 'en',
    url: 'dwdw',
    labels: ['social'],
    createdAt: '2023-10-10T12:34:33.031Z',
    modifiedAt: '2023-10-10T17:56:43.340Z',
    id: '3915312412035636',
  },
  {
    name: 'dwdw',
    zoneId: 'two',
    active: true,
    startDate: '2023-10-01T20:00:00.000Z',
    endDate: '2023-10-19T20:00:00.000Z',
    fileId: '5071720894165720',
    priority: 3,
    channelId: '2',
    language: 'ka',
    url: 'dwdw',
    labels: [],
    createdAt: '2023-10-10T12:32:15.047Z',
    modifiedAt: '2023-10-10T12:32:15.047Z',
    id: '4249065291489336',
  },
  {
    name: 'dwdwdw',
    zoneId: 'two',
    active: true,
    startDate: '2023-10-08T20:00:00.000Z',
    endDate: '2023-10-26T20:00:00.000Z',
    fileId: '6562602708789308',
    priority: 4,
    channelId: '2',
    language: 'en',
    url: 'dwwdw',
    labels: ['Extra cheese', 'Mushroom', 'Onion'],
    createdAt: '2023-10-10T17:46:58.440Z',
    modifiedAt: '2023-10-10T17:46:58.440Z',
    id: '4364108913353734',
  },
  {
    name: 'string',
    isCorporate: true,
    channelId: 'internet-bank',
    fileId: '1467333760465329',
    language: 'string',
    zoneId: 'dashboard-main',
    startDate: '2023-10-08T00:00:00.000Z',
    endDate: '2023-10-08T00:00:00.000Z',
    url: 'string',
    active: true,
    priority: 0,
    labels: ['non-resident'],
    createdAt: '2023-10-08T10:52:03.809Z',
    modifiedAt: '2023-10-10T16:48:05.987Z',
    id: '4695022878326170',
  },
  {
    id: '4833686288210796',
    name: 'test upoad',
    zoneId: 'dashboard-main',
    active: false,
    startDate: '2023-10-11T20:00:00.000Z',
    endDate: '2023-10-19T20:00:00.000Z',
    channelId: 'internet-bank',
    labels: ['vip', 'social'],
    fileId: '5682010065726917',
    url: '2',
    language: 'ka',
    priority: 3,
    createdAt: '2023-10-08T17:21:07.820Z',
    modifiedAt: '2023-10-08T17:21:07.820Z',
  },
  {
    id: '5334058714259588',
    name: 'banner',
    zoneId: 'dashboard-main',
    active: false,
    startDate: '2023-10-07T20:00:00.000Z',
    endDate: '2023-10-24T20:00:00.000Z',
    channelId: 'internet-bank',
    labels: ['payroll', 'vip', 'social'],
    fileId: '3073577109595753',
    url: 'www',
    language: 'ka',
    priority: 1,
    createdAt: '2023-10-08T17:27:03.811Z',
    modifiedAt: '2023-10-08T17:27:03.811Z',
  },
  {
    name: 'dwdw',
    zoneId: 'one',
    active: true,
    startDate: '2023-10-14T20:00:00.000Z',
    endDate: '2023-10-26T20:00:00.000Z',
    fileId: 'C:\fakepathdaylight-forest-glossy-443446 (1).jpg',
    priority: 3,
    channelId: '2',
    language: 'ka',
    url: 'dwwde',
    labels: [],
    createdAt: '2023-10-10T15:41:31.455Z',
    modifiedAt: '2023-10-10T15:41:31.455Z',
    id: '5338132806930821',
  },
]

const includeExcluedArr = [
  'name',
  'zoneId',
  'active',
  'startDate',
  'endDate',
  'fileId',
  'priority',
  'channelId',
  'language',
  'url',
  'labels',
  'createdAt',
  'modifiedAt',
]

@Injectable({
  providedIn: 'root',
})
export class FilterService implements OnInit {
  constructor(private store: Store) {}
  includeExcludeFilter = includeExcluedArr
  dataSource!: any[]
  selectedIncludedLabels: string[] = []
  pageLength?: number
  pageIndex: number = 0
  pageSize: number = 10
  // displayedColumns: string[] = [
  //   'name',
  //   'active',
  //   'url',
  //   'zoneId',
  //   'startDate',
  //   'endDate',
  //   'priority',
  //   'channelId',
  //   'language',
  //   'createdAt',
  //   'modifiedAt',
  // ]

  displayedColumns: string[] = ['delete', 'fileId', 'name', 'active', 'labels']

  includes: string[] = ['name', 'active', 'labels', 'fileId', 'id']
  serach = ''
  sortDirection = 'asc'
  queryObj: {
    includes?: string[]
    excludes?: any[]
    search?: string
    ids?: any[]
    excludeIds?: any[]
    targetAudienceIds?: any[]
    query?: any
    sortBy?: string
    sortDirection?: string
    pageIndex?: number
    pageSize?: number
    searchAfter?: any[]
    [key: string]: any
  } = {
    includes: [...this.includes],
    // excludes: [''],
    search: this.serach,
    // ids: [''],
    // excludeIds: [''],
    // targetAudienceIds: [''],

    // sortBy: 'name',    name is deprecated from DB
    sortDirection: 'asc',
    pageIndex: this.pageIndex,
    pageSize: this.pageSize,
    // searchAfter: [],
  }
  handleLabelSelectInclude(event: any) {
    if (!this.selectedIncludedLabels.includes(event)) {
      this.selectedIncludedLabels.push(event)
    }

    this.includes.push(event)
    // console.log(this.includes)
    if (!this.displayedColumns.includes(event)) {
      this.displayedColumns.push(event)
    }
  }
  handleLabelRemoveInclude(event: any) {
    this.selectedIncludedLabels = this.selectedIncludedLabels.filter(
      (val) => val !== event,
    )
    this.displayedColumns = this.displayedColumns.filter((val) => val !== event)
    this.includes = this.selectedIncludedLabels
  }
  useEffect(): void {
    this.store.dispatch(getquery({ key: 'all', value: { ...this.queryObj } }))
  }

  hanndleQueryRequest() {
    let newObj = {
      includes: [...this.includes],
      search: this.serach,
      sortDirection: 'asc',
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    }
    this.store.dispatch(getquery({ key: 'all', value: { ...newObj } }))
  }

  ngOnInit(): void {
    this.store.select(GetBannerData).subscribe((item) => {
      // console.log(item)
      this.dataSource = item.entities
      this.pageLength = item.total
    })
  }
}
