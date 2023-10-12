import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { environment } from 'src/env'

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  baseUrl = environment.apiUrl

  constructor(private http: HttpClient, private store: Store) {}
  //  banner post data is in form.service.ts
  GetBannerData(query: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.apiAuthToken}`,
    })

    return this.http.post(`${this.baseUrl}banners/find`, query, { headers })
  }

  GetSingleBanner(id: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.apiAuthToken}`,
    })
    return this.http.post(
      `${this.baseUrl}banners/find-one`,
      { id },
      { headers },
    )
  }
  UpdateBanner(data: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.apiAuthToken}`,
    })

    return this.http.post(`${this.baseUrl}banners/save`, data.data, { headers })
  }

  DeleteBanner(id: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.apiAuthToken}`,
    })

    return this.http.post(`${this.baseUrl}banners/remove`, { id }, { headers })
  }
}
