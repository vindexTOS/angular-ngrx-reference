import { TestBed } from '@angular/core/testing'

import { RefenceService } from './refence.service'
import { HttpClientModule } from '@angular/common/http'

describe('RefenceService', () => {
  let service: RefenceService

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] })
    service = TestBed.inject(RefenceService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
