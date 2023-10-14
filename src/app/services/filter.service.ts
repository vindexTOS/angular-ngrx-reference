import { ChangeDetectorRef, Injectable, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { getquery } from '../Store/Banner-data/Banner.action'
import { GetBannerData } from '../Store/Banner-data/Banner.selector'
import { environment } from 'src/env'
import { BehaviorSubject } from 'rxjs'

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
  constructor(private store: Store) {
    const savedData = localStorage.getItem('filterServiceData')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      this.selectedIncludedLabels = parsedData.selectedIncludedLabels
      this.selectedExcludedLables = parsedData.selectedExcludedLables
      this.includes = parsedData.includes
      this.excludes = parsedData.excludes
      this.sortByValue = parsedData.sortBy
      this.sortDirectionValue = parsedData.sortDirection
      this.displayedColumns = parsedData.displayedColumns
    }
  }

  includeExcludeFilter = includeExcluedArr
  dataSource!: any[]
  pageLength?: number
  pageIndex: number = 0
  pageSize: number = 10

  sortByValue: string = 'name.raw'
  sortDirectionValue: string = 'asc'
  sortBy = [
    { key: 'id', name: 'Id' },
    { key: 'name.raw', name: 'Name' },
    // { key: 'isCorporate', name: 'Is Corporate' },
    { key: 'channelId', name: 'Channel ID' },
    { key: 'language', name: 'Language' },
    { key: 'zoneId', name: 'Zone ID' },
    { key: 'startDate', name: 'Start Date' },
    { key: 'endDate', name: 'End Date' },
    { key: 'url.raw', name: 'URL' },
    { key: 'active', name: 'Active' },
    { key: 'priority', name: 'Priority' },
    { key: 'fileId', name: 'File ID' },
    { key: 'createdAt', name: 'Created At' },
    { key: 'createdBy', name: 'Created By' },
    { key: 'modifiedAt', name: 'Modified At' },
    { key: 'modifiedBy', name: 'Modified By' },
    { key: 'labels', name: 'Labels' },
  ]

  displayedColumns: string[] = [
    'delete',
    'fileId',
    'name',
    'active',
    'labels',
    'language',
    'zoneId',
  ]

  includes: string[] = [
    'name',
    'active',
    'labels',
    'fileId',
    'language',
    'zoneId',
    'id',
  ]

  excludes: string[] = [
    'modifiedAt',
    'createdAt',
    'channelId',
    'priority',
    'endDate',
    'startDate',
    'url',
  ]

  selectedIncludedLabels: string[] = this.includes.slice(
    0,
    this.includes.length - 1,
  )
  selectedExcludedLables: string[] = this.excludes
  serach = ''
  sortDirection = [
    { key: 'asc', name: 'Ascending' },
    { key: 'desc', name: 'Descending' },
  ]

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
    excludes: [...this.excludes],
    search: this.serach,
    sortDirection: 'asc',
    pageIndex: this.pageIndex,
    pageSize: this.pageSize,
    sortBy: 'name.raw',
  }

  private displayedColumnsSubject = new BehaviorSubject<string[]>(
    this.displayedColumns,
  )

  saveDataToLocalStorage() {
    const dataToSave = {
      selectedIncludedLabels: this.selectedIncludedLabels,
      selectedExcludedLables: this.selectedExcludedLables,
      includes: this.includes,
      excludes: this.excludes,
      sortBy: this.sortByValue,
      sortDirection: this.sortDirectionValue,
      displayedColumns: this.displayedColumns,
    }

    localStorage.setItem('filterServiceData', JSON.stringify(dataToSave))
  }

  displayedColumns$ = this.displayedColumnsSubject.asObservable()

  handleLabelSelectInclude(event: any) {
    if (
      !this.selectedIncludedLabels.includes(event) &&
      !this.includes.includes(event)
    ) {
      this.selectedIncludedLabels.push(event)
      this.includes.push(event)
      this.displayedColumns.push(event)
    }
    this.updateQuery()
  }

  handleLabelSelectExclude(event: any) {
    if (!this.selectedExcludedLables.includes(event)) {
      this.selectedExcludedLables.push(event)
    }
    this.updateQuery()
  }

  handleLabelRemoveInclude(event: any) {
    this.selectedIncludedLabels = this.selectedIncludedLabels.filter(
      (val) => val !== event,
    )
    this.includes = this.includes.filter((val) => val !== event)
    this.displayedColumns = this.displayedColumns.filter((val) => val !== event)

    if (!this.selectedExcludedLables.includes(event)) {
      this.selectedExcludedLables.push(event)
      if (!this.excludes.includes(event)) {
        this.excludes.push(event)
      }
    }
    this.displayedColumnsSubject.next(this.displayedColumns)
    this.updateQuery()
    this.saveDataToLocalStorage()
  }

  handleLabelExcludedRemove(event: any) {
    this.selectedExcludedLables = this.selectedExcludedLables.filter(
      (val) => val !== event,
    )

    this.excludes = this.excludes.filter((val) => val !== event)
    if (!this.selectedIncludedLabels.includes(event)) {
      this.selectedIncludedLabels.push(event)

      if (!this.includes.includes(event)) {
        this.includes.push(event)
      }
      if (!this.displayedColumns.includes(event)) {
        this.displayedColumns.push(event)
        this.displayedColumnsSubject.next(this.displayedColumns)
      }
    }
    this.updateQuery()
    this.saveDataToLocalStorage()
  }

  updateQuery(sortBy?: string, sortDirection?: string) {
    const query = {
      excludes: [...this.excludes],
      includes: [...this.includes],
      search: this.serach,
      sortDirection: sortDirection,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      sortBy: sortBy || 'name.raw',
    }
    console.log(query)
    this.store.dispatch(getquery({ key: 'all', value: query }))
  }

  onValueChangedSortBy(val: string) {
    this.sortByValue = val
    this.updateQuery(val)
    this.saveDataToLocalStorage()
  }
  onValueChangeAcenDece(val: string) {
    this.sortDirectionValue = val
    this.updateQuery('', val)
    this.saveDataToLocalStorage()
  }
  useEffect(): void {
    this.saveDataToLocalStorage()
    const savedData = localStorage.getItem('filterServiceData')
    let queryObj = {}
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      this.selectedIncludedLabels = parsedData.selectedIncludedLabels
      this.selectedExcludedLables = parsedData.selectedExcludedLables
      this.includes = parsedData.includes
      this.excludes = parsedData.excludes
      this.sortByValue = parsedData.sortBy
      this.sortDirectionValue = parsedData.sortDirection
      this.displayedColumns = parsedData.displayedColumns

      console.log(parsedData)
      queryObj = {
        sortBy: parsedData.sortBy,
        sortDirection: parsedData.sortDirection,
        excludes: parsedData.excludes,
        includes: parsedData.includes,
      }
    }
    if (queryObj) {
      this.store.dispatch(getquery({ key: 'all', value: { ...queryObj } }))
    }
  }
  // hanndleQueryRequest() {
  //   let newObj = {
  //     excludes: [...this.excludes],
  //     includes: [...this.includes],
  //     search: this.serach,
  //     sortDirection: 'asc',
  //     pageIndex: this.pageIndex,
  //     pageSize: this.pageSize,
  //   }
  //   this.store.dispatch(getquery({ key: 'all', value: { ...newObj } }))
  //   this.displayedColumns = this.selectedIncludedLabels
  // }
  ngOnInit(): void {
    this.store.select(GetBannerData).subscribe((item) => {
      this.dataSource = item.entities
      this.pageLength = item.total
    })
  }
}
