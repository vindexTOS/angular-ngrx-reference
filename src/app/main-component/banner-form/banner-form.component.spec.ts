import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BannerFormComponent } from './banner-form.component'
import { HttpClientModule } from '@angular/common/http'
import { FormService } from 'src/app/services/form.service'
import { ImageService } from 'src/app/services/image.service'
import {
  ActionsSubject,
  ReducerManager,
  ReducerManagerDispatcher,
  StateObservable,
  Store,
  StoreModule,
} from '@ngrx/store'

import { MatIconModule } from '@angular/material/icon'
describe('BannerFormComponent', () => {
  let component: BannerFormComponent
  let fixture: ComponentFixture<BannerFormComponent>
  let mockEvent = {
    preventDefault: jasmine.createSpy('preventDefault'),
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannerFormComponent],
      imports: [HttpClientModule, StoreModule.forRoot({})],
      providers: [
        FormService,
        ImageService,
        Store,
        StateObservable,
        ActionsSubject,
        ReducerManager,
        ReducerManagerDispatcher,
        MatIconModule,
      ],
    })
    fixture = TestBed.createComponent(BannerFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('drag over photo', () => {
    component.onDragOver(mockEvent)
    component.onDragLeave(mockEvent)
    expect(mockEvent.preventDefault).toHaveBeenCalled()
  })
  it('should call onFileDropped from formService on drop event', () => {
    const formService = TestBed.inject(FormService)
    const event = new DragEvent('drop')

    spyOn(formService, 'onFileDropped')

    component.onDrop(event)

    expect(formService.onFileDropped).toHaveBeenCalledWith(event)
  })
})
