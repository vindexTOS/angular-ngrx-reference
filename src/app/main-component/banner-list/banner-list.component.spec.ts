import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BannerListComponent } from './banner-list.component'
import { Store } from '@ngrx/store'

describe('BannerListComponent', () => {
  let component: BannerListComponent
  let fixture: ComponentFixture<BannerListComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannerListComponent],
      providers: [Store],
    })
    fixture = TestBed.createComponent(BannerListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
