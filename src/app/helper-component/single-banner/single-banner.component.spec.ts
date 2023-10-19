import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { SingleBannerComponent } from './single-banner.component'
import { HttpClientModule } from '@angular/common/http'
import {
  ActionsSubject,
  ReducerManager,
  ReducerManagerDispatcher,
  StateObservable,
  Store,
} from '@ngrx/store'
import { FilterService } from 'src/app/services/filter.service'
import { MatIconModule } from '@angular/material/icon'
import { AppModule } from 'src/app/app.module'

describe('SingleBannerComponent', () => {
  let component: SingleBannerComponent
  let fixture: ComponentFixture<SingleBannerComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SingleBannerComponent],
        imports: [AppModule],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(SingleBannerComponent)
          component = fixture.componentInstance
        })
    }),
  )

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
