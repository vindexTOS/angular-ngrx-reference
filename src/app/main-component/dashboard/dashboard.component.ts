import { Component, ElementRef, NgModule, ViewChild } from '@angular/core'
import { UiServiceTsService } from '../../services/ui.service.ts.service'
import { FilterService } from 'src/app/services/filter.service'
import { Store } from '@ngrx/store'
import {
  GetStatusError,
  GetStatusLoading,
  GetStatusSuccsess,
} from 'src/app/Store/StatusHanndle/Status.selector'
import { getquery } from 'src/app/Store/Banner-data/Banner.action'
import { statusSuccses } from 'src/app/Store/StatusHanndle/Status.action'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  @ViewChild('myInput') inputElement!: ElementRef

  sub: PushSubscription | any
  showBannerForm = false
  selectedExcludedLables: string[] = []
  selectedIncludedLabels: string[] = []
  loading: boolean = false
  succsess!: string
  error!: string
  dialog: any
  showBannerSingle: boolean = false
  sortByValue = this.filterService.sortByValue
  sortDirectionValue = this.filterService.sortDirectionValue
  constructor(
    private uiService: UiServiceTsService,
    private filterService: FilterService,
    private store: Store,
  ) {
    this.sub = this.uiService
      .toggleShow()
      .subscribe((val) => (this.showBannerForm = val))
  }
  sortBy = this.filterService.sortBy
  sortDirection = this.filterService.sortDirection
  getSearchInput() {
    const inputValue = this.inputElement.nativeElement.value
    // console.log(inputValue)
    this.store.dispatch(
      getquery({
        key: 'all',
        value: { search: inputValue },
      }),
    )
    setTimeout(() => {
      this.store.dispatch(statusSuccses({ succses: '' }))
    }, 3000)
  }

  refrenceLabels = this.filterService.includeExcludeFilter

  handleLabelRemoveInclude(event: any) {
    // console.log(event)
    this.filterService.handleLabelRemoveInclude(event)

    this.selectedIncludedLabels = this.filterService.selectedIncludedLabels
    this.selectedExcludedLables = this.filterService.selectedExcludedLables
  }

  handleLabelExcludedRemove(event: any) {
    this.filterService.handleLabelExcludedRemove(event)
    this.selectedIncludedLabels = this.filterService.selectedIncludedLabels
    this.selectedExcludedLables = this.filterService.selectedExcludedLables
  }
  onValueChangedSortBy(val: string) {
    this.filterService.onValueChangedSortBy(val)
  }
  onValueChangeAcenDece(val: string) {
    this.filterService.onValueChangeAcenDece(val)
  }

  toggleShow() {
    this.uiService.toggle()
  }
  toggleSingle() {
    this.uiService.toggleBannerSingler()
  }
  ResetFilter() {
    this.filterService.ResetFilter()
  }
  ngOnInit(): void {
    this.sortByValue = this.filterService.sortByValue
    this.sortDirectionValue = this.filterService.sortDirectionValue
    this.selectedIncludedLabels = this.filterService.selectedIncludedLabels
    this.selectedExcludedLables = this.filterService.selectedExcludedLables

    this.store.select(GetStatusLoading).subscribe((item) => {
      this.loading = item
    })
    this.store.select(GetStatusSuccsess).subscribe((item) => {
      this.succsess = item
    })

    this.store.select(GetStatusError).subscribe((item) => {
      this.error = item
    })
    this.sub = this.uiService
      .toggleSingle()
      .subscribe((val) => (this.showBannerSingle = val))
  }
}
