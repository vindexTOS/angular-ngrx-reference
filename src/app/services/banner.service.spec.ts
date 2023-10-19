import { TestBed } from '@angular/core/testing'
import { HttpClientModule } from '@angular/common/http'
import { BannerService } from './banner.service'
import { AppModule } from '../app.module'

describe('BannerService', () => {
  let service: BannerService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    })
    service = TestBed.inject(BannerService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
