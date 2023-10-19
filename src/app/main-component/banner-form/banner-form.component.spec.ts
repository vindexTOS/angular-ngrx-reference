import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

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
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

import { MatIconModule } from '@angular/material/icon'
import { AppModule } from 'src/app/app.module'
describe('BannerFormComponent', () => {
  let component: BannerFormComponent
  let fixture: ComponentFixture<BannerFormComponent>
  let mockEvent = {
    preventDefault: jasmine.createSpy('preventDefault'),
  }

  let formService: FormService

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BannerFormComponent],
        imports: [AppModule],

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
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      })
        .compileComponents()
        .then(() => {
          formService = TestBed.inject(FormService)
          fixture = TestBed.createComponent(BannerFormComponent)
          component = fixture.componentInstance
        })
    }),
  )

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('drag over photo', () => {
    component.onDragOver(mockEvent)
    component.onDragLeave(mockEvent)
    expect(mockEvent.preventDefault).toHaveBeenCalled()
  })
  it('should call onFileDropped from formService on drop event', () => {
    const event = new DragEvent('drop')

    spyOn(formService, 'onFileDropped')

    component.onDrop(event)
    component.onFileDropped(event)
    expect(formService.onFileDropped).toHaveBeenCalledWith(event)
  })
  it('it should select labels', () => {
    spyOn(formService, 'onLabelSelect')
    component.onLabelSelect(mockEvent)

    expect(formService.onLabelSelect).toHaveBeenCalledWith(mockEvent)
  })
  // it('photo input changed', () => {
  //   // expect(component.)
  // })
})
