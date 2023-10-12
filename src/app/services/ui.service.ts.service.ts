import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/internal/Subject'

@Injectable({
  providedIn: 'root',
})
export class UiServiceTsService {
  constructor() {}
  private subject = new Subject<any>()
  private subject2 = new Subject<any>()
  showBannerForm: boolean = false
  showBannerSingle: boolean = false
  toggle() {
    this.showBannerForm = !this.showBannerForm
    this.subject.next(this.showBannerForm)
  }

  toggleBannerSingler() {
    this.showBannerSingle = !this.showBannerSingle
    this.subject2.next(this.showBannerSingle)
  }

  toggleSingle() {
    return this.subject2.asObservable()
  }

  toggleShow() {
    return this.subject.asObservable()
  }
}
