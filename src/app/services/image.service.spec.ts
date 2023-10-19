import { TestBed } from '@angular/core/testing'
import { ImageService } from './image.service'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { Store } from '@ngrx/store'
import { BehaviorSubject } from 'rxjs'
import { environment } from 'src/env'

describe('ImageService', () => {
  let service: ImageService
  let httpTestingController: HttpTestingController
  let store: jasmine.SpyObj<Store>

  beforeEach(() => {
    //   spy objec t for the Store
    store = jasmine.createSpyObj('Store', ['dispatch'])

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: Store, useValue: store }, ImageService],
    })

    service = TestBed.inject(ImageService)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  // NOT HTTP METHODS TESTING ETC...

  it('should post a blob', () => {
    const blob = new Blob(['blob content'], {
      type: 'application/octet-stream',
    })
    const expectedUrl = `${service.baseUrl}blob/upload`

    service.PostBlob(blob).subscribe()

    const req = httpTestingController.expectOne(expectedUrl)
    expect(req.request.method).toEqual('POST')
    expect(req.request.headers.get('Authorization')).toContain(
      environment.apiAuthToken,
    )
    req.flush({})
  })

  it('should remove a blob', () => {
    const blobId = '123'
    const expectedUrl = `${service.baseUrl}blob/remove`

    service.RemoveBlob(blobId).subscribe()

    const req = httpTestingController.expectOne(expectedUrl)
    expect(req.request.method).toEqual('POST')
    expect(req.request.headers.get('Authorization')).toContain(
      environment.apiAuthToken,
    )
    req.flush({})
  })
})
