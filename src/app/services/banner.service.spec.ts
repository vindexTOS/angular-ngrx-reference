import { TestBed } from '@angular/core/testing'
import { HttpClientModule } from '@angular/common/http'
import { BannerService } from './banner.service'

describe('BannerService', () => {
  let service: BannerService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
    service = TestBed.inject(BannerService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
