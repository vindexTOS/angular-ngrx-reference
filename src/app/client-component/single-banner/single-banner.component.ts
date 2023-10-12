import { Component, Inject, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { GetSingleBannerData } from 'src/app/Store/Banner-data/Banner.selector'
import { UiServiceTsService } from 'src/app/services/ui.service.ts.service'
import { environment } from 'src/env'

@Component({
  selector: 'app-single-banner',
  templateUrl: './single-banner.component.html',
  styleUrls: ['./single-banner.component.css'],
})
export class SingleBannerComponent implements OnInit {
  banner: any
  sub: PushSubscription | any
  showBannerSingle!: boolean
  loading!: boolean
  baseUrl = environment.apiUrl
  constructor(private store: Store, private uiService: UiServiceTsService) {}
  toggleSingle() {
    this.uiService.toggleBannerSingler()
  }

  preventToggle(event: MouseEvent): void {
    if (event.target instanceof HTMLElement) {
      const targetElement = event.target as HTMLElement
      if (targetElement.classList.contains('no-trigger-zone')) {
        event.stopPropagation()
      } else {
        this.uiService.toggleBannerSingler()
      }
    }
  }
  ngOnInit(): void {
    this.store.select(GetSingleBannerData).subscribe((item) => {
      // console.log(item)

      this.banner = item
      console.log(this.banner)
    })

    this.sub = this.uiService
      .toggleSingle()
      .subscribe((val) => (this.showBannerSingle = val))
  }
}
