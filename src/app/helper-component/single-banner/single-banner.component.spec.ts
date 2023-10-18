import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SingleBannerComponent } from './single-banner.component'
import { HttpClientModule } from '@angular/common/http'
import { Store } from '@ngrx/store'

describe('SingleBannerComponent', () => {
  let component: SingleBannerComponent
  let fixture: ComponentFixture<SingleBannerComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleBannerComponent],
      imports: [HttpClientModule],
      providers: [Store],
    })
    fixture = TestBed.createComponent(SingleBannerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
