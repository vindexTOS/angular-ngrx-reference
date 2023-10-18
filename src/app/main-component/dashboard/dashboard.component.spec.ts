import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DashboardComponent } from './dashboard.component'
import { FilterService } from 'src/app/services/filter.service'
import { Store } from '@ngrx/store'

describe('DashboardComponent', () => {
  let component: DashboardComponent
  let fixture: ComponentFixture<DashboardComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [FilterService, Store],
    })
    fixture = TestBed.createComponent(DashboardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
