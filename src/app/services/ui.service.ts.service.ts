import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/internal/Subject'

@Injectable({
  providedIn: 'root',
})
export class UiServiceTsService {
  constructor() {}
  private subject = new Subject<any>()

  showBannerForm: boolean = false

  toggle() {
    this.showBannerForm = !this.showBannerForm
    this.subject.next(this.showBannerForm)
  }
  toggleShow() {
    return this.subject.asObservable()
  }
}
