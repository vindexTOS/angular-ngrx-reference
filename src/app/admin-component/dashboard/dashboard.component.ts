import { Component, ElementRef, ViewChild } from '@angular/core'
import { UiServiceTsService } from '../../services/ui.service.ts.service'
import { FilterService } from 'src/app/services/filter.service'
import { Store } from '@ngrx/store'
import {
  GetStatusError,
  GetStatusLoading,
  GetStatusSuccsess,
} from 'src/app/Store/StatusHanndle/Status.selector'
import { getquery } from 'src/app/Store/Banner-data/Banner.action'
import { SingleBannerComponent } from 'src/app/client-component/single-banner/single-banner.component'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  @ViewChild('myInput') inputElement!: ElementRef

  sub: PushSubscription | any
  showBannerForm = false
  selectedExcludedLabels: string[] = []
  selectedIncludedLabels: string[] = []
  loading: boolean = false
  succsess!: string
  error!: string
  dialog: any
  showBannerSingle: boolean = false
  constructor(
    private uiService: UiServiceTsService,
    private filterService: FilterService,
    private store: Store,
  ) {
    this.sub = this.uiService
      .toggleShow()
      .subscribe((val) => (this.showBannerForm = val))
  }

  getSearchInput() {
    const inputValue = this.inputElement.nativeElement.value
    console.log(inputValue)
    this.store.dispatch(
      getquery({
        key: 'all',
        value: { search: inputValue },
      }),
    )
  }

  refrenceLabels = this.filterService.includeExcludeFilter

  handleLabelSelectInclude(event: any) {
    console.log(event)

    this.filterService.handleLabelSelectInclude(event)
  }
  handleLabelRemoveInclude(event: any) {
    console.log(event)
    this.filterService.handleLabelRemoveInclude(event)

    this.selectedIncludedLabels = this.filterService.selectedIncludedLabels
  }

  hanndleQueryRequest() {
    this.filterService.hanndleQueryRequest()
  }
  toggleShow() {
    this.uiService.toggle()
  }
  toggleSingle() {
    this.uiService.toggleBannerSingler()
  }

  ngOnInit(): void {
    this.selectedIncludedLabels = this.filterService.selectedIncludedLabels
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
