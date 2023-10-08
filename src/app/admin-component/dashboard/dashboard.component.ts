import { Component } from '@angular/core'
import { UiServiceTsService } from '../../services/ui.service.ts.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  sub: PushSubscription | any
  showBannerForm = true

  constructor(private uiService: UiServiceTsService) {
    this.sub = this.uiService
      .toggleShow()
      .subscribe((val) => (this.showBannerForm = val))
  }

  toggleShow() {
    this.uiService.toggle()
  }
}
