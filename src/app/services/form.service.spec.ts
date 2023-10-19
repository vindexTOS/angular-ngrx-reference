import { TestBed } from '@angular/core/testing'
import { FormService } from './form.service'
import { ImageService } from './image.service'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import {
  ActionsSubject,
  ReducerManager,
  ReducerManagerDispatcher,
  StateObservable,
  Store,
} from '@ngrx/store'
import { of } from 'rxjs'
import { HttpClient, HttpHandler } from '@angular/common/http'
import { initialFormState } from '../Store/Form-post/Form.State'
import { AppModule } from '../app.module'

describe('FormService', () => {
  let service: FormService
  let imageService: ImageService
  let store: Store

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],

      providers: [FormService, ImageService, FormBuilder, Store],
    })

    service = TestBed.inject(FormService)
    imageService = TestBed.inject(ImageService)
    store = TestBed.inject(Store)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should handle file dropped', () => {
    const dragEvent = new DragEvent('drop', {
      dataTransfer: new DataTransfer(),
    })

    spyOn(imageService, 'onFileDropped')

    service.onFileDropped(dragEvent)

    expect(imageService.onFileDropped).toHaveBeenCalledWith(dragEvent)
  })

  it('should handle input change', () => {
    const inputElement: any = document.createElement('input')
    const file = new File(['test content'], 'test.jpg', { type: 'image/jpeg' })

    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(file)

    inputElement.files = dataTransfer.files
    const event = new Event('change', { bubbles: true })

    spyOn(imageService, 'onInputChange')

    service.onInputChange(event)

    expect(imageService.onInputChange).toHaveBeenCalledWith(event)
  })

  it('should add selected label', () => {
    const label = 'Label1'

    service.onLabelSelect({ value: label })

    expect(service.selectedLabels).toContain(label)
  })
})
function provideMockStore(arg0: { initialState: any }): any {}
